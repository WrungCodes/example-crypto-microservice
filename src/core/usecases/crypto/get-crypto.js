const Crypto = require("../../domain/Crypto")
const code = require("../../../helpers/codes")

function getCrypto(repositories) {

  return async (slug) => {

    var data = {}

    try {
        // const current_crypto = await repositories.crypto.findOneBy('slug', slug);
        const cryptos = await repositories.crypto.getAll(true);
        const crypto_response = cryptos.find(c => c.slug === slug);

        if(!crypto_response)
        {
            return {
                code: code.NOT_FOUND,
                error: 'crypto not found',
                data: null
            }
        }

        const crypto = new Crypto(...Object.values({
            name: crypto_response.name,
            slug: crypto_response.slug,
            sign: crypto_response.sign,
            symbol: crypto_response.symbol,
            type: crypto_response.type,
            is_active: crypto_response.is_active
        }))

        data = crypto.toObject()
        data.id = crypto_response.id
        
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

module.exports = getCrypto;