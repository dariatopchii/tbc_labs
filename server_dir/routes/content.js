const express = require('express');
const { getCachedContent } = require('../services/cacheService');
const router = express.Router();

router.get('/content/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const content = getCachedContent(cid);
    if (content) {
      res.status(200).send({ cid, content });
    } else {
      res.status(404).send({ error: 'Content not found in cache' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch content', details: error.message });
  }
});

module.exports = router;
