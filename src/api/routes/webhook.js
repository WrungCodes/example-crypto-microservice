function webhook(configurations, usecases, middlewares, events, services) {
    const webhook_controller = require('../controllers/WebhookController')(configurations, usecases, services, events);

    return { register };
    
    function register(router) 
    {
        // webhook
        router.post('/fireblocks-webhook', webhook_controller.process );

        return router
    }
}

module.exports = webhook;