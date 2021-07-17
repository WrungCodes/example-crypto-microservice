const Crypto = require("../../domain/Crypto");
const validate = require("../../domain/schema/validator");
const code = require("../../../helpers/codes")

function createCrypto(repositories) {

  return async (name, slug, sign, symbol, type) => {

    var data = {
        name: name,
        slug: slug,
        sign: sign,
        symbol: symbol,
        type: type,
        is_active: true
    }

    const crypto = new Crypto(...Object.values(data))

    const { error, value } = validate(crypto)

    if(error)
    {
        return {
            code: code.VALIDATION_ERROR,
            error: { error: error.details.map(x => { return x.message.replace(/\\"/g, '"')})},
            data: null
        }
    }

    data.symbol = data.symbol.toUpperCase()

    try {
        const same_name = await repositories.crypto.findOneBy('name', data.name);
        const same_slug = await repositories.crypto.findOneBy('slug', data.slug);
        const same_symbol = await repositories.crypto.findOneBy('symbol', data.symbol);
    
        if(same_name || same_slug || same_symbol)
        {
            return {
                code: code.DUPLICATE_ERROR,
                error: 'duplicated data found in crypto creation, check (name, slug or symbol)',
                data: null
            }
        }

        const res = await repositories.crypto.create(crypto.toObject(), false);
        data = crypto.toObject()
        data.id = res.id
        
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

module.exports = createCrypto;