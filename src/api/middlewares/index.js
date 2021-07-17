const code = require("../../helpers/codes")

function middlewares(usecases, events) {
    
    return {
        auth: require('./auth')(usecases, events),
        crypto: require('./crypto')(usecases, events),
        action: require('./action')(usecases, events),
        cryptoaction: require('./cryptoaction')(usecases, events),
    }
}

module.exports = middlewares;