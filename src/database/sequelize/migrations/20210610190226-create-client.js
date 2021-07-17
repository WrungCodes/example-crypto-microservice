'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      uuid: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      api_key: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      webhook_url: {
        type: Sequelize.STRING
      },
      client_type: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('clients');
  }
};