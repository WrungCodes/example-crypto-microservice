'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      reference: {
        type: Sequelize.STRING
      },
      txid: {
        type: Sequelize.STRING
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'clients',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      crypto_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'cryptos',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      address: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL(40,20)
      },
      fee: {
        type: Sequelize.DECIMAL(40,20)
      },
      status: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      memo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};