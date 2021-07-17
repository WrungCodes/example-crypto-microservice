const Action = require("../../domain/Action");
const code = require("../../../helpers/codes")

function deleteAction(repositories) {

  return async (slug) => {

    var data = {}

    try {
        const current_action = await repositories.action.findOneBy('slug', slug);

        if(!current_action)
        {
            return {
                code: code.NOT_FOUND,
                error: 'action not found',
                data: null
            }
        }

        const action = new Action(...Object.values({
            name: current_action.name,
            slug: current_action.slug,
            description: current_action.description,
            is_active: current_action.is_active
        }))

        const res = await repositories.action.deleteOneById(current_action.id, true);  
        data = action.toObject()
        data.id = current_action.id

        await repositories.action.clearFindAllCache();

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

module.exports = deleteAction;