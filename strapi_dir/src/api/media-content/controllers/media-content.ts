// src/api/media-content/controllers/media-content.js
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::media-content.media-content', ({ strapi }) => ({
  async getAllFromBlockchain(ctx) {
    try {
      const data = await strapi.service('api::media-content.media-content').fetchAllFromBlockchain();
      ctx.send(data);
    } catch (error) {
      ctx.badRequest("Failed to fetch media from blockchain");
    }
  },
}));
