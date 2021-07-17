const key_format = 'webhook-';

function webhookRepository(database, cachedClient) {
    return {
      create: create,
    };

    async function create(webhook) 
    {
      const data = await database.Webhook.create(webhook);
      return data
    }
  }
  
module.exports = webhookRepository;