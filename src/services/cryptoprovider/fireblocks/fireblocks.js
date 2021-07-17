const { FireblocksSDK, PeerType, TransactionArguments, TransactionOperation, TransactionStatus } = require('fireblocks-sdk')
const crypto = require("crypto");

function actionRepository(configuration) {
    
    const fireblocks = new FireblocksSDK(configuration.fireblocks.apiSecret, configuration.fireblocks.api_key);

    return {
        generateAddress: generateAddress,
        validationAddress: validationAddress,
        getTransaction: getTransaction,
        estimateFee: estimateFee,
        send: send,
        receive: receive,
        // verifyNotification: verifyNotification
    };

    async function generateAddress(crypto, label)
    {
        const data = await fireblocks.generateNewAddress(configuration.fireblocks.vaultAccountId, crypto, '', label);

        return {
            address: data.address,
            label: data.tag,
            provider: 'fireblocks'
        }
    }

    async function validationAddress(crypto, address)
    {
        const data = await fireblocks.validateAddress(crypto, address);

        return {
            is_valid: data.isValid,
            provider: 'fireblocks'
        }
    }

    async function getTransaction(crypto, txid)
    {
        const data = await fireblocks.getTransactionById(txid);

        return {
            txid: data.txHash,
            amount: data.amount,
            fee: data.networkFee,
            crypto: data.assetId,
            address: data.destinationAddress,
            confirmations: data.numOfConfirmations,
            created_at: data.createdAt,
            status: data.status,
            provider: 'fireblocks'
        }
    }

    async function estimateFee(crypto, address, amount) {
        const payload = {
            assetId: crypto,
            source: {
                type: 'VAULT_ACCOUNT',
                id: 0
            },
            destination: {
                type: 'ONE_TIME_ADDRESS',
                oneTimeAddress: {
                    address: address
                }
            },
            amount: Number(amount)
        };
        
        const data = await fireblocks.estimateFeeForTransaction(payload);

        return {
            low: data.low,
            medium: data.medium,
            high: data.high,
            provider: 'fireblocks'
        }
    }

    async function send(crypto, address, amount, fee, note)
    {
        const payload = {
            assetId: crypto,
            source: {
                type: 'VAULT_ACCOUNT',
                id: 0
            },
            destination: {
                type: 'ONE_TIME_ADDRESS',
                oneTimeAddress: {
                    address: address
                }
            },
            amount: Number(amount),
            fee: String(fee),
            note: note
        };
        
        const data = await fireblocks.createTransaction(payload);

        return {
            reference: data.id,
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
module.exports = actionRepository;