# Spending cUSD from another Solidity Contract

Simple app to demo how to use a contract to spend cUSD on a users behalf.

## Spending cUSD on behalf of users

This example demonstrates how a contract can be designed to spend cUSD for a user. View the simple contract in `./contracts/cUSD_spender.sol`. This contract is too simple to be useful, but demonstrates the necessary concepts, namely how to access the cUSD contract from another Solidity contract.

Before the cUSD_spender contract can spend cUSD on behalf of a user, the user must approve the contract to spend cUSD for them. The `./webpage` directory shows how you can do this. Essentially, in the UI the dapp will request a transaction from the user, to the cUSD contract, calling the `approve` function for the desired amount. Once the `approve` transaction is confirmed, the dapp can request to `send` cUSD from the user's account.

## Get Started

1. Run yarn install in the project root.
2. Run `node createAccount.js`. This will print new Celo account details. Copy the private key for your new account into the PRIVATE_KEY variable in .env.
3. Fund the account address on the Alfajores testnet here: https://celo.org/developers/faucet
4. Deploy your own cUSD_spender contract to the Alfajores testnet with `truffle migrate --network alfajores`
5. Move into the `./webage` directory. Run `yarn` to install the dependencies.
6. Run the web server with `yarn dev`.
