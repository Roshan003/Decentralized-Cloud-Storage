# Decentralized Cloud Storage System

The **Decentralized Cloud Storage System** is a blockchain-based application that allows users to securely upload, store, and retrieve files in a decentralized manner using smart contracts and IPFS (InterPlanetary File System).

This guide explains how to use the system, including how to interact with the decentralized application (DApp), upload files, retrieve files, and manage transactions on the blockchain.

## 1. Introduction

The Decentralized Cloud Storage System enables decentralized file storage with Ethereum smart contracts for blockchain interaction and IPFS for storing files. This ensures security and immutability in file management.

## 2. System Overview

### 2.1 Architecture

- **Frontend**: Built using React.js for user interaction.
- **Backend**: Smart contracts written in Solidity, deployed on the Ethereum blockchain.
- **Storage**: Files are stored on IPFS, a decentralized file storage system.
- **MetaMask**: Used for user authentication and blockchain interaction.

## 3. Installation and Setup

### 3.1 Prerequisites

- **MetaMask** browser extension installed and configured.
- **Node.js** (version >= 12) installed.
- **ethers.js** for blockchain interaction.
- **IPFS** to handle decentralized file storage.

### 3.2 Install Dependencies

1. Clone the repository:
   ```bash
   git clone https://github.com/Roshan003/Decentralized-Cloud-Storage.git
   cd Decentralized-Cloud-Storage
Install the required dependencies:

bash
Copy code
npm install
Ensure MetaMask is connected to the appropriate Ethereum network (e.g., Ganache).

Start the application:

bash
Copy code
npm start
Open the application in your browser at http://localhost:3000.

## 4. User Guide

### Uploading Files
Connect MetaMask: Click on "Connect Wallet" to connect your MetaMask account to the application.
Upload File: Use the Upload button to select a file from your local machine. The file is uploaded to IPFS, and the file's hash (CID) is stored on the Ethereum blockchain via a smart contract.
Transaction Confirmation: After uploading, MetaMask will prompt you to confirm the transaction. Once confirmed, the file’s CID is recorded on-chain.

###4.2 Viewing Files
Retrieve File: In the application’s display section, the uploaded files are listed along with their IPFS CID.
Access File: Click on the link associated with a CID to view/download the file from IPFS.

## 5. Blockchain Interaction

### 5.1 Smart Contract Overview
The smart contract is responsible for:

Storing IPFS CIDs of uploaded files.
Managing file ownership.
Enforcing permissions (e.g., who can access the file).
Contract Address: The smart contract is deployed to the Ethereum blockchain at address:
0xYourContractAddressHere

### 5.2 MetaMask Integration
The application uses MetaMask for:

Account management: Connects your Ethereum wallet.
Transaction signing: For uploading files and interacting with the contract.

## 6. File Storage with IPFS
### 6.1 What is IPFS?
The InterPlanetary File System (IPFS) is a decentralized storage solution. Each file uploaded to IPFS is assigned a unique CID, which serves as a permanent reference to that file.

### 6.2 CID (Content Identifier)
Every file stored on IPFS is assigned a CID. This CID is stored on the blockchain as proof of file existence and allows retrieval from IPFS by anyone with the CID.

### 6.3 Retrieving Files
Files can be accessed via any public IPFS gateway:
https://ipfs.io/ipfs/{CID}

## 7. Troubleshooting
### 7.1 Common Issues
MetaMask Not Connected: Ensure MetaMask is installed and connected to the correct network.
Transaction Stuck: If your transaction is stuck pending, check the gas fee and network congestion.
File Not Found: If the file is missing, verify the CID and ensure it has not been removed from the IPFS network.
## 8. Security Considerations
Private Data: Sensitive data should be encrypted before uploading to IPFS, as the content is publicly accessible via the CID.
Smart Contract Risks: Always review the smart contract code before deploying to the main Ethereum network to ensure it is secure.
MetaMask Phishing: Only interact with the application via trusted networks and devices to avoid phishing attacks.
## 9. Technical Support
For further assistance or technical support, please contact:

Developer: Roshan Baig Moghal
Email: rmv33@umsystem.edu
GitHub: https://github.com/Roshan003/Decentralized-Cloud-Storage.git
## 10. Appendix
### 10.1 Code Snippets
Solidity Smart Contract (Upload.sol)
solidity
```bash
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
  
  struct Access{
     address user; 
     bool access; //true or false
  }
  mapping(address=>string[]) value;
  mapping(address=>mapping(address=>bool)) ownership;
  mapping(address=>Access[]) accessList;
  mapping(address=>mapping(address=>bool)) previousData;

  function add(address _user,string memory url) external {
      value[_user].push(url);
  }
  function allow(address user) external {
      ownership[msg.sender][user]=true; 
      if(previousData[msg.sender][user]){
         for(uint i=0;i<accessList[msg.sender].length;i++){
             if(accessList[msg.sender][i].user==user){
                  accessList[msg.sender][i].access=true; 
