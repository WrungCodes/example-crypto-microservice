const { expect } = require("chai");
const { describe } = require("mocha");
const validate = require("../../core/domain/schema/validator");

const Crypto = require('../../core/domain/Crypto')
const Action = require('../../core/domain/Action')
const CryptoAction = require('../../core/domain/CryptoAction')

const crypto_test_data = {
    name: 'Bitcoin',
    slug: 'bitcoin',
    sign: 'B',
    symbol: 'BTC',
    type: 'utxo-asset',
    is_active: true
}

const action_test_data = {
    name: 'Generate Address',
    slug: 'generate-address',
    description: 'This action connects to the crypto provider and generates and save a crypto address'
}

const test_data = {
    crypto: new Crypto(...Object.values(crypto_test_data)).toObject(),
    action: new Action(...Object.values(action_test_data)).toObject(),
    is_active: true
}

const test_data_without_crypto = {
    crypto: null,
    action: new Action(...Object.values(action_test_data)).toObject(),
    is_active: true
}

const test_data_without_action = {
    crypto: new Crypto(...Object.values(crypto_test_data)).toObject(),
    action: null,
    is_active: true
}

const test_data_without_action_and_crypto = {
    crypto: null,
    action: null,
    is_active: true
}

describe('CryptoAction', () => {

    describe("#constructor", () => {

        describe("can create crypto action", () => {
            it("creates a crypto action object", () => {
                const action = new CryptoAction(...Object.values(test_data))
                expect(action).to.not.be.null;
            });
        });
    })

    describe("#toObject", () => {

        describe("can get to json object", () => {
            it("returns the crypto action object", () => {
                const json_object = new CryptoAction(...Object.values(test_data)).toObject()
                expect(json_object).to.be.an('object')
                expect(json_object).to.deep.equal(test_data);
            });
        });

        describe("can change or edit properties", () => {
            it("changes a action properties", () => {
                const action = new CryptoAction(...Object.values(test_data))
                action.is_active = false
                expect(action.toObject()).to.not.deep.equal(test_data);
                expect(action.is_active).to.equal(false);
            });
        });
    })

    describe('#validate', () => {
        describe("when any value is missing", () => {
            it("returns an error", () => {
                const { error, value } = validate(new CryptoAction())

                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when crypto value is missing", () => {
            it("returns an error", () => {
                const { error, value } = validate(new CryptoAction(...Object.values(test_data_without_crypto)))

                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when action value is missing", () => {
            it("returns an error", () => {
                const { error, value } = validate(new CryptoAction(...Object.values(test_data_without_action)))

                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when action and crypto value is missing", () => {
            it("returns an error", () => {
                const { error, value } = validate(new CryptoAction(...Object.values(test_data_without_action_and_crypto)))

                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when any all values are present", () => {
            it("does not return an error", () => {
                const { error, value } = validate(new CryptoAction(...Object.values(test_data)))

                expect(error).to.be.undefined;
                expect(value).to.deep.equal(test_data);
            });
        });
    })
})