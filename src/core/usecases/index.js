function usecases(configuration, repositories) {
    return {
      client: require('./client/index')(configuration, repositories),
      crypto: require('./crypto/index')(repositories),
      action: require('./action/index')(repositories),
      cryptoaction: require('./cryptoaction/index')(repositories),
      address: require('./address/index')(repositories),
      transaction: require('./transaction/index')(repositories),
    };
  }
    
module.exports = usecases;