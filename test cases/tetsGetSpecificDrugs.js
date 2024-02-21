'use strict';

const sinon = require('sinon');
const { expect } = require('chai');

const fabricClientMock = {
    newChannel: sinon.stub().returns({
        addPeer: sinon.stub(),
        queryByChaincode: sinon.stub().resolves(['Mock response'])
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

describe('Query Drug', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(console, 'log');
        sandbox.stub(console, 'error');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should successfully query the drug', async () => {
        const req = { params: { id: 'mockKey' } };
        const res = { send: sinon.stub() };

        await main(req, res);

        sinon.assert.calledOnce(console.log);
        sinon.assert.calledWith(res.send, 'Mock response');
    });

    it('should handle error during query', async () => {
        sandbox.stub(fabricClientMock, 'queryByChaincode').rejects(new Error('Mock query error'));

        const req = { params: { id: 'mockKey' } };
        const res = { send: sinon.stub() };

        await main(req, res);

        sinon.assert.calledOnce(console.error);
    });
});
