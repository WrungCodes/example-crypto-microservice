const CryptoAction = require("../../domain/CryptoAction");
const Action = require("../../domain/Action");
const Crypto = require("../../domain/Crypto");
const validate = require("../../domain/schema/validator");
const code = require("../../../helpers/codes")

function createCryptoActions(repositories) {

  return async (crypto) => {

    const actions = await repositories.action.getAll(true);

    data = actions.map((element) => {

        let action = new Action(...Object.values({
            name: element.name,
            slug: element.slug,
            is_active: element.is_active,
            description: element.description
        }))

        const crypto_obj = new Crypto(...Object.values({
            name: crypto.name,
            slug: crypto.slug,
            sign: crypto.sign,
            symbol: crypto.symbol,
            type: crypto.type,
            is_active: crypto.is_active
        }))

        let cryptoaction = new CryptoAction(...Object.values({
            crypto: crypto_obj,
            action: action,
            is_active: false
        }))

        var cryptoactiondata = cryptoaction.toObject();
        cryptoactiondata.crypto.id = crypto.id
        cryptoactiondata.action.id = element.id
        return 
    })

    try {
        const same_crypto = await repositories.cryptoaction.findOneBy('crypto_id', crypto.id);
    
        if(same_crypto)
        {
            return {
                code: code.DUPLICATE_ERROR,
                error: 'duplicated data found in crypto action creation',
                data: null
            }
        }

        insert_data = data.map((cryptoaction) => {
            return {
                crypto_id: cryptoaction.crypto.id,
                action_id: cryptoaction.action.id,
                is_active: cryptoaction.is_active
            }
        })

        const res = await repositories.cryptoaction.createMany(insert_data, false);

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

module.exports = createCryptoActions;