const Action = require("../../domain/Action");
const validate = require("../../domain/schema/validator");
const code = require("../../../helpers/codes")

function createAction(repositories) {

  return async (name, slug, description) => {

    const data = {
        name: name,
        slug: slug,
        is_active: false,
        description: description
    }

    const action = new Action(...Object.values(data))

    const { error, value } = validate(action)

    if(error)
    {
        return {
            code: code.VALIDATION_ERROR,
            error: error.details,
            data: null
        }
    }

    try {
        const same_slug = await repositories.action.findOneBy('slug', data.slug);
        const same_name = await repositories.action.findOneBy('name', data.name);
    
        if(same_slug || same_name)
        {
            return {
                code: code.DUPLICATE_ERROR,
                error: 'duplicate data found in action creation, check (name or slug)',
                data: null
            }
        }

        const res = await repositories.action.create(action.toObject(), true); 
        data.id = res.id

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

module.exports = createAction;