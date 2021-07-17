const Client = require("../../domain/Client");
const validate = require("../../domain/schema/validator");
const { generateUuid, generateApiKey, encryptData, decryptData } = require("../../../common/index")
const code = require("../../../helpers/codes")

function createClient(configuration, repositories) {

  return async (name, email, ip, webhook_url) => {

    const { key, algorithm } = configuration.encryption

    var data = {
        name: name,
        uuid: generateUuid(),
        email: email,
        api_key: encryptData(key, algorithm, generateApiKey()),
        ip: ip,
        webhook_url: webhook_url,
        client_type: 'user',
        is_active: true
    }

    const client = new Client(...Object.values(data))

    const { error, value } = validate(client)

    if(error)
    {
        return {
            code: code.VALIDATION_ERROR,
            error: error.details,
            data: null
        }
    }

    try {
        const same_email = await repositories.client.findOneBy('email', data.email);
        const same_api_key = await repositories.client.findOneBy('api_key', data.api_key);
    
        if(same_api_key || same_email)
        {
            return {
                code: code.DUPLICATE_ERROR,
                error: 'duplicated data found in client creation',
                data: null
            }
        }

        const res = await repositories.client.create(client.toObject(), false);  
        data = client.toObject()
        data.id = res.id
        
    } catch (error) {
        return {
            code: code.SERVER_ERROR,
            error: error,
            data: null
        }
    }

    data.api_key = decryptData(key, algorithm, data.api_key)

    return {
        code: code.SUCCESS,
        error: null,
        data: data
    }
  };
}

module.exports = createClient;