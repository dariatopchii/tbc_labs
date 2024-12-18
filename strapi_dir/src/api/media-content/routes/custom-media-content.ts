export default [
  {
    method: 'GET',
    path: '/media-content/blockchain',
    handler: 'api::media-content.media-content.getAllFromBlockchain',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];
