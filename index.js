require('dotenv').config()

const configuration = require('./src/config/index')
const database = require('./src/database/index')(configuration)
const cache = require('./src/cache/index')(configuration)
const services = require('./src/services/index')(configuration)
const repositories = require('./src/core/repositories/index')(database, cache)
const usecases = require('./src/core/usecases/index')(configuration, repositories)
const events = require('./src/events/index')(configuration, usecases, repositories, services)
const middlewares = require('./src/api/middlewares/index')(usecases, events)
const httprouter = require('./src/api/routes/router')(configuration, usecases, middlewares, events, services)
const httpserver = require('./src/api/server')(configuration, httprouter)

module.exports = async () => {
    return httpserver
}