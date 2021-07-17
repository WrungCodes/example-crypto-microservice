const Transaction = require("../../domain/Transaction");
const code = require("../../../helpers/codes")

function updateTransaction(repositories) {

  return async (uuid, { txid, status }) => {

    var data = {}
    
    try {

        const current_transaction = await repositories.transaction.findOneBy('uuid', uuid);

        if(!current_transaction)
        {
            return {
                code: code.NOT_FOUND,
                error: 'transaction not found',
                data: null
            }
        }

        const cryptos = await repositories.crypto.getAll(true);
        const crypto_response = cryptos.find(c => c.id === current_transaction.crypto_id);
        const current_client = await repositories.client.findOneBy('id', current_transaction.client_id, true);

        const client = {
            name: current_client.name,
            uuid: current_client.uuid,
            email: current_client.email,
            ip: current_client.ip,
            webhook_url: current_client.webhook_url,
            client_type: current_client.client_type,
            is_active: current_client.is_active
        }

        const crypto = {
            id: crypto_response.id,
            name: crypto_response.name,
            slug: crypto_response.slug,
            sign: crypto_response.sign,
            symbol: crypto_response.symbol,
            type: crypto_response.type,
            is_active: crypto_response.is_active
        }

        data = {
            uuid: current_transaction.uuid,
            reference: current_transaction.reference,
            txid: txid,
            crypto: crypto,
            client: client,
            address: current_transaction.address,
            amount: current_transaction.amount,
            fee: current_transaction.fee,
            status: status,
            type: current_transaction.type,
            memo: current_transaction.memo,
            created_at: current_transaction.created_at,
            updated_at: current_transaction.updated_at
        }

        const res = await repositories.client.editOneById(current_transaction.id, data);  
        
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

module.exports = updateTransaction;