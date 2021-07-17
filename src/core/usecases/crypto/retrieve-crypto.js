const Crypto = require("../../domain/Crypto")
const code = require("../../../helpers/codes")

function retrieveCrypto(repositories) {

  return async () => {

    var data = {}

    try {
        const cryptos = await repositories.crypto.getAll(true);

        data = cryptos.map(function(element){
            let crypto = new Crypto(...Object.values({
                name: element.name,
                slug: element.slug,
                sign: element.sign,
                symbol: element.symbol,
                type: element.type,
                is_active: element.is_active
            }))
            var c = crypto.toObject();
            c.id = element.id
            return c
        })

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

module.exports = retrieveCrypto;