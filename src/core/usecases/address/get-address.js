const Crypto = require("../../domain/Crypto")
const Address = require("../../domain/Crypto")
const code = require("../../../helpers/codes")

function getAddress(repositories) {

  return async (address) => {

    var data = {}

    try {        
        const address_response = await repositories.address.findOneBy('address', address, false);

        if(!address_response)
        {
            return {
                code: code.NOT_FOUND,
                error: 'address not found',
                data: null
            }
        }

        const cryptos = await repositories.crypto.getAll(true);
        const crypto_response = cryptos.find(c => c.id === address_response.crypto_id);

        const crypto = {
            id: crypto_response.id,
            name: crypto_response.name,
            slug: crypto_response.slug,
            sign: crypto_response.sign,
            symbol: crypto_response.symbol,
            type: crypto_response.type,
            is_active: crypto_response.is_active
        }

        const current_client = await repositories.client.findOneBy('id', address_response.client_id, true);

        const client = {
            name: current_client.name,
            uuid: current_client.uuid,
            email: current_client.email,
            ip: current_client.ip,
            webhook_url: current_client.webhook_url,
            client_type: current_client.client_type,
            is_active: current_client.is_active
        }

        data = {
            id: address_response.id,
            uuid: address_response.uuid,
            label: address_response.label,
            address: address_response.address,
            crypto: crypto,
            client: client
        }
        
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

module.exports = getAddress;