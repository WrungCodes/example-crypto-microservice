const key_format = 'transaction-';

function transactionRepository(database, cachedClient) {
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
  
    async function clearFindAllByCache()
    {
      return await cachedClient.deleteAsync(key_format + key + value);
    }

    async function create(transaction, cache = false) 
    {
      const data = await database.Transaction.create(transaction);
      if(cache) await cachedClient.setAsync(key_format + data.id, data)
      return data
    }

    async function findAll(cache = false)
    {
      if(!cache) return await database.Transaction.findAll();

      return await cachedClient.getOrSetAsync(key_format + 'all', async () => {
        return await database.Transaction.findAll();
      })
    }

    async function findOneBy(key, value, cache = false)
    {
      if(!cache) return await database.Transaction.findOne({ where: { [key]: value }});

      return await cachedClient.getOrSetAsync(key_format + key + '-' + value, async () => {
        return await database.Transaction.findOne({ where: { [key]: value }});
      })
    }

    async function findAllBy(key, value)
    {
      return await database.Transaction.findAll({ where: { [key]: value }});
    }

    async function findOneById(id, cache = false)
    {
      if(!cache) return await database.Transaction.findByPk(id);

      return await cachedClient.getOrSetAsync(key_format + id, async () => {
        return await database.Transaction.findByPk(id);
      })
    }

    async function editOneById(id, transaction, cache = false)
    {
      const data = await database.Transaction.update(transaction, { where: { id: id }});
      if(cache) await cachedClient.setAsync(key_format + id, data)
      return data
    }

    async function deleteOneById(id, cache = false)
    {
      const data =  await database.Transaction.destroy({ where: { id: id }});
      if(cache) await cachedClient.deleteAsync(key_format + id)
      return data
    }
  }
  
module.exports = transactionRepository;