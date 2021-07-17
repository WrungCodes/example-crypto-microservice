'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const database = (configuration) => {
  const db = {}

  let sequelize;

  if (configuration.uri)
  {
    sequelize = new Sequelize(configuration.uri, configuration.sequelize);
  } 
  else 
  {
    sequelize = new Sequelize(
        configuration.database,
        configuration.username,
        configuration.password,
        configuration.sequelize
      );
  }
  
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });
  
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db  
};

module.exports = database;
