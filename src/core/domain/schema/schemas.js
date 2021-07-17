const Joi = require("joi");

function schemas() {
    const crypto = Joi.object({
        name: Joi.string().required(),

        slug: Joi.string().required(),

        sign: Joi.string().required(),

        symbol: Joi.string().required(),

        type: Joi.string().valid('eth-asset', 'utxo-asset').required(),

        is_active: Joi.boolean().required(),
    })

    const address = Joi.object({
        label: Joi.string().required(),

        address: Joi.string().required(),

        uuid: Joi.string().required(),

        crypto: crypto
    })

    const action = Joi.object({
        name: Joi.string().required(),

        slug: Joi.string().required(),

        is_active: Joi.boolean().required(),
        
        description: Joi.string().required()
    })

    const client = Joi.object({
        name: Joi.string().required().min(3),

        uuid: Joi.string().required(),

        email: Joi.string().email({ tlds: { allow: ['com'] } }).required(),

        api_key: Joi.string().required(),

        ip: Joi.string().ip({ version: [ 'ipv4', 'ipv6' ]}).required(),

        webhook_url: Joi.string().uri().required(),

        client_type: Joi.string().valid('admin','user').required(),

        is_active: Joi.boolean().required(),
    })

    const cryptoaction = Joi.object({
        crypto: crypto,
        action: action,
        is_active: Joi.boolean().required()
    })

    const transaction = Joi.object({
        uuid: Joi.string().required(),
        reference: Joi.string().required(),
        txid: Joi.string().allow(null).raw(),
        crypto: crypto,
        address: Joi.string().required(),
        amount: Joi.number().required(),
        fee: Joi.number().required(),
        status: Joi.string().valid('pending', 'processing', 'successful', 'declined').required(),
        type: Joi.string().valid('send', 'receive').required(),
        memo: Joi.string(),
        created_at: Joi.date().raw().required(),
        updated_at: Joi.date().raw().required()
    })

  return { crypto, address, client, action, cryptoaction, transaction };
}

module.exports = schemas;