'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crypto_actions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      action_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'actions',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      is_active: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('crypto_actions');
  }
};