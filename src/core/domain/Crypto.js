class Crypto
{
    constructor( name, slug, sign, symbol, type, is_active )
    {
        this.name = name
        this.slug = slug
        this.sign = sign
        this.symbol = symbol
        this.type = type
        this.is_active = is_active
    }

    toObject()
    {
        return {
            name: this.name,
            slug: this.slug,
            sign: this.sign,
            symbol: this.symbol,
            type: this.type,
            is_active: this.is_active
        }
    }

    toName()
    {
        return 'crypto'
    }
}

module.exports = Crypto;