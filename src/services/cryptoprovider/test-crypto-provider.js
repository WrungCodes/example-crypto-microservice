const { FireblocksSDK, PeerType, TransactionArguments, TransactionOperation, TransactionStatus } = require('fireblocks-sdk')
const crypto = require("crypto");
const { makeRandomString } = require("../../common/index")

function testcryptoprovider(configuration) {
    
    const fireblocks = new FireblocksSDK(configuration.fireblocks.apiSecret, configuration.fireblocks.api_key);

    return {
        generateAddress: generateAddress,
        validateAddress: validateAddress,
        getTransaction: getTransaction,
        estimateFee: estimateFee,
        send: send,
        receive: receive,
        // verifyNotification: verifyNotification
    };

    async function generateAddress(crypto, label)
    {
        return {
            address: makeRandomString(32),
            label: label,
            provider: 'fireblocks'
        }
    }

    async function validateAddress(crypto, address)
    {
        return {
            is_valid: true,
            provider: 'fireblocks'
        }
    }

    async function getTransaction(crypto, txid)
    {
        return {
            txid: txid,
            amount: 0.045,
            fee: 0.00000003,
            crypto: crypto,
            address: makeRandomString(32),
            confirmations: 3,
            created_at: '24thJune2021',
            status: 'pending',
            provider: 'fireblocks'
        }
    }

    async function estimateFee(crypto, address, amount) {
        return {
            low: 0.0003,
            medium: 0.0006,
            high: 0.001,
            provider: 'fireblocks'
        }
    }

    async function send(crypto, address, amount, fee, note)
    {
        return {
            reference: makeRandomString(40),
            provider: 'fireblocks'
        }
    }

    async function receive(request)
    {

    }

    // async function verifyNotification(request)
    // {
    //     const message = JSON.stringify(request.body);
    //     const signature = request.headers["Fireblocks-Signature"];
    // ​
    //     const verifier = crypto.createVerify('RSA-SHA512');
    //     verifier.write(message);
    //     verifier.end();
    // ​
    //     const isVerified = verifier.verify(configuration.fireblocks.publicKey, signature, "base64");

    //     return {
    //         isValid: isVerified,
    //         provider: 'fireblocks'
    //     }
    // }

    // async function handle(response) {
    //     // ..
    // }

    // async function handleError(response) {
    //     // ..
    // }

    // async function handleSuccess(response) {
    //     // ..
    // }
    
}
module.exports = testcryptoprovider;