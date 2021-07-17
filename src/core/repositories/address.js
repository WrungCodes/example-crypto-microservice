const key_format = 'address-';

function addressRepository(database, cachedClient) {
    return {
      create: create,
      getAll: findAll,
      findOneBy: findOneBy,
      findOneById: findOneById,
      findAllBy: findAllBy,
      editOneById: editOneById,
      deleteOneById: deleteOneById,
      clearFindAllByCache: clearFindAllByCache
    };
  
    async function clearFindAllByCache(key, value)
    {
      return await cachedClient.deleteAsync(key_format + key + value);
    }

    async function create(address, cache = false)
    {
      const data = await database.Address.create(address);
      if(cache) await cachedClient.setAsync(key_format + data.id, data)
      return data
    }

    async function findAll(cache = false)
    {
      return await database.Address.findAll();
    }

    async function findOneBy(key, value, cache = false)
    {
      if(!cache) return await database.Address.findOne({ where: { [key]: value }});

      return await cachedClient.getOrSetAsync(key_format + key + '-' + value, async () => {
        return await database.Address.findOne({ where: { [key]: value }});
      })
    }

    async function findAllBy(key, value)
    {
      return await database.Address.findAll({ where: { [key]: value }});
    }

    async function findOneById(id, cache = false)
    {
      if(!cache) return await database.Address.findByPk(id);

      return await cachedClient.getOrSetAsync(key_format + id, async () => {
        return await database.Address.findByPk(id);
      })
    }

    async function editOneById(id, address, cache = false)
    {
      const data = await database.Address.update(address, { where: { id: id }});
      if(cache) await cachedClient.setAsync(key_format + id, data)
      return data
    }

    async function deleteOneById(id, cache = false)
    {
      const data =  await database.Address.destroy({ where: { id: id }});
      if(cache) await cachedClient.deleteAsync(key_format + id)
      return data
    }
  }
  
module.exports = addressRepository;