const key_format = 'client-';

function clientRepository(database, cachedClient) {
    return {
      create: create,
      getAll: getAll,
      findOneBy: findOneBy,
      findOneById: findOneById,
      findAllBy: findAllBy,
      editOneById: editOneById,
      deleteOneById: deleteOneById,
      clearFindOneByCache: clearFindOneByCache
    };
  
    async function clearFindOneByCache(key, value)
    {
      return await cachedClient.deleteAsync(key_format + key + '-' + value);
    }

    async function create(client, cache = false) 
    {
      const data = (await database.Client.create(client)).get({plain:true});
      if(cache) await cachedClient.setAsync(key_format + data.id, data)
      return data
    }

    async function getAll(cache = false)
    {
      return await database.Client.findAll();
    }

    async function findOneBy(key, value, cache = false)
    {
      if(!cache) return await database.Client.findOne({ where: { [key]: value }});

      return await cachedClient.getOrSetAsync(key_format + key + '-' + value, async () => {
        return await database.Client.findOne({ where: { [key]: value }});
      })
    }

    async function findAllBy(key, value)
    {
      return await database.Client.findAll({ where: { [key]: value }});
    }

    async function findOneById(id, cache = false)
    {
      if(!cache) return await database.Client.findByPk(id);

      return await cachedClient.getOrSetAsync(key_format + id, async () => {
        return await database.Client.findByPk(id);
      })
    }

    async function editOneById(id, client, cache = false)
    {
      const data = await database.Client.update(client, { where: { id: id }});
      if(cache) await cachedClient.setAsync(key_format + id, data)
      return data
    }

    async function deleteOneById(id, cache = false)
    {
      const data =  await database.Client.destroy({ where: { id: id }});
      if(cache) await cachedClient.deleteAsync(key_format + id)
      return data
    }
  }
  
module.exports = clientRepository;