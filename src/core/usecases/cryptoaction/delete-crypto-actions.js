const CryptoAction = require("../../domain/CryptoAction");
const Action = require("../../domain/Action");
const validate = require("../../domain/schema/validator");
const code = require("../../../helpers/codes")

function deleteCryptoActions(repositories) {

  return async (crypto) => {
    try {
        const res = await repositories.cryptoaction.deleteMany(crypto.slug, crypto.id, false);
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
        data: {}
    }
  };
}

module.exports = deleteCryptoActions;