const key_format = 'action-';

function actionRepository(database, cachedClient) {
    return {
      create: create,
      getAll: findAll,
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

    async function create(action, cache = false) 
    {
      const data = await database.Action.create(action);
      if(cache) await cachedClient.setAsync(key_format + data.id, data)
      return data
    }

    async function findAll(cache = false)
    {
      if(!cache) return await database.Action.findAll({order: [['id', 'ASC']]});

      return await cachedClient.getOrSetAsync(key_format + 'all', async () => {
        return await database.Action.findAll({order: [['id', 'ASC']]});
      })
    }

    async function findOneBy(key, value, cache = false)
    {
      if(!cache) return await database.Action.findOne({ where: { [key]: value }});

      return await cachedClient.getOrSetAsync(key_format + key + '-' + value, async () => {
        return await database.Action.findOne({ where: { [key]: value }});
      })
    }

    async function findAllBy(key, value)
    {
      return await database.Action.findAll({ where: { [key]: value }});
    }

    async function findOneById(id, cache = false)
    {
      if(!cache) return await database.Action.findByPk(id);

      return await cachedClient.getOrSetAsync(key_format + id, async () => {
        return await database.Action.findByPk(id);
      })
    }

    async function editOneById(id, action, cache = false)
    {
      const data = await database.Action.update(action, { where: { id: id }});
      if(cache) await cachedClient.setAsync(key_format + id, data)
      return data
    }

    async function deleteOneById(id, cache = false)
    {
      const data =  await database.Action.destroy({ where: { id: id }});
      if(cache) await cachedClient.deleteAsync(key_format + id)
      return data
    }
  }
  
module.exports = actionRepository;