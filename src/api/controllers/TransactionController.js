const { serverError, badRequest, notFound, badGateway, serviceUnavailable, unauthorized, success, validationError } = require('../../helpers/response')
const code = require('../../helpers/codes');

function TransactionController(configurations, usecases, services){
    return {
        get: get,
        fee: fee,
        send: send
    }

    async function get (req, res) {

        const slug = req.params.reference

        const transaction = await usecases.transaction.getTransaction(slug)

        if(transaction.code == code.SERVER_ERROR)
        {
            return serverError(res, `error occoured processing request, try again`)
        }

        if(transaction.code == code.NOT_FOUND)
        {
            return notFound(res, `transaction with reference '${slug}' not found`)
        }
        
        return success(res, transaction.data)
    }

    async function send (req, res) {

        const { crypto, client } = req.locals;

        const { amount, address, fee, memo } = req.body

        const cryptoprovidervalidateaddress = await services.cryptoprovider.validateAddress(crypto.slug, address)

        if(!cryptoprovidervalidateaddress)
        {
            return badGateway(res, 'unable to validate wallet at the moment')
        }

        if(!cryptoprovidervalidateaddress.is_valid)
        {
            return badRequest(res, `the given address '${address}' is invalid`)
        }

        const cryptoprovidersend = await services.cryptoprovider.send(crypto.slug, address, amount, fee, memo)

        if(!cryptoprovidersend)
        {
            return badGateway(res, 'unable to send crypto at the moment')
        }

        const transaction = await usecases.transaction.createTransaction(client, crypto, {
            txid: null,
            status: 'pending',
            type: 'send',
            reference: cryptoprovidersend.reference,
            address: address,
            amount: amount,
            fee: fee,
            memo: memo,
        })

        if(transaction.code == code.SERVER_ERROR)
        {
            return serverError(res)
        }

        if(transaction.code == code.VALIDATION_ERROR)
        {
            return validationError(res, transaction.error)
        }

        return success(res, transaction.data)
    }

    async function fee (req, res) {

        const { crypto } = req.locals;

        const { amount, address } = req.body

        const cryptoproviderfee = await services.cryptoprovider.estimateFee(crypto.slug, address, amount)

        if(!cryptoproviderfee)
        {
            return badGateway(res, 'unable to get fees at the moment')
        }

        var fees = cryptoproviderfee
        delete fees.provider

        return success(res, fees)
    }
};

module.exports = TransactionController;