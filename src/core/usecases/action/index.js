function action(repositories) {
    return {
      getAction: require('./get-action')(repositories),
      retrieveAction: require('./retrieve-action')(repositories),
      createAction: require('./create-action')(repositories),
      editAction: require('./edit-action')(repositories),
      deleteAction: require('./delete-action')(repositories),
    };
  }
    
module.exports = action;