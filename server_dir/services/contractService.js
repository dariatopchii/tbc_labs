const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractABI = JSON.parse(fs.readFileSync(path.resolve(process.env.CONTRACT_ABI_PATH), 'utf8')).abi;
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

module.exports = { contract };
