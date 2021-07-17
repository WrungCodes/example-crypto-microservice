const CryptoAction = require("../../domain/CryptoAction");
const code = require("../../../helpers/codes")

function getCryptoActions(repositories) {

  return async (crypto, action) => {

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

        const ca = new CryptoAction(...Object.values({
            crypto: crypto,
            action: action,
            is_active: cryptoaction_response.is_active
        }))

        data = ca.toObject()
        // data.id = cryptoaction_response.id

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

module.exports = getCryptoActions;