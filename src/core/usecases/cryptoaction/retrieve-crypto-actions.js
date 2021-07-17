const CryptoAction = require("../../domain/CryptoAction");
const Action = require("../../domain/Action");
const code = require("../../../helpers/codes")

function retrieveCryptoActions(repositories) {

  return async (crypto) => {

    var data = {}
    
    try {
        const cryptoactions = await repositories.cryptoaction.findByCrypto(crypto.slug, crypto.id, true);

        const actions = await repositories.action.getAll(true);

        data = cryptoactions.map(function(element){
            var action_response = actions.find(a => a.id === element.action_id)

            var action = new Action(...Object.values({
                name: action_response.name,
                slug: action_response.slug,
                is_active: action_response.is_active,
                description: action_response.description
            }))
    
            action = action.toObject()
            action.id = action_response.id

            let cryptoaction = new CryptoAction(...Object.values({
                crypto: crypto,
                action: action,
                is_active: element.is_active
            }))

            var c = cryptoaction.toObject();
            // c.id = element.id
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

module.exports = retrieveCryptoActions;