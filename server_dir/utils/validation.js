const validatePayload = (payload) => {
    if (!payload || typeof payload !== 'object') return false;
  
    const { event, entry } = payload;
    if (!event || !entry || typeof entry !== 'object') return false;
  
    const requiredFields = ['id', 'documentId', 'hash', 'metadata'];
    return requiredFields.every((field) => field in entry);
  };
  
  module.exports = { validatePayload };
  