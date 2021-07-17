function provider(configuration) {
    // return require('./fireblocks/fireblocks')(configuration.services)
    return require('./test-crypto-provider')(configuration.services)
}

module.exports = provider