const { serverError, badRequest, notFound, serviceUnavailable, unauthorized, success, validationError } = require('../../helpers/response')
const code = require('../../helpers/codes')

function ActionController(configurations, usecases) {
    return {
        all: all,
        get: get,
        edit: edit,
        create: create,
        delete: destroy
    }

    async function all(req, res) {
        const action = await usecases.action.retrieveAction()

        if (action.code == code.SERVER_ERROR) {
            return serverError(res)
        }

        return success(res, action.data)
    }

    async function get(req, res) {
        const { action } = req.locals;
        return success(res, action)
    }

    async function edit(req, res) {
        const { name, slug, description, is_active } = req.body

        const action = await usecases.action.editAction(req.params.actionslug, { name, slug, is_active, description })

        if (action.code == code.SERVER_ERROR) {
            return serverError(res)
        }

        if (action.code == code.VALIDATION_ERROR) {
            return validationError(res, action.error)
        }

        if (action.code == code.DUPLICATE_ERROR) {
            return badRequest(res, action.error)
        }

        return success(res, action.data)
    }

    async function create(req, res) {
        const { name, slug, description } = req.body

        const action = await usecases.action.createAction(name, slug, description)

        if (action.code == code.SERVER_ERROR) {
            return serverError(res)
        }

        if (action.code == code.VALIDATION_ERROR) {
            return validationError(res, action.error)
        }

        if (action.code == code.DUPLICATE_ERROR) {
            return badRequest(res, action.error)
        }

        return success(res, action.data)
    }

    async function destroy(req, res) {
        const crypto = await usecases.crypto.deleteCrypto(req.params.slug)

        if (crypto.code == code.SERVER_ERROR) {
            return serverError(res)
        }

        return success(res, crypto.data)
    }
};

module.exports = ActionController;