const CryptoAction = require("../../domain/CryptoAction");
const Crypto = require("../../domain/Crypto");
const Action = require("../../domain/Action");
const code = require("../../../helpers/codes")
const validate = require("../../domain/schema/validator");

function editCryptoAction(repositories) {

  return async (crypto, action, is_active) => {

    var data = {}

    try {
        const cryptoaction = await repositories.cryptoaction.findByCrypto(crypto.slug, crypto.id, true);
        const cryptoaction_response = cryptoaction.find(a => a.action_id === action.id);

        if(!cryptoaction_response)
        {
            return {
                code: code.NOT_FOUND,
                error: 'crypto action not found',
                data: null
            }
        }

        const action_obj = new Action(...Object.values({
            name: action.name,
            slug: action.slug,
            is_active: action.is_active,
            description: action.description
        }))

        const crypto_obj = new Crypto(...Object.values({
            name: crypto.name,
            slug: crypto.slug,
            sign: crypto.sign,
            symbol: crypto.symbol,
            type: crypto.type,
            is_active: crypto.is_active
        }))

        const ca = new CryptoAction(...Object.values({
            crypto: crypto_obj,
            action: action_obj,
            is_active: is_active
        }))

        const { error, value } = validate(ca)
    
        if(error)
        {
            return {
                code: code.VALIDATION_ERROR,
                error: error.details,
                data: null
            }
        }

        data = ca.toObject()
        data.crypto.id = crypto.id
        data.action.id = action.id

        insert_data = {
            crypto_id: crypto.id,
            action_id: action.id,
            is_active: data.is_active
        }

        const res = await repositories.cryptoaction.editOneById(cryptoaction_response.id, insert_data);  

        await repositories.cryptoaction.clearFindByCryptoCache(crypto.slug);

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

module.exports = editCryptoAction;