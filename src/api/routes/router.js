function index(configurations, usecases, middlewares, events, services) {

    return { register };

    function register(routerobj) {
        var router = routerobj

        router.get('/', (req, res) => {
            res.status(200).json({
                'message': `Welcome to ${configurations.name} ${configurations.env} enviroment`
            });
        });

        // * register endpoints here */

        // crypto
        router = require('./crypto')(configurations, usecases, middlewares, events, services).register(router)

        // action
        router = require('./action')(configurations, usecases, middlewares, events, services).register(router)

        //cryptoaction
        router = require('./cryptoaction')(configurations, usecases, middlewares, events, services).register(router)

        //address
        router = require('./address')(configurations, usecases, middlewares, events, services).register(router)

        //transaction
        router = require('./transaction')(configurations, usecases, middlewares, events, services).register(router)

        // webhook
        router = require('./webhook')(configurations, usecases, middlewares, events, services).register(router)

        return router
    }
}
  
module.exports = index;