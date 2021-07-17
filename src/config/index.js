const path = require('path')

const env = process.env.NODE_ENV || 'development'
const name = process.env.PROJECT_NAME || '...'
const configFromFile = require(path.resolve(__dirname, env))

const config = {
    ...configFromFile,
    env,
    name
}

module.exports = config