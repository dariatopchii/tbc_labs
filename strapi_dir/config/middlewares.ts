export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
      name: 'strapi::cors',
      config: {
          enabled: true,
          origin: ['*'], // Разрешает запросы со всех источников
      },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
