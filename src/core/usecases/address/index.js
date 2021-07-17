function address(repositories) {
    return {
      createAddress: require('./create-address')(repositories),
      getAddress: require('./get-address')(repositories),
      // validateAddress: require('./validate-address')(repositories),
    };
  }
    
module.exports = address;