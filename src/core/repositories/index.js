function repositories(database, cache) {
  return {
    client: require("./client")(database, cache),
    crypto: require("./crypto")(database, cache),
    address: require("./address")(database, cache),
    cryptoaction: require("./cryptoaction")(database, cache),
    action: require("./action")(database, cache),
    transaction: require("./transaction")(database, cache),
    dbtransactions: require('./dbtransaction')(database),
    webhook: require('./webhook')(database),
  };
}
  
module.exports = repositories;