const code = require("../../helpers/codes")
const { serverError, badRequest, notFound, serviceUnavailable, unauthorized } = require('../../helpers/response')

function auth(usecases, events) {
    
    return {
        isValidClient: isValidClient,
        isClientActive: isClientActive,
        isAdminClient: isAdminClient
    }

    async function isValidClient (req, res, next) {
        const { id, api_key } = req.headers;

        if(!id || !api_key)
        {
            return unauthorized(res, 'invalid authentication detials')
        }

        const client = await usecases.client.getClient(id)

        if(client.code == code.SERVER_ERROR)
        {
            return serverError(res)
        }

        if(client.code == code.NOT_FOUND)
        {
            return unauthorized(res, 'invalid authentication detials')
        }

        if(client.data.api_key !== api_key)
        {
            return unauthorized(res, 'invalid authentication detials')
        }

        req.locals.client = client.data

        return next();
    }

    async function isClientActive (req, res, next) {
        const { client } = req.locals;

        if(client.is_active === false)
        {
            return badRequest(res, 'authorization is disabled, contact admin')
        }

        return next();
    }

    async function isAdminClient (req, res, next) {
        const { client } = req.locals;

        if(client.client_type != 'admin')
        {
            return unauthorized(res, 'access denied, unauthorized access')
        }

        return next();
    }
}

module.exports = auth;