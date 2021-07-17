const { serverError, badRequest, notFound, serviceUnavailable, unauthorized, success, validationError } = require('../../helpers/response')
const code = require('../../helpers/codes')

function CryptoActionController(configurations, usecases){
    return {
        all: all,
        get: get,
        edit: edit
    }

    async function all (req, res) {
        const { crypto } = req.locals;

        const cryptoactions = await usecases.cryptoaction.retrieveCryptoAction(crypto)

        if(cryptoactions.code == code.SERVER_ERROR)
        {
            return serverError(res)
        }

        return success(res, cryptoactions.data)
    }

    async function get (req, res) {
        const { cryptoaction } = req.locals;
        return success(res, cryptoaction)
    }

    async function edit (req, res) {
        const { is_active } = req.body

        const { crypto, action } = req.locals;

        const cryptoaction = await usecases.cryptoaction.editCryptoAction(crypto, action, is_active)

        if(cryptoaction.code == code.SERVER_ERROR)
        {
            return serverError(res)
        }

        if(cryptoaction.code == code.VALIDATION_ERROR)
        {
            return validationError(res, cryptoaction.error)
        }

        if(cryptoaction.code == code.DUPLICATE_ERROR)
        {
            return badRequest(res, cryptoaction.error)
        }

        return success(res, cryptoaction.data)
    }
};

module.exports = CryptoActionController;