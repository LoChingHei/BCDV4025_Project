# Hyperledger Fabric in the Pharmaceutical industry

# Project Description

Simple use case to demonstrate supply-chain management in the pharmaceutical industry using HyperLedger Fabric blockchain and HTML webpage. 
The application included functions of "Query All Drug On chain", "Query a Specific Drug ID", "Create Drug Movement Record", and "Change Drug product Current Holder".
Our application will allow users to track the specific drug moving from Drug Manufacturer to pharmacy. Between the Manufacturer and Pharmacy stages, we will track the drug
status when the Wholesaler, packager, or distributor holds the specific drug. Currently, drugs are difficult to track during transportation which leads to counterfeit drugs
and companies face problems with regulatory compliance because we can't exactly confirm the source of the drug without stamps confirming the time of packaging and location.
Also, drugs have a few stages of processing, and before being packaged, drugs can be sent directly to hospitals or pharmacies which makes it much more difficult to track such unmarked 
drugs, we are going to create timestamps with the date and location during all stages of producing and transporting drugs regardless of whether they are packaged or unpackaged, and it will
add traceability and transparency to the drug distribution process. Besides, smart contracts will allow us to automate stamping, making the whole process more resistant to human
errors. In conclusion, this application will allow tracking of the entire drug distribution and manufacturing process, and it will be easier for companies to share information about 
the distribution between different organizations participating in the drug distribution process.

Fututre Plans: • Increased Traceability and Transparency: Blockchain will continue to play a crucial role in enhancing traceability and transparency throughout in the drug supply chain. By leveraging immutable ledgers and smart contracts, companies can ensure that every step of the drug manufacturing and distribution process is recorded transparently and securely. • Integration with IoT Devices: Integration with the Internet of Things (IoT)-smartwatches, and devices will become more prevalent, enabling real-time tracking of pharmaceutical products from manufacturing facilities to end consumers. IoT sensors can provide data on temperature, humidity, and other environmental factors, ensuring the integrity and quality of drugs throughout their journey. • Enhanced Regulatory Compliance: Blockchain solutions will help pharmaceutical companies meet regulatory compliance requirements more efficiently. By providing a tamper-proof record of transactions and drug movements, companies can streamline regulatory reporting and audits, reducing the risk of non-compliance and associated penalties. • Interoperability and Collaboration: There will be a focus on interoperability and collaboration among different stakeholders in the pharmaceutical supply chain. Blockchain networks built on Hyperledger Fabric will facilitate secure data sharing and collaboration between manufacturers, wholesalers, distributors, pharmacies, and regulatory authorities, improving efficiency and trust.

## Team
Lo Ching Hei (101486171)

Kirill Spitsyn 

Kevon Vincent Jaggassar  

Tafadzwa Mataire

## Requirements

`"fabric-samples" repository to run the testnet [4Gb of memory]` 

`Operating Systems: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), or Mac OS 10.12`

`Docker Engine: Version 17.03 or higher` 

`Docker-Compose: Version 1.8 or higher` 

`Node: 8.9 or higher (note version 9 is not supported)`

`npm: v5.x git: 2.9.x or higher`

## Architecture Diagram (State Diagram)

![image](https://github.com/LoChingHei/BCDV4025_Project/assets/72778161/c928c6cd-1de4-45cb-ad3d-7942088eef2e)


## Sequence Diagram

![AssignmentBCDV4025](https://github.com/LoChingHei/BCDV4025_Project/assets/72778161/af1e9f79-0483-4ae1-8ec3-3a3457b94fad)


## Roles and Policies
Key components of an Endorsement Policy (Planning)

Participant Roles and Permissions:
Clearly define the roles of participants in the network, such as manufacturers, distributors, pharmacies, and regulatory bodies. Specify the permissions each participant has regarding the endorsement of transactions.

Criteria for Endorsement:
Establish criteria for a transaction to be endorsed that need to be met. For example, verifying the authenticity of the products, ensuring compliance with regulatory standards, and confirming the accuracy of transaction details.

Auditability and Transparency:
Stakeholders should be able to review the history of endorsements and validate the integrity of the entire supply chain ledger.

## Snapshots of application, results

Get all drugs function:

<img width="867" alt="Screenshot 2024-02-21 at 4 15 26 PM" src="https://github.com/LoChingHei/BCDV4025_Project/assets/145512379/dab97d27-98d7-4527-b485-23ebc4cb133b">

Get drug with ID "1" function:

<img width="850" alt="Screenshot 2024-02-21 at 4 31 02 PM" src="https://github.com/LoChingHei/BCDV4025_Project/assets/145512379/36345e85-d82d-4e77-a907-c9201a9bbb74">

Add drug with ID "3" to the list:

<img width="848" alt="Screenshot 2024-02-21 at 4 24 27 PM" src="https://github.com/LoChingHei/BCDV4025_Project/assets/145512379/555a3f05-c1a2-4603-9c58-8399c9eb22a3">

Get all drugs function, we can see that drug "3" was added:

<img width="934" alt="Screenshot 2024-02-21 at 4 17 48 PM" src="https://github.com/LoChingHei/BCDV4025_Project/assets/145512379/b38aca47-44e2-4857-940f-a16553a206e8">

Change current drug holder functionality:

<img width="870" alt="Screenshot 2024-02-21 at 5 05 09 PM" src="https://github.com/LoChingHei/BCDV4025_Project/assets/145512379/5b5a0c02-4ea6-40a1-8da4-03a4d2a0df9c">




