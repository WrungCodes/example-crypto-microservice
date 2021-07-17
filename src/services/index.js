function services(configuration) 
{
    return {
        cryptoprovider: require('./cryptoprovider/index')(configuration)
    }
}

module.exports = services;