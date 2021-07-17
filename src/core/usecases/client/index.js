function client(configuration, repositories) {
    return {
      getClient: require('./get-client')(configuration, repositories),
      retrieveClient: require('./retrieve-client')(configuration, repositories),
      createClient: require('./create-client')(configuration, repositories),
      editClient: require('./edit-client')(configuration, repositories)
    };
  }
    
module.exports = client;