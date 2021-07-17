const code = require("../../helpers/codes")
const { serverError, badRequest, notFound, serviceUnavailable, unauthorized } = require('../../helpers/response')

function action(usecases, events) {
    
    return {
        isValidAction: isValidAction,
        isActionActive: isActionActive,
        // isAdminClient: isAdminClient
    }

    async function isValidAction (req, res, next) {
        const slug = req.params.actionslug;

        if(!slug)
        {
            return badRequest(res, 'no action slug found in request')
        }

        const action = await usecases.action.getAction(slug)

        if(action.code == code.SERVER_ERROR)
        {
            return serverError(res, `error occoured processing request, try again`)
        }

        if(action.code == code.NOT_FOUND)
        {
            return notFound(res, `action named '${slug}' not found`)
        }

        req.locals.action = action.data

        return next();
    }

    async function isActionActive (req, res, next) {
        const { action } = req.locals;

        if(action.is_active === false)
        {
            return serviceUnavailable(res, `${action.name} functionalities has been deactivated`)
        }

        return next();
    }
}

module.exports = action;