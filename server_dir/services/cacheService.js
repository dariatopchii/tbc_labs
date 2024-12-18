const LRU = require('lru-cache');

const cache = new LRU({
  max: 100, 
  ttl: 1000 * 60 * 60, 
});

const getCachedContent = (cid) => {
  return cache.get(cid);
};

const setCachedContent = (cid, content) => {
  cache.set(cid, content);
};

const clearCacheForStrapiId = (strapiId) => {
    try {
      // Проходим по всем элементам кеша
      for (const [key, value] of cache.entries()) {
        const parsedValue = JSON.parse(value);
        if (parsedValue.id === strapiId) {
          console.log(`Clearing cache for CID: ${key}`);
          cache.delete(key); // Удаляем запись из кеша
          return true; // Успешно удалено
        }
      }
      console.warn(`No cached content found for Strapi ID: ${strapiId}`);
      return false; // Если ничего не найдено
    } catch (error) {
      console.error(`Error clearing cache for Strapi ID ${strapiId}:`, error.message);
      return false;
    }
  };
  
module.exports = { getCachedContent, setCachedContent, clearCacheForStrapiId, cache };
  
