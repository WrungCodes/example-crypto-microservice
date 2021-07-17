const code = require("../../helpers/codes")
const { serverError, badRequest, notFound, serviceUnavailable, unauthorized } = require('../../helpers/response')

function cryptoaction(usecases, events) {
    
    return {
        isValidCryptoAction: isValidCryptoAction,
        isCryptoActionActive: isCryptoActionActive,
    }

    async function isValidCryptoAction (req, res, next) {
        const { action, crypto } = req.locals;

        const cryptoaction = await usecases.cryptoaction.getCryptoAction(crypto, action)

        if(cryptoaction.code == code.SERVER_ERROR)
        {
            return serverError(res, `error occoured processing request, try again`)
        }

        if(cryptoaction.code == code.NOT_FOUND)
        {
            return notFound(res, `crypto action for '${crypto.name}' '${action.name}' not found`)
        }

        req.locals.cryptoaction = cryptoaction.data

        return next();
    }

    async function isCryptoActionActive (req, res, next) {
        const { cryptoaction } = req.locals;

        if(cryptoaction.is_active === false)
        {
            return serviceUnavailable(res, `${cryptoaction.crypto.name} ${cryptoaction.action.name} functionalities has been deactivated`)
        }

        return next();
    }
}

module.exports = cryptoaction;