'use strict';

const sinon = require('sinon');
const { expect } = require('chai');

const fabricClientMock = {
    newChannel: sinon.stub().returns({
        addPeer: sinon.stub(),
        queryByChaincode: sinon.stub().resolves([{ toString: () => '{"drug1": "details1", "drug2": "details2"}' }])
    }),
    newDefaultKeyValueStore: sinon.stub().resolves({}),
    setStateStore: sinon.stub(),
    getUserContext: sinon.stub().resolves({ isEnrolled: () => true }),
    newCryptoSuite: sinon.stub().returns({
        setCryptoKeyStore: sinon.stub()
    }),
    newCryptoKeyStore: sinon.stub().returns({})
};

const pathMock = {
    join: sinon.stub().returns('mockPath')
};

const osMock = {
    homedir: sinon.stub().returns('mockHomeDir')
};

const main = require('./main');

describe('Query All Drugs', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(console, 'log');
        sandbox.stub(console, 'error');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should successfully query all drugs', async () => {
        await main();

        sinon.assert.calledOnce(console.log);
        sinon.assert.calledWith(res.json, { drug1: 'details1', drug2: 'details2' });
    });

    it('should handle error during query', async () => {
        sandbox.stub(fabricClientMock, 'queryByChaincode').rejects(new Error('Mock query error'));

        await main();

        sinon.assert.calledOnce(console.error);
    });
});
