function crypto(repositories) {
    return {
      getCrypto: require('./get-crypto')(repositories),
      retrieveCrypto: require('./retrieve-crypto')(repositories),
      createCrypto: require('./create-crypto')(repositories),
      editCrypto: require('./edit-crypto')(repositories),
      deleteCrypto: require('./delete-crypto')(repositories)
    };
  }
    
module.exports = crypto;