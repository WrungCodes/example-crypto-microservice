function cache(configuration) 
{
    return require('./redis/index')(configuration.cache)
}
  
module.exports = cache;