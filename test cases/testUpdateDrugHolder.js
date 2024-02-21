'use strict';

const sinon = require('sinon');
const { expect } = require('chai');

const fabricClientMock = {
    newTransactionID: sinon.stub().returns({ _transaction_id: 'mockTransactionId' }),
    newChannel: sinon.stub().returns({
        addPeer: sinon.stub(),
        addOrderer: sinon.stub(),
        sendTransactionProposal: sinon.stub().resolves([[{ response: { status: 200 } }], {}]),
        sendTransaction: sinon.stub().resolves({ status: 'SUCCESS' }),
        newEventHub: sinon.stub().returns({
            setPeerAddr: sinon.stub(),
            connect: sinon.stub(),
            registerTxEvent: sinon.stub(),
            unregisterTxEvent: sinon.stub(),
            disconnect: sinon.stub()
        })
    }),
    newDefaultKeyValueStore: sinon.stub().resolves({}),
    newCryptoSuite: sinon.stub().returns({
        setCryptoKeyStore: sinon.stub()
    }),
    setStateStore: sinon.stub(),
    getUserContext: sinon.stub().resolves({ isEnrolled: () => true }),
    newCryptoKeyStore: sinon.stub().returns({}),
    setCryptoSuite: sinon.stub()
};

const fsMock = {
    readFileSync: sinon.stub().returns(JSON.stringify({ certificateAuthorities: { 'ca.org1.example.com': { url: 'mockUrl' } } }))
};

const pathMock = {
    join: sinon.stub().returns('mockPath')
};

const osMock = {
    homedir: sinon.stub().returns('mockHomeDir')
};

const main = require('./main');

describe('User Registration', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(console, 'log');
        sandbox.stub(console, 'error');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should successfully register user', async () => {
        sandbox.stub(process, 'argv').value(['node', 'filename.js', 'user1', 'enrollmentId', '{}']);
        sandbox.stub(osMock, 'homedir').returns('mockHomeDir');
        sandbox.stub(fabricClientMock, 'getUserContext').resolves({ isEnrolled: () => true });

        await main();

        sinon.assert.calledOnce(console.log);
    });

    it('should handle error during registration', async () => {
        sandbox.stub(process, 'argv').value(['node', 'filename.js', 'user1', 'enrollmentId', '{}']);
        sandbox.stub(osMock, 'homedir').returns('mockHomeDir');
        sandbox.stub(fabricClientMock, 'getUserContext').resolves(null);

        await main();

        sinon.assert.calledOnce(console.error);
    });
});
