class Transaction
{
    constructor( uuid, reference, txid, crypto, address, amount, fee, status, type, memo, created_at, updated_at )
    {
        this.uuid = uuid
        this.reference = reference
        this.txid = txid
        this.crypto = crypto
        this.address = address
        this.amount = amount
        this.fee = fee
        this.status = status
        this.type = type
        this.memo = memo
        this.created_at = created_at
        this.updated_at = updated_at
    }

    toObject()
    {
        return {
            uuid: this.uuid,
            reference: this.reference,
            txid: this.txid,
            crypto: this.crypto,
            address: this.address,
            amount: this.amount,
            fee: this.fee,
            status: this.status,
            type: this.type,
            memo: this.memo,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }

    toName()
    {
        return 'transaction'
    }
}

module.exports = Transaction;