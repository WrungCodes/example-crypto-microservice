class Address
{
    constructor( uuid, label, address, crypto )
    {
        this.uuid = uuid
        this.label = label
        this.address = address
        this.crypto = crypto
    }

    toObject()
    {
        return {
            uuid: this.uuid,
            label: this.label,
            address: this.address,
            crypto: this.crypto
        }
    }

    toName()
    {
        return 'address'
    }
}

module.exports = Address;