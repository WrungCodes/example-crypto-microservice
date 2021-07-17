const key_format = 'crypto-';

function cryptoRepository(database, cachedClient) {
    return {
      create: create,
      getAll: getAll,
      findOneBy: findOneBy,
      findOneById: findOneById,
      findAllBy: findAllBy,
      editOneById: editOneById,
      deleteOneById: deleteOneById,
      clearFindAllCache: clearFindAllCache
    };
  
    async function clearFindAllCache()
    {
      return await cachedClient.deleteAsync(key_format + 'all');
    }

    async function create(crypto, cache = false) 
    {
      const data = await database.Crypto.create(crypto);
      if(cache) await cachedClient.setAsync(key_format + data.id, data)
      return data
    }

    async function getAll(cache = false)
    {
      if(!cache) return await database.Crypto.findAll({order: [['id', 'ASC']]});

      return await cachedClient.getOrSetAsync(key_format + 'all', async () => {
        return await database.Crypto.findAll({order: [['id', 'ASC']]});
      })
    }

    async function findOneBy(key, value, cache = false)
    {
      if(!cache) return await database.Crypto.findOne({ where: { [key]: value }});

      return await cachedClient.getOrSetAsync(key_format + key + '-' + value, async () => {
        return await database.Crypto.findOne({ where: { [key]: value }});
      })
    }

    async function findAllBy(key, value)
    {
      return await database.Crypto.findAll({ where: { [key]: value }});
    }

    async function findOneById(id, cache = false)
    {
      if(!cache) return await database.Crypto.findByPk(id);

      return await cachedClient.getOrSetAsync(key_format + id, async () => {
        return await database.Crypto.findByPk(id);
      })
    }

    async function editOneById(id, crypto, cache = false)
    {
      const data = await database.Crypto.update(crypto, { where: { id: id }});
      if(cache) await cachedClient.setAsync(key_format + id, data)
      return data
    }

    async function deleteOneById(id, cache = false)
    {
      const data =  await database.Crypto.destroy({ where: { id: id }});
      if(cache) await cachedClient.deleteAsync(key_format + id)
      return data
    }
  }
  
module.exports = cryptoRepository;