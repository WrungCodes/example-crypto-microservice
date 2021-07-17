const event_name = 'onReceiveFireblocksWebhook';
const code = require('../helpers/codes');

function handle(event, configuration, usecases, repositories, services ) {
  
    const sendWebhookToUrl = require('../jobs/send-webhook-to-url')(configuration, usecases, repositories, services)

    event.on(event_name, async function (data) {

        // data = {
        //     "type": "TRANSACTION_CREATED", // "TRANSACTION_STATUS_UPDATED"
        //     "data": {
        //         "txHash": "",
        //         "destinationAddress": "",
        //         "status": "",
        //         "networkFee": "",
        //         "amount": "",
        //         "id": "",
        //     }
        // }
 
        var sendData = {}

        if(data.is_valid)
        {
            if(data.body.type === 'TRANSACTION_CREATED' || data.body.type === 'TRANSACTION_STATUS_UPDATED')
            {
                var transaction = await usecases.transaction.getTransactionBy('reference', data.body.data.id)

                if(transaction.code === code.SERVER_ERROR)
                {
                    // do something crucial TODO:
                    return
                }

                if(transaction.code === code.NOT_FOUND)
                {
                    var address = await usecases.address.getAddress(data.body.data.destinationAddress)

                    if(address.code === code.SERVER_ERROR)
                    {
                        // do something crucial TODO:
                        return
                    }

                    if(address.code === code.NOT_FOUND)
                    {
                        // do something crucial TODO:
                        return
                    }

                    var client = address.client
                    var crypto = address.crypto

                    if(address.crypto.slug !== assetId)
                    {
                        return;
                    }

                    transaction = await usecases.transaction.createTransaction(client, crypto, {
                        txid: data.body.data.txHash,
                        status: data.body.data.status === 'COMPLETED' ? 'successful' : 'pending',
                        type: 'send',
                        reference: data.body.data.id,
                        address: address.address,
                        amount: data.body.data.amount,
                        fee: data.body.data.networkFee,
                        memo: '',
                    })

                    if(transaction.code !== code.SUCCESS)
                    {
                        // do something crucial TODO:
                        return
                    }

                    sendData = {
                        url: address.client.webhook_url,
                        payload: {
                            event: 'TRANSACTION_' + (data.body.data.status === 'COMPLETED' ? 'SUCCESSFUL' : 'PENDING'),
                            crypto: address.crypto,
                            amount: transaction.amount,
                            fee: transaction.fee,
                            address: address.address,
                            txid: transaction.txid
                        }
                    }
                }
                else if(transaction.code === code.SUCCESS)
                {
                    transaction = await usecases.transaction.updateTransaction(transaction.uuid, {
                        txid: data.body.data.txHash,
                        status: data.body.data.status === 'COMPLETED' ? 'successful' : 'pending',
                    })

                    if(address.code !== code.SUCCESS)
                    {
                        // do something crucial TODO:
                        return
                    }

                    sendData = {
                        url: transaction.client.webhook_url,
                        payload: {
                            event: 'TRANSACTION_' + (data.body.data.status === 'COMPLETED' ? 'SUCCESSFUL' : 'PENDING'),
                            crypto: transaction.crypto,
                            amount: transaction.amount,
                            fee: transaction.fee,
                            address: transaction.address,
                            txid: transaction.txid
                        }
                    }
                }

                sendWebhookToUrl.add(sendData, {
                    delay: 0,
                    attempts: configuration.logics.webhook.number_of_retries,
                    backoff: {
                        type: 'exponential',
                        delay: configuration.logics.webhook.exponetial_delay_before_retries * 1000,
                    }
                })

                return
            }
        }
    });
}
  
module.exports = handle;