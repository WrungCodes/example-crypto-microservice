const { serverError, badRequest, notFound, badGateway, serviceUnavailable, unauthorized, success, validationError } = require('../../helpers/response')
const code = require('../../helpers/codes');

function AddressController(configurations, usecases, services){
    return {
        get: get,
        create: create,
        validate: validate
    }

    async function get (req, res) {

        const slug = req.params.addressslug

        const address = await usecases.address.getAddress(slug)

        if(address.code == code.SERVER_ERROR)
        {
            return serverError(res, `error occoured processing request, try again`)
        }

        if(address.code == code.NOT_FOUND)
        {
            return notFound(res, `address '${slug}' not found`)
        }
        
        return success(res, address.data)
    }

    async function create (req, res) {

        const { crypto, client } = req.locals;

        const { label } = req.body

        const cryptoprovideraddress = await services.cryptoprovider.generateAddress(crypto.slug, label)

        if(!cryptoprovideraddress)
        {
            return badGateway(res, 'unable to validate wallet at the moment')
        }

        const address = await usecases.address.createAddress(client, crypto, label, cryptoprovideraddress.address)

        if(address.code == code.SERVER_ERROR)
        {
            return serverError(res)
        }

        if(address.code == code.VALIDATION_ERROR)
        {
            return validationError(res, address.error)
        }

        return success(res, address.data)
    }

    async function validate (req, res) {

        const { crypto } = req.locals;

        const address = req.params.addressslug

        const cryptoprovideraddress = await services.cryptoprovider.validateAddress(crypto.slug, address)

        if(!cryptoprovideraddress)
        {
            return badGateway(res, 'unable to validate wallet at the moment')
        }

        return success(res, { is_valid:  cryptoprovideraddress.is_valid})
    }
};

module.exports = AddressController;