const { expect } = require("chai");
const { describe } = require("mocha");
const validate = require("../../core/domain/schema/validator");

const Transaction = require('../../core/domain/Transaction')
const Crypto = require('../../core/domain/Crypto')

crypto_test_data = {
    name: 'Bitcoin',
    slug: 'bitcoin',
    sign: 'B',
    symbol: 'BTC',
    type: 'utxo-asset',
    is_active: true
}

const test_data = {
    uuid: 'dn3h38u4874umii209u2hn2dk0384hf84u',
    reference: 'nfgb3t638j3bdy3hd3ui3kd3hdu',
    txid: null,
    crypto: new Crypto(...Object.values(crypto_test_data)).toObject(),
    address: 'd3nid39j4fhb438j4f494fko4f4',
    amount: 0.04,
    fee: 0.0000004,
    status: 'successful',
    type: 'send',
    memo: 'payment for books',
    created_at: '2016-07-16T22:52:54.000Z',
    updated_at: '2016-07-16T22:52:54.000Z'
}

const all_except_crypto_test_data = {
    uuid: this.uuid,
    reference: this.reference,
    txid: this.txid,
    crypto: null,
    address: this.address,
    amount: this.amount,
    fee: this.fee,
    status: this.status,
    type: this.type,
    memo: this.memo,
    created_at: this.created_at,
    updated_at: this.updated_at
}

const only_crypto_test_data = {
    uuid: null,
    reference: null,
    txid: null,
    crypto: new Crypto(...Object.values(crypto_test_data)).toObject(),
    address: null,
    amount: null,
    fee: null,
    status: null,
    type: null,
    memo: null,
    created_at: null,
    updated_at: null
}

describe('Transaction', () => {
    describe("#constructor", () => {

        describe("can create transaction", () => {
            it("creates a transaction object", () => {
                const transaction = new Transaction(...Object.values(test_data))
                expect(transaction).to.not.be.null;
            });
        });
    })

    describe("#toObject", () => {

        describe("can get to json object", () => {
            it("returns the transaction object", () => {
                const json_object = new Transaction(...Object.values(test_data)).toObject()
                expect(json_object).to.be.an('object')
                expect(json_object).to.deep.equal(test_data);
            });
        });

        describe("can change or edit properties", () => {
            it("changes a transaction properties", () => {
                const transaction = new Transaction(...Object.values(test_data))
                transaction.memo = 'payment for car'
                expect(transaction.toObject()).to.not.deep.equal(test_data);
                expect(transaction.memo).to.equal('payment for car');
            });
        });
    })

    describe('#validate', () => {

        describe("when all values are missing", () => {
            it("returns an error", () => {
                const { error, value } = validate(new Transaction())
                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when only crypto is missing", () => {
            it("returns an error", () => {
                const { error, value } = validate(new Transaction(...Object.values(all_except_crypto_test_data)))
                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when all value except crypto", () => {
            it("returns an error", () => {
                const { error, value } = validate(new Transaction(...Object.values(only_crypto_test_data)))
                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when any all values are present", () => {
            it("does not return an error", () => {                
                const { error, value } = validate(new Transaction(...Object.values(test_data)))

                expect(error).to.be.undefined;
                expect(value).to.deep.equal(test_data);
            });
        });
    })
})