const Transaction = require("../../domain/Transaction");
const { generateUuid } = require("../../../common/index")
const code = require("../../../helpers/codes")

function createTransaction(repositories) {

  return async (client, crypto, { txid, status, type, reference, address, amount, fee, memo }) => {

    var data = {}
    
    try {

        let transaction = new Transaction(...Object.values({
            uuid: generateUuid(),
            reference: reference,
            txid: txid,
            crypto: {
                name: crypto.name,
                slug: crypto.slug,
                sign: crypto.sign,
                symbol: crypto.symbol,
                type: crypto.type,
                is_active: crypto.is_active
            },
            address: address,
            amount: amount,
            fee: fee,
            status: status,
            type: type,
            memo: memo
        }))
    
        // const { error, value } = validate(transaction)
    
        // if(error)
        // {
        //     return {
        //         code: code.VALIDATION_ERROR,
        //         error: error.details,
        //         data: null
        //     }
        // }
    
        data = transaction.toObject()

        var insert_data = {
            uuid: data.uuid,
            reference: data.reference,
            txid: data.txid,
            crypto_id: crypto.id,
            client_id: client.id,
            address: data.address,
            amount: data.amount,
            fee: data.fee,
            status: data.status,
            type: data.type,
            memo: data.memo
        }

        const res = await repositories.transaction.create(insert_data);  
        
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

module.exports = createTransaction;