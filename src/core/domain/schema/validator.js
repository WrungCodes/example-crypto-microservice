const schemas = require('./schemas')

function validate(object, abortEarly = false)
{
    return schemas()[object.toName()].validate(object.toObject(), { abortEarly: abortEarly })
}

module.exports = validate;