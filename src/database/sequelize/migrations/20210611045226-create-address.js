'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      label: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('addresses');
  }
};



// {
//   type: Sequelize.UUID,
//   references: {
//     model: {
//       tableName: 'Students',
//     },
//     key: '_id',
//   },
//   allowNull: false,
//   onDelete: 'CASCADE',
// }