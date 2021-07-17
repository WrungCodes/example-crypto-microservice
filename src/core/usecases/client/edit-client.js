const Client = require("../../domain/Client");
const validate = require("../../domain/schema/validator");
const { cleanObject, decryptData } = require("../../../common/index")
const code = require("../../../helpers/codes")

function editClient(configuration, repositories) {

  return async (uuid, {name, email, ip, webhook_url, is_active}) => {

    const { key, algorithm } = configuration.encryption

    var data = cleanObject({
        name: name,
        email: email,
        ip: ip,
        webhook_url: webhook_url,
        is_active: is_active
    })

    var merged_data = {}

    try {
        const current_client = await repositories.client.findOneBy('uuid', uuid);

        if(!current_client)
        {
            return {
                code: code.NOT_FOUND,
                error: 'client not found',
                data: null
            }
        }

        const old_data = {
            name: current_client.name,
            uuid: current_client.uuid,
            email: current_client.email,
            api_key: current_client.api_key,
            ip: current_client.ip,
            webhook_url: current_client.webhook_url,
            client_type: current_client.client_type,
            is_active: current_client.is_active
        }
    
        merged_data = {...old_data, ...data};
    
        const client = new Client(...Object.values(merged_data))
    
        const { error, value } = validate(client)
    
        if(error)
        {
            return {
                code: code.VALIDATION_ERROR,
                error: error.details,
                data: null
            }
        }

        const res = await repositories.client.editOneById(current_client.id, client.toObject(), true);  
        data = client.toObject()
        data.id = current_client.id

        await repositories.client.clearFindOneByCache('uuid', uuid)
        await repositories.client.clearFindOneByCache('id', current_client.id)
        
    } catch (error) {

        return {
            code: code.SERVER_ERROR,
            error: error,
            data: null
        }
    }

    merged_data.api_key = decryptData(key, algorithm, merged_data.api_key)

    return {
        code: code.SUCCESS,
        error: null,
        data: data
    }
  };
}

module.exports = editClient;