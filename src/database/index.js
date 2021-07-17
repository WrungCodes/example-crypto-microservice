function database(configuration) 
{
    return require('./sequelize/models')(configuration.db)
}
  
module.exports = database;