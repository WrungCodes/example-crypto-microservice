'use strict';
const {v4:uuid} = require('uuid');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Webhook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Webhook.init({
    name: DataTypes.STRING,
    payload: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Webhook',
    tableName: 'webhooks'
  });

  Webhook.beforeCreate(webhook => webhook.id = uuid());

  return Webhook;
};