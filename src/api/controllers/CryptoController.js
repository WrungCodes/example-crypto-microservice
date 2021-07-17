const { serverError, badRequest, notFound, serviceUnavailable, unauthorized, success, validationError } = require('../../helpers/response')
const code = require('../../helpers/codes')

function CryptoController(configurations, usecases){
    return {
        all: all,
        get: get,
        edit: edit,
        create: create,
        delete: destroy
    }

    async function all (req, res) {
        const cryptos = await usecases.crypto.retrieveCrypto()

        if(cryptos.code == code.SERVER_ERROR)
        {
            return serverError(res)
        }

        return success(res, cryptos.data)
    }

    async function get (req, res) {
        const { crypto } = req.locals;
        return success(res, crypto)
    }

    async function edit (req, res) {
        const { name, slug, sign, symbol, type, is_active } = req.body

        const crypto = await usecases.crypto.editCrypto(req.params.cryptoslug, {name, slug, sign, symbol, type, is_active})

        if(crypto.code == code.SERVER_ERROR)
        {
            return serverError(res)
        }

        if(crypto.code == code.VALIDATION_ERROR)
        {
            return validationError(res, crypto.error)
        }

        if(crypto.code == code.DUPLICATE_ERROR)
        {
            return badRequest(res, crypto.error)
        }

        return success(res, crypto.data)
    }

    async function create (req, res) {
        const { name, slug, sign, symbol, type } = req.body

        const crypto = await usecases.crypto.createCrypto(name, slug, sign, symbol, type)

        if(crypto.code == code.SERVER_ERROR)
        {
            return serverError(res)
        }

        if(crypto.code == code.VALIDATION_ERROR)
        {
            return validationError(res, crypto.error)
        }

        if(crypto.code == code.DUPLICATE_ERROR)
        {
            return badRequest(res, crypto.error)
        }

        return success(res, crypto.data)
    }

    async function destroy (req, res) {
        const crypto = await usecases.crypto.deleteCrypto(req.params.cryptoslug)

        if(crypto.code == code.SERVER_ERROR)
        {
            return serverError(res)
        }

        return success(res, crypto.data)
    }
};

module.exports = CryptoController;