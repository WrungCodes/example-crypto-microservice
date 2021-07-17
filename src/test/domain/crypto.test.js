const { expect } = require("chai");
const { describe } = require("mocha");
const validate = require("../../core/domain/schema/validator");

const Crypto = require('../../core/domain/Crypto')

const test_data = {
    name: 'Bitcoin',
    slug: 'bitcoin',
    sign: 'B',
    symbol: 'BTC',
    type: 'utxo-asset',
    is_active: true
}

describe('Crypto', () => {

    describe("#constructor", () => {

        describe("can create crypto", () => {
            it("creates a crypto object", () => {
                const crypto = new Crypto(...Object.values(test_data))
                expect(crypto).to.not.be.null;
            });
        });
    })

    describe("#toObject", () => {

        describe("can get to json object", () => {
            it("returns the crypto object", () => {
                const json_object = new Crypto(...Object.values(test_data)).toObject()
                expect(json_object).to.be.an('object')
                expect(json_object).to.deep.equal(test_data);
            });
        });

        describe("can change or edit properties", () => {
            it("changes a crypto properties", () => {
                const crypto = new Crypto(...Object.values(test_data))
                crypto.name = 'BitCoin'
                expect(crypto.toObject()).to.not.deep.equal(test_data);
                expect(crypto.name).to.equal('BitCoin');
            });
        });
    })

    describe('#validate', () => {
        describe("when any value is missing", () => {
            it("returns an error", () => {
                const { error, value } = validate(new Crypto())

                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when any all values are present", () => {
            it("does not return an error", () => {
                const { error, value } = validate(new Crypto(...Object.values(test_data)))

                expect(error).to.be.undefined;
                expect(value).to.deep.equal(test_data);
            });
        });
    })
})