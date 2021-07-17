class CryptoAction
{
    constructor( crypto, action, is_active )
    {
        this.crypto = crypto
        this.action = action
        this.is_active = is_active
    }

    toObject()
    {
        return {
            crypto: this.crypto,
            action: this.action,
            is_active: this.is_active
        }
    }

    toName()
    {
        return 'cryptoaction'
    }
}

module.exports = CryptoAction;