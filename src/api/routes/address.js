function address(configurations, usecases, middlewares, events, services) {
    const address_controller = require('../controllers/AddressController')(configurations, usecases, services);

    return { register };
    
    function register(router) 
    {
        // crypto
        router.get('/address/:addressslug', 
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive,
            middlewares.auth.isAdminClient, 
            address_controller.get
        );

        router.get('/crypto/:cryptoslug/address/:addressslug',
            (req, res, next) => { req.params.actionslug = 'address-validate'; return next() },
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive, 
            middlewares.crypto.isValidCrypto,
            middlewares.action.isValidAction,
            middlewares.action.isActionActive,
            middlewares.cryptoaction.isValidCryptoAction,
            middlewares.cryptoaction.isCryptoActionActive,
            address_controller.validate
        );

        router.post('/crypto/:cryptoslug/address', 
            (req, res, next) => { req.params.actionslug = 'address-generate'; return next() },
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive, 
            middlewares.crypto.isValidCrypto,
            middlewares.action.isValidAction,
            middlewares.action.isActionActive,
            middlewares.cryptoaction.isValidCryptoAction,
            middlewares.cryptoaction.isCryptoActionActive,
            address_controller.create
        );

        return router
    }
}

module.exports = address;