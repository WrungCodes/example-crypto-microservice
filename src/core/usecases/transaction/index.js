function transaction(repositories) {
    return {
      getTransaction: require('./get-transaction')(repositories),
      createTransaction: require('./create-transaction')(repositories),
      editTransaction: require('./update-transaction')(repositories),
      getTransactionBy: require('./get-transaction-by')(repositories),
    };
  }
    
module.exports = transaction;