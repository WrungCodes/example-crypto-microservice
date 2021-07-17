const Address = require("../../domain/Address");
const Crypto = require("../../domain/Crypto");
const { generateUuid } = require("../../../common/index")
const validate = require("../../domain/schema/validator");
const code = require("../../../helpers/codes")

function createAddress(repositories) {

  return async (client, crypto, label, generatedaddress) => {

    var data = {}

    try {
    
        const crypto_obj = new Crypto(...Object.values({
            name: crypto.name,
            slug: crypto.slug,
            sign: crypto.sign,
            symbol: crypto.symbol,
            type: crypto.type,
            is_active: crypto.is_active
        }))

        let address = new Address(...Object.values({
            uuid: generateUuid(),
            label: label,
            address: generatedaddress,
            crypto: crypto_obj
        }))
    
        const { error, value } = validate(address)
    
        if(error)
        {
            return {
                code: code.VALIDATION_ERROR,
                error: error.details,
                data: null
            }
        }
    
        data = address.toObject()
        // data.address.crypto.id = crypto.id
        // data.client = client

        var insert_data = {
            uuid: data.uuid,
            label: data.label,
            address: data.address,
            crypto_id: crypto.id,
            client_id: client.id
        }

        const res = await repositories.address.create(insert_data, false);

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

module.exports = createAddress;