const Action = require("../../domain/Action");
const code = require("../../../helpers/codes")

function retrieveAction(repositories) {

  return async () => {

    var data = {}

    try {
        const actions = await repositories.action.getAll(true);

        data = actions.map(function(element){
            let action = new Action(...Object.values({
                name: element.name,
                slug: element.slug,
                is_active: element.is_active,
                description: element.description
            }))
            var ac = action.toObject();
            ac.id = element.id
            return ac;
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

module.exports = retrieveAction;