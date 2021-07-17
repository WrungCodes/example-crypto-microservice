const event_name = 'onReceiveFireblocksWebhook';

function handle(event, configuration, usecases, repositories, services ) {
  
    event.on(event_name, async function (data) {

        console.log('log webhook to database');

        await repositories.webhook.create({
            name: 'fireblocks',
            payload: data
        })
    });
}
  
module.exports = handle;