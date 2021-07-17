const { expect } = require("chai");
const { describe } = require("mocha");
const validate = require("../../core/domain/schema/validator");

const Action = require('../../core/domain/Action')

const test_data = {
    name: 'Generate Address',
    slug: 'generate-address',
    description: 'This action connects to the crypto provider and generates and save a crypto address'
}

describe('Action', () => {

    describe("#constructor", () => {

        describe("can create action", () => {
            it("creates a action object", () => {
                const action = new Action(...Object.values(test_data))
                expect(action).to.not.be.null;
            });
        });
    })

    describe("#toObject", () => {

        describe("can get to json object", () => {
            it("returns the action object", () => {
                const json_object = new Action(...Object.values(test_data)).toObject()
                expect(json_object).to.be.an('object')
                expect(json_object).to.deep.equal(test_data);
            });
        });

        describe("can change or edit properties", () => {
            it("changes a action properties", () => {
                const action = new Action(...Object.values(test_data))
                action.name = 'Generate Crypto Address'
                expect(action.toObject()).to.not.deep.equal(test_data);
                expect(action.name).to.equal('Generate Crypto Address');
            });
        });
    })

    describe('#validate', () => {
        describe("when any value is missing", () => {
            it("returns an error", () => {
                const { error, value } = validate(new Action())

                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when any all values are present", () => {
            it("does not return an error", () => {
                const { error, value } = validate(new Action(...Object.values(test_data)))

                expect(error).to.be.undefined;
                expect(value).to.deep.equal(test_data);
            });
        });
    })
})