const Client = require("../../domain/Client");
const { encryptData, decryptData } = require("../../../common/index")
const code = require("../../../helpers/codes")

function getClient(configuration, repositories) {

  return async (uuid) => {

    const { key, algorithm } = configuration.encryption

    var data = {}

    try {

        const current_client = await repositories.client.findOneBy('uuid', uuid, true);

        if(!current_client)
        {
            return {
                code: code.NOT_FOUND,
                error: 'client not found',
                data: null
            }
        }

        const client = new Client(...Object.values({
            name: current_client.name,
            uuid: current_client.uuid,
            email: current_client.email,
            api_key: decryptData(key, algorithm, current_client.api_key),
            ip: current_client.ip,
            webhook_url: current_client.webhook_url,
            client_type: current_client.client_type,
            is_active: current_client.is_active
        }))

        data = client.toObject()
        data.id = current_client.id
        
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

module.exports = getClient;