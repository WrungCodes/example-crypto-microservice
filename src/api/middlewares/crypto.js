const code = require("../../helpers/codes")
const { serverError, badRequest, notFound, serviceUnavailable, unauthorized } = require('../../helpers/response')

function crypto(usecases, events) {
    
    return {
        isValidCrypto: isValidCrypto,
        isCryptoActive: isCryptoActive,
        // isAdminClient: isAdminClient
    }

    async function isValidCrypto (req, res, next) {
        const slug = req.params.cryptoslug;

        if(!slug)
        {
            return badRequest(res, 'no crypto slug found in request')
        }

        const crypto = await usecases.crypto.getCrypto(slug)

        if(crypto.code == code.SERVER_ERROR)
        {
            return serverError(res, `error occoured processing request, try again`)
        }

        if(crypto.code == code.NOT_FOUND)
        {
            return notFound(res, `crypto named '${slug}' not found`)
        }

        req.locals.crypto = crypto.data

        return next();
    }

    async function isCryptoActive (req, res, next) {
        const { crypto } = req.locals;

        if(crypto.is_active === false)
        {
            return serviceUnavailable(res, `${crypto.name} crypto functionalities has been deactivated`)
        }

        return next();
    }
}

module.exports = crypto;