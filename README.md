# m$ecure 3.0 - Password Manager

mSecure 3.0 is a password manager website leveraging blockchain technology for enhanced security. The project incorporates a smart contract written in Solidity, compiled using Remix IDE and connected to Ganache for free test network. 

## Benefits of Blockchain Technology in Password Management

Blockchain technology offers several advantages when applied to password management systems:

1. **Enhanced Security**: Blockchain ensures secure storage of sensitive data by encrypting passwords and distributing them across a decentralized network. This eliminates the risk of a single point of failure.

2. **Immutable Ledger**: Once data is recorded on the blockchain, it cannot be altered or deleted, providing a tamper-resistant system for storing passwords and user information.

3. **Decentralization**: Traditional password managers store data on centralized servers, making them vulnerable to hacking and data breaches. By decentralizing data storage, blockchain mitigates these risks.

4. **Transparency and Auditability**: The transparent nature of blockchain technology allows users to verify the integrity of their data at any time. All transactions are recorded on the public ledger, ensuring accountability and auditability.



## Getting Started

To use mSecure 3.0, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/manan3101/mSecure3.0.git

2. Deploy `SMART CONTRACT` by connecting ganache and IDE with METAMASK and Update the `ABI.json` file.

3. Start the server:
   ```bash
   npm start

4. open the Ethereum Network in ganache
   
5. Run the client-side:
   ```bash
   npm run dev
   ```



## Project Structure

- `client`: Contains frontend files developed using React/Vite.
- `api`: Backend files developed using Node.js.
- `password.sol`: Smart contract written in Solidity for the password manager.

By leveraging blockchain technology, mSecure 3.0 offers a secure and decentralized solution for managing passwords, ensuring user privacy and data integrity.

