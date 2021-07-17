const key_format = 'cryptoaction-';

function cryptoActionRepository(database, cachedClient) {
    return {
      create: create,
      createMany: createMany,
      getAll: findAll,
      findOneBy: findOneBy,
      findOneById: findOneById,
      findAllBy: findAllBy,
      findByCrypto: findByCrypto,
      editOneById: editOneById,
      deleteOneById: deleteOneById,
      deleteMany: deleteMany,
      clearFindAllCache: clearFindAllCache,
      clearFindByCryptoCache: clearFindByCryptoCache
    };
  
    async function clearFindAllCache()
    {
      return await cachedClient.deleteAsync(key_format + 'all');
    }

    async function clearFindByCryptoCache(key)
    {
      return await cachedClient.deleteAsync(key_format + key);
    }

    async function findByCrypto(key, value, cache = false)
    {
      if(!cache) return await database.CryptoAction.findAll({ where: { 'crypto_id': value }, order: [['id', 'ASC']]});

      return await cachedClient.getOrSetAsync(key_format + key, async () => {
        return await database.CryptoAction.findAll({ where: { 'crypto_id': value }, order: [['id', 'ASC']]});
      })
    }

    async function create(cryptoaction, cache = false) 
    {
      const data = await database.CryptoAction.create(cryptoaction);
      if(cache) await cachedClient.setAsync(key_format + data.id, data)
      return data
    }

    async function createMany(cryptoactions, cache = false) 
    {
      const data = await database.CryptoAction.bulkCreate(cryptoactions, { returning: true });
      // if(cache) await cachedClient.setAsync(key_format + data.id, data)
      return data
    }

    async function deleteMany(key, value, cache = false)
    {
      const data =  await database.CryptoAction.destroy({ where: { [key]: value }});
      // if(cache) await cachedClient.deleteAsync(key_format + id)
      return data
    }

    async function findAll(cache = false)
    {
      if(!cache) return await database.CryptoAction.findAll({order: [['id', 'ASC']]});

      return await cachedClient.getOrSetAsync(key_format + 'all', async () => {
        return await database.CryptoAction.findAll({order: [['id', 'ASC']]});
      })
    }

    async function findOneBy(key, value, cache = false)
    {
      if(!cache) return await database.CryptoAction.findOne({ where: { [key]: value }});

      return await cachedClient.getOrSetAsync(key_format + key + '-' + value, async () => {
        return await database.CryptoAction.findOne({ where: { [key]: value }});
      })
    }

    async function findAllBy(key, value)
    {
      return await database.CryptoAction.findAll({ where: { [key]: value }, order: [['id', 'ASC']]});
    }

    async function findOneById(id, cache = false)
    {
      if(!cache) return await database.CryptoAction.findByPk(id);

      return await cachedClient.getOrSetAsync(key_format + id, async () => {
        return await database.CryptoAction.findByPk(id);
      })
    }

    async function editOneById(id, cryptoaction, cache = false)
    {
      const data = await database.CryptoAction.update(cryptoaction, { where: { id: id }});
      if(cache) await cachedClient.setAsync(key_format + id, data)
      return data
    }

    async function deleteOneById(id, cache = false)
    {
      const data =  await database.CryptoAction.destroy({ where: { id: id }});
      if(cache) await cachedClient.deleteAsync(key_format + id)
      return data
    }
  }
  
module.exports = cryptoActionRepository;