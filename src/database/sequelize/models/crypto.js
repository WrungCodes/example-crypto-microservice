'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Crypto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Crypto.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    sign: DataTypes.STRING,
    symbol: DataTypes.STRING,
    type: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Crypto',
    tableName: 'cryptos',
  });
  return Crypto;
};