require('dotenv').config()

const configuration = require('../../../config/index')

module.exports = {
  "development": configuration.db.sequelize,
  "test": configuration.db.sequelize,
  "production": configuration.db.sequelize
};