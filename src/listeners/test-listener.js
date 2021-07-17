const event_name = 'test';

function handle(event, configuration, usecases, repositories, services ) {
  
    event.on(event_name, function (data) {
        // code goes here
        console.log(data);
    });
}
  
module.exports = handle;