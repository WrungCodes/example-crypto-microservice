const Client = require("../../domain/Client");
const { encryptData, decryptData } = require("../../../common/index")
const code = require("../../../helpers/codes")

function retrieveClient(configuration, repositories) {

  return async () => {

    const { key, algorithm } = configuration.encryption

    var data = {}
    
    try {

        const clients = await repositories.client.getAll();

        data = clients.map(function(element){
            let client = new Client(...Object.values({
                name: element.name,
                uuid: element.uuid,
                email: element.email,
                api_key: '**************', //decryptData(key, algorithm, element.api_key),
                ip: element.ip,
                webhook_url: element.webhook_url,
                client_type: element.client_type,
                is_active: element.is_active
            }))

            var c = client.toObject()
            c.id = element.id

            return c
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

module.exports = retrieveClient;