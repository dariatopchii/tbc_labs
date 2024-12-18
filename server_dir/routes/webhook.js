const express = require('express');
const { uploadToIPFS } = require('../services/ipfsService');
const { validatePayload } = require('../utils/validation');
const { contract } = require('../services/contractService');
const { setCachedContent, cache,  clearCacheForStrapiId } = require('../services/cacheService');

const router = express.Router();

router.post('/strapi-webhook', async (req, res) => {
  try {
    const payload = req.body;

    // Валідація структури payload
    if (!validatePayload(payload)) {
      return res.status(400).send({ error: 'Invalid payload structure' });
    }

    const { event, entry } = payload;

    console.log(`Received event: ${event}, Strapi ID: ${entry.id}`);


    if (event === 'entry.create') {
      const data = JSON.stringify(entry);
      const cid = await uploadToIPFS(data);
      setCachedContent(cid, data); 

      const tx = await contract.addContent(entry.id, cid);
      await tx.wait();

      console.log(`Content added: CID=${cid}, TX=${tx.hash}`);
      res.status(200).send({ message: 'Content added successfully', ipfsHash: cid });

    } else if (event === 'entry.update') {
      const data = JSON.stringify(entry);
      const cid = await uploadToIPFS(data);
      setCachedContent(cid, data); 

      const tx = await contract.updateContent(entry.id, cid);
      await tx.wait();

      console.log(`Content updated: CID=${cid}, TX=${tx.hash}`);
      res.status(200).send({ message: 'Content updated successfully', ipfsHash: cid });

 
} else if (event === 'entry.delete') {
    try {
      console.log(`Deleting content for Strapi ID ${entry.id}...`);
  

      clearCacheForStrapiId(entry.id);
  

      const tx = await contract.removeContent(entry.id);
      await tx.wait();
  
      console.log(`Content removed from blockchain: Strapi ID=${entry.id}, TX=${tx.hash}`);
      res.status(200).send({ message: 'Content removed successfully', id: entry.id });
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).send({
        error: 'Failed to remove content',
        details: error.message,
      });
    }
  }
   else {
      console.warn(`Unknown event type: ${event}`);
      res.status(400).send({ error: 'Unknown event type' });
    }

  } catch (error) {
    console.error('Error handling webhook:', error.message);
    res.status(500).send({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
