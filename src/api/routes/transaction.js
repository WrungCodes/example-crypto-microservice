function transaction(configurations, usecases, middlewares, events, services) {
    const transaction_controller = require('../controllers/TransactionController')(configurations, usecases, services);

    return { register };
    
    function register(router) 
    {
        // transaction
        router.get('/transaction/:reference',
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive,
            transaction_controller.get
        );

        router.post('/crypto/:cryptoslug/transfer',
            (req, res, next) => { req.params.actionslug = 'crypto-transfer'; return next() },
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive, 
            middlewares.crypto.isValidCrypto,
            middlewares.action.isValidAction,
            middlewares.action.isActionActive,
            middlewares.cryptoaction.isValidCryptoAction,
            middlewares.cryptoaction.isCryptoActionActive,
            transaction_controller.send
        );

        router.post('/crypto/:cryptoslug/transfer/fee', 
            (req, res, next) => { req.params.actionslug = 'crypto-transfer'; return next() },
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive, 
            middlewares.crypto.isValidCrypto,
            middlewares.action.isValidAction,
            middlewares.action.isActionActive,
            middlewares.cryptoaction.isValidCryptoAction,
            middlewares.cryptoaction.isCryptoActionActive,
            transaction_controller.fee
        );

        return router
    }
}

module.exports = transaction;