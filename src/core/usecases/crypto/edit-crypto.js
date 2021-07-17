const Crypto = require("../../domain/Crypto");
const validate = require("../../domain/schema/validator");
const { cleanObject } = require("../../../common/index")
const code = require("../../../helpers/codes")

function editCrypto(repositories) {

  return async (cryptoslug, { name, slug, sign, symbol, type, is_active }) => {

    var data = cleanObject({
        name: name,
        slug: slug,
        sign: sign,
        symbol: symbol,
        type: type,
        is_active: is_active
    })

    var merged_data = {}

    try {
        const current_crypto = await repositories.crypto.findOneBy('slug', cryptoslug);

        if(!current_crypto)
        {
            return {
                code: code.NOT_FOUND,
                error: 'crypto not found',
                data: null
            }
        }

        const old_data = {
            name: current_crypto.name,
            slug: current_crypto.slug,
            sign: current_crypto.sign,
            symbol: current_crypto.symbol,
            type: current_crypto.type,
            is_active: current_crypto.is_active
        }
    
        merged_data = {...old_data, ...data};
    
        const crypto = new Crypto(...Object.values(merged_data))
    
        const { error, value } = validate(crypto)
    
        if(error)
        {
            return {
                code: code.VALIDATION_ERROR,
                error: error.details,
                data: null
            }
        }

        merged_data.symbol = merged_data.symbol.toUpperCase()

        const same_name_response = await repositories.crypto.findAllBy('name', merged_data.name);
        const same_slug_response = await repositories.crypto.findAllBy('slug', merged_data.slug);
        const same_symbol_response = await repositories.crypto.findAllBy('symbol', merged_data.symbol);

        const same_name = (same_name_response.length > 1 || (same_name_response.length == 1 && same_name_response[0].id != current_crypto.id))
        const same_slug = (same_slug_response.length > 1 || (same_slug_response.length == 1 && same_slug_response[0].id != current_crypto.id))
        const same_symbol = (same_symbol_response.length > 1 || (same_symbol_response.length == 1 && same_symbol_response[0].id != current_crypto.id))

        if(same_name || same_slug || same_symbol)
        {
            return {
                code: code.DUPLICATE_ERROR,
                error: 'duplicated data (name, slug or symbol) found in crypto creation',
                data: null
            }
        }

        const res = await repositories.crypto.editOneById(current_crypto.id, crypto.toObject());  
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

module.exports = editCrypto;