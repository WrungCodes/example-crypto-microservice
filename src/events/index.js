const events = require('events');

function allEvents(configuration, usecases, repositories, services) {
  const event = new events.EventEmitter();

  require('../listeners/index')(event, configuration, usecases, repositories, services ) // register listeners

  return {
    test: require("./test-event")(event),
    onReceiveFireblocksWebhook: require("./receive-fireblocks-webhook-event")(event)
  };
}
    
module.exports = allEvents;