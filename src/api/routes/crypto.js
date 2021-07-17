function crypto(configurations, usecases, middlewares, events, services) {

    const crypto_controller = require('../controllers/CryptoController')(configurations, usecases, events, services);

    return { register };
    
    function register(router) 
    {
        // crypto
        router.get('/crypto',
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive,
            crypto_controller.all
        );

        router.get('/crypto/:cryptoslug', 
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive,
            middlewares.crypto.isValidCrypto,
            crypto_controller.get
        );

        router.put('/crypto/:cryptoslug', 
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive, 
            middlewares.auth.isAdminClient,
            middlewares.crypto.isValidCrypto,
            crypto_controller.edit
        );

        router.post('/crypto', 
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive, 
            middlewares.auth.isAdminClient, 
            // middlewares.crypto.isValidCrypto,
            crypto_controller.create
        );

        router.delete('/crypto/:cryptoslug', 
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive, 
            middlewares.auth.isAdminClient, 
            middlewares.crypto.isValidCrypto,
            crypto_controller.delete
        );

        return router
    }
}

module.exports = crypto;