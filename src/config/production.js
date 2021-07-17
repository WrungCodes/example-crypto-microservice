const package = require('../../package.json');

module.exports = {
  appname: package.name,
  
  encryption: {
    key: process.env.ENCRYPTION_KEY,
    algorithm : 'aes-256-ctr',
  },

  logics: {
    webhook: {
      number_of_retries: 3,
      exponetial_delay_before_retries: 3, // seconds
    }
  },
  
  db: {
      uri: process.env.DATABASE_URL,
      sequelize: {
        url: process.env.DATABASE_URL,
        use_env_variable: process.env.DATABASE_URL,
        dialect: "postgres",
        logging: false,
        query: {
          raw: true
        }
      }
  },
  
  cache: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    }
  },

  queue: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    }
  },

  services: {
    fireblocks: {
      api_key: '',
      apiSecret: '',
      publicKey: '',
      vaultAccountId: ''
    },
    bitgo: {

    },
  },
}