const Action = require("../../domain/Action");
const validate = require("../../domain/schema/validator");
const code = require("../../../helpers/codes")
const { cleanObject } = require("../../../common/index")

function editAction(repositories) {

  return async (actionslug, {name, slug, is_active, description}) => {

    const data = cleanObject({
        name: name,
        slug: slug,
        is_active: is_active,
        description: description
    })

    var merged_data = {}

    try {
        const current_action = await repositories.action.findOneBy('slug', actionslug);

        if(!current_action)
        {
            return {
                code: code.NOT_FOUND,
                error: 'action not found',
                data: null
            }
        }

        const old_data = {
            name: current_action.name,
            slug: current_action.slug,
            is_active: current_action.is_active,
            description: current_action.description
        }
    
        merged_data = {...old_data, ...data};
    
        const action = new Action(...Object.values(merged_data))

        const { error, value } = validate(action)
    
        if(error)
        {
            return {
                code: code.VALIDATION_ERROR,
                error: error.details,
                data: null
            }
        }

        const same_name_response = await repositories.action.findAllBy('name', merged_data.name);
        const same_slug_response = await repositories.action.findAllBy('slug', merged_data.slug);

        const same_name = (same_name_response.length > 1 || (same_name_response.length == 1 && same_name_response[0].id != current_action.id))
        const same_slug = (same_slug_response.length > 1 || (same_slug_response.length == 1 && same_slug_response[0].id != current_action.id))

        if(same_name || same_slug)
        {
            return {
                code: code.DUPLICATE_ERROR,
                error: 'duplicate data found in action creation, check (name or slug)',
                data: null
            }
        }

        const res = await repositories.action.editOneById(current_action.id, action.toObject());  
        merged_data.id = current_action.id

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
        data: merged_data
    }
  };
}

module.exports = editAction;