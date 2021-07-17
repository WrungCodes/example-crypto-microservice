const { expect } = require("chai");
const { describe } = require("mocha");
const validate = require("../../core/domain/schema/validator");

const Address = require('../../core/domain/Address')
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
    uuid: 'gs5353ygb3yg373vd3ct3cfg3g38hby37',
    label: 'danielsdan',
    address: 'bhdu3gd73u393j3u3hd83j3du3gd738ui03pl3k',
    crypto: new Crypto(...Object.values(crypto_test_data)).toObject()
}

const all_except_crypto_test_data = {
    uuid: 'gs5353ygb3yg373vd3ct3cfg3g38hby37',
    label: 'danielsdan',
    address: 'bhdu3gd73u393j3u3hd83j3du3gd738ui03pl3k',
    crypto: new Crypto().toObject()
}

const only_crypto_test_data = {
    uuid: null,
    label: null,
    address: null,
    crypto: new Crypto(...Object.values(crypto_test_data)).toObject()
}

describe('Address', () => {
    describe("#constructor", () => {

        describe("can create address", () => {
            it("creates a address object", () => {
                const address = new Address(...Object.values(test_data))
                expect(address).to.not.be.null;
            });
        });
    })

    describe("#toObject", () => {

        describe("can get to json object", () => {
            it("returns the address object", () => {
                const json_object = new Address(...Object.values(test_data)).toObject()
                expect(json_object).to.be.an('object')
                expect(json_object).to.deep.equal(test_data);
            });
        });

        describe("can change or edit properties", () => {
            it("changes a address properties", () => {
                const address = new Address(...Object.values(test_data))
                address.label = 'danieltosinfayemi'
                expect(address.toObject()).to.not.deep.equal(test_data);
                expect(address.label).to.equal('danieltosinfayemi');
            });
        });
    })

    describe('#validate', () => {
        describe("when only crypto is missing", () => {
            it("returns an error", () => {
                const { error, value } = validate(new Address(...Object.values(all_except_crypto_test_data)))
                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when all value except crypto", () => {
            it("returns an error", () => {
                const { error, value } = validate(new Address(...Object.values(only_crypto_test_data)))
                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when any all values are present", () => {
            it("does not return an error", () => {                
                const { error, value } = validate(new Address(...Object.values(test_data)))

                expect(error).to.be.undefined;
                expect(value).to.deep.equal(test_data);
            });
        });
    })
})