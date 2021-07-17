const Action = require("../../domain/Action");
const code = require("../../../helpers/codes")

function getAction(repositories) {

  return async (slug) => {

    var data = {}

    try {
        const actions = await repositories.action.getAll(true);
        const action_response = actions.find(a => a.slug === slug);

        if(!action_response)
        {
            return {
                code: code.NOT_FOUND,
                error: 'crypto not found',
                data: null
            }
        }

        const action = new Action(...Object.values({
            name: action_response.name,
            slug: action_response.slug,
            is_active: action_response.is_active,
            description: action_response.description
        }))

        data = action.toObject()
        data.id = action_response.id

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

module.exports = getAction;