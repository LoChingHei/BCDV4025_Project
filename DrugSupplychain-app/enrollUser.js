'use strict';

const fs = require('fs');
const path = require('path');

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');

const testNetworkRoot = path.resolve(require('os').homedir(), 'fabric-samples/test-network');

async function main() {
    try {
        let args = process.argv.slice(2);

        const identityLabel = args[0];
        const orgName = identityLabel.split('@')[1];
        const orgNameWithoutDomain = orgName.split('.')[0];

        let connectionProfile = JSON.parse(fs.readFileSync(
            path.join(testNetworkRoot, 
                'organizations/peerOrganizations', 
                orgName, 
                `/connection-${orgNameWithoutDomain}.json`), 'utf8')
        );

        const ca = new FabricCAServices(connectionProfile['certificateAuthorities'][`ca.${orgName}`].url);

        const wallet = await Wallets.newFileSystemWallet('./wallet');

        let identity = await wallet.get(identityLabel);
        if (identity) {
            console.log(`An identity for the ${identityLabel} user already exists in the wallet`);
            return;
        }

        const enrollmentID = args[1];
        const enrollmentSecret = args[2];

        // optional
        let enrollmentAttributes = [];
        if (args.length > 3) {
            enrollmentAttributes = JSON.parse(args[3]);
        }

        let enrollmentRequest = {
            enrollmentID: enrollmentID,
            enrollmentSecret: enrollmentSecret,
            attr_reqs: enrollmentAttributes
        };
        const enrollment = await ca.enroll(enrollmentRequest);

        const orgNameCapitalized = orgNameWithoutDomain.charAt(0).toUpperCase() + orgNameWithoutDomain.slice(1);
        identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: `${orgNameCapitalized}MSP`,
            type: 'X.509',
        };

        await wallet.put(identityLabel, identity);
        console.log(`Successfully enrolled ${identityLabel} user and imported it into the wallet`);

    } catch (error) {
        console.error(`Failed to enroll user: ${error}`);
        process.exit(1);
    }
}

main().then(() => {
    console.log('User enrollment completed successfully.');
}).catch((e) => {
    console.log('User enrollment exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
