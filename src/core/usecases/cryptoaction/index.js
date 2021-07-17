function cryptoactions(repositories) {
    return {
      createCryptoAction: require('./create-crypto-actions')(repositories),
      editCryptoAction: require('./edit-crypto-actions')(repositories),
      getCryptoAction: require('./get-crypto-actions')(repositories),
      retrieveCryptoAction: require('./retrieve-crypto-actions')(repositories),
      deleteCryptoAction: require('./delete-crypto-actions')(repositories),
    };
  }
    
module.exports = cryptoactions;