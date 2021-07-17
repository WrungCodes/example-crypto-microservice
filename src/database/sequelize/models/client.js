'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Client.init({
    name: DataTypes.STRING,
    uuid: DataTypes.STRING,
    email: DataTypes.STRING,
    api_key: DataTypes.STRING,
    ip: DataTypes.STRING,
    webhook_url: DataTypes.STRING,
    client_type: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'clients'
  });
  return Client;
};