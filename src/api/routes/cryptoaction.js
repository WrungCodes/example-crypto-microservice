function cryptoaction(configurations, usecases, middlewares, events, services) {

    const crypto_action_controller = require('../controllers/CryptoActionController')(configurations, usecases, events, services);

    return { register };
    
    function register(router) 
    {
        // cryptoaction
        router.get('/cryptoaction/:cryptoslug',
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive,
            middlewares.auth.isAdminClient,
            middlewares.crypto.isValidCrypto,
            crypto_action_controller.all
        );

        router.get('/cryptoaction/:cryptoslug/:actionslug', 
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive,
            middlewares.auth.isAdminClient,
            middlewares.crypto.isValidCrypto,
            middlewares.action.isValidAction,
            middlewares.cryptoaction.isValidCryptoAction,
            crypto_action_controller.get
        );

        router.put('/cryptoaction/:cryptoslug/:actionslug', 
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive, 
            middlewares.auth.isAdminClient,
            middlewares.crypto.isValidCrypto,
            middlewares.action.isValidAction,
            middlewares.cryptoaction.isValidCryptoAction,
            crypto_action_controller.edit
        );

        // router.post('/cryptoaction/:cryptoslug/:actionslug', 
        //     middlewares.auth.isValidClient, 
        //     middlewares.auth.isClientActive, 
        //     middlewares.auth.isAdminClient, 
        //     // middlewares.crypto.isValidCrypto,
        //     crypto_action_controller.create
        // );

        // router.delete('/cryptoaction/:cryptoslug/:actionslug', 
        //     middlewares.auth.isValidClient, 
        //     middlewares.auth.isClientActive, 
        //     middlewares.auth.isAdminClient, 
        //     middlewares.crypto.isValidCrypto,
        //     crypto_action_controller.delete
        // );

        return router
    }
}

module.exports = cryptoaction;