const { expect } = require("chai");
const { describe } = require("mocha");
const validate = require("../../core/domain/schema/validator");

const Client = require('../../core/domain/Client')

const test_data = {
    name: 'main service',
    uuid: 'wydbfir4msof9d0an4htiqlricn49t',
    email: 'danieltosinfayemi@gmail.com',
    api_key: 'crypto-service-hw23844i303-3yh3b3u3n3',
    ip: '168.232.252.0',
    webhook_url: 'https://www.chaijs.com/api/bdd/',
    client_type: 'user',
    is_active: true
}

describe('Client', () => {

    describe("#constructor", () => {

        describe("can create client", () => {
            it("creates a client object", () => {
                const client = new Client(...Object.values(test_data))
                expect(client).to.not.be.null;
            });
        });
    })

    describe("#toObject", () => {

        describe("can get to json object", () => {
            it("returns the client object", () => {
                const json_object = new Client(...Object.values(test_data)).toObject()
                expect(json_object).to.be.an('object')
                expect(json_object).to.deep.equal(test_data);
            });
        });

        describe("can change or edit properties", () => {
            it("changes a client properties", () => {
                const client = new Client(...Object.values(test_data))
                client.email = 'danieltosin@gmail.com'
                expect(client.toObject()).to.not.deep.equal(test_data);
                expect(client.email).to.equal('danieltosin@gmail.com');
            });
        });
    })

    describe('#validate', () => {
        describe("when any value is missing", () => {
            it("returns an error", () => {
                const { error, value } = validate(new Client())

                expect(error).to.not.be.null;
                expect(error.details).to.be.an('array')
            });
        });

        describe("when any all values are present", () => {
            it("does not return an error", () => {
                const { error, value } = validate(new Client(...Object.values(test_data)))

                expect(error).to.be.undefined;
                expect(value).to.deep.equal(test_data);
            });
        });
    })
})