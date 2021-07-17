// send-webhook-to-url.js
const Queue = require('bull');
const axios = require('axios')

function sendWebhookToUrl(configuration, usecases, repositories, cache ) {
    const webhookQueue = new Queue('webhook-queue', {
        redis: configuration.queue.redis
    });

    webhookQueue.process(async (job) => {

        const data = job.data

        try {
            const response = await axios.post(data.url, data.payload)
        } catch (error) {
            console.log(`call to '${data.url}' ended in error '${error.response.status}' with '${error.response.statusText}'`);
            throw new Error(`call to '${data.url}' ended in error '${error.response.status}' with '${error.response.statusText}'`)
        }
    });

    return webhookQueue
}

module.exports = sendWebhookToUrl;