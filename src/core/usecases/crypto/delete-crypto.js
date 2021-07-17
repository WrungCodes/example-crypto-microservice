const Crypto = require("../../domain/Crypto")
const code = require("../../../helpers/codes")

function deleteCrypto(repositories) {

  return async (slug) => {

    var data = {}

    try {
        const current_crypto = await repositories.crypto.findOneBy('slug', slug);

        if(!current_crypto)
        {
            return {
                code: code.NOT_FOUND,
                error: 'crypto not found',
                data: null
            }
        }

        data = {
            name: current_crypto.name,
            slug: current_crypto.slug,
            sign: current_crypto.sign,
            symbol: current_crypto.symbol,
            type: current_crypto.type,
            is_active: current_crypto.is_active
        }
        
        const crypto = new Crypto(...Object.values(data))

        const res = await repositories.crypto.deleteOneById(current_crypto.id, true);
        data = crypto.toObject()
        data.id = current_crypto.id
        
        await repositories.crypto.clearFindAllCache();
        
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

module.exports = deleteCrypto;