'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    uuid: DataTypes.STRING,
    reference: DataTypes.STRING,
    txid: DataTypes.STRING,
    crypto_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    fee: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    memo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions'
  });
  return Transaction;
};