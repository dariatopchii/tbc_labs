// src/api/media-content/services/media-content.js
import { factories } from '@strapi/strapi';
import fetch from 'node-fetch';

export default factories.createCoreService('api::media-content.media-content', ({ strapi }) => ({
  async fetchAllFromBlockchain() {
    try {
      const response = await fetch("http://localhost:3000/contents");
      if (!response.ok) {
        throw new Error("Failed to fetch contents from the blockchain");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      strapi.log.error("Error fetching media from blockchain:", error);
      throw error;
    }
  },
}));
