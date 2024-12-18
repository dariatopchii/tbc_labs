const axios = require('axios');
const FormData = require('form-data');

const uploadToIPFS = async (data) => {
  const formData = new FormData();
  formData.append('file', data);

  try {
    const response = await axios.post('http://127.0.0.1:5001/api/v0/add', formData, {
      headers: { ...formData.getHeaders() },
    });
    return response.data.Hash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error.message);
    throw error;
  }
};

module.exports = { uploadToIPFS };
