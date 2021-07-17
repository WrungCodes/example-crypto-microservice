const code = require("../../../helpers/codes")

function validateAddress(configuration, repositories, services) {

  return async (crypto, address) => {

    var data = {}

    try {        
        const cryptoprovideraddress = await services.cryptoprovider.validateAddress(crypto.slug, address)

        if(!cryptoprovideraddress)
        {
            return {
                code: code.SERVER_ERROR,
                error: '',
                data: null
            }
        }

        data = {
            is_valid: cryptoprovideraddress.is_valid,
            address: address,
            crypto: crypto
        }
        
    } catch (error) {

        return {
            code: code.SERVER_ERROR,
            error: error,
            data: null
        }
    }

    return {
        code: code.SUCCESS,
        error: null,
        data: data
    }
  };
}

module.exports = validateAddress;