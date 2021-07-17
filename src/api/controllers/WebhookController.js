const { serverError, badRequest, notFound, badGateway, serviceUnavailable, unauthorized, success, validationError } = require('../../helpers/response')
const code = require('../../helpers/codes');
const crypto = require('crypto');

function WebhookController(configurations, usecases, services, events){
    return {
        process: process
    }

    async function process (req, res) {

        // const message = JSON.stringify(req.body);
        // console.log(req.headers)
        // const signature = req.headers["Fireblocks-Signature"] ?? req.headers["fireblocks-signature"];
        // const verifier = crypto.createVerify('RSA-SHA512');

        // verifier.write(message);
        // verifier.end();

        const is_verified = true
        // verifier.verify(configurations.services.fireblocks.publicKey, signature, "base64");

        events.onReceiveFireblocksWebhook({body: req.body, is_valid: is_verified})

        return success(res, { message: 'ok'})
    }
};

module.exports = WebhookController;