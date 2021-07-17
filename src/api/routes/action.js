function action(configurations, usecases, middlewares, events, services) {

    const action_controller = require('../controllers/ActionController')(configurations, usecases, events, services);

    return { register };
    
    function register(router) 
    {
        router.get('/action',
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive,
            action_controller.all
        );

        router.get('/action/:actionslug',
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive,
            middlewares.action.isValidAction,
            action_controller.get
        );

        router.put('/action/:actionslug', 
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive,
            middlewares.auth.isAdminClient,
            middlewares.action.isValidAction,
            action_controller.edit
        );

        router.post('/action',
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive, 
            middlewares.auth.isAdminClient, 
            // middlewares.crypto.isValidCrypto,
            action_controller.create
        );

        router.delete('/action/:actionslug', 
            middlewares.auth.isValidClient, 
            middlewares.auth.isClientActive, 
            middlewares.auth.isAdminClient,
            middlewares.action.isValidAction,
            action_controller.delete
        );

        return router
    }
}

module.exports = action;