# contract_spending_cUSD
 Simple app to demo how to use a contract to spend cUSD on a users behalf.

## Get Started

1. Run yarn install in the project root.
2. Run node createAccount.js. This will print new Celo account details. Copy the private key for your new account into the PRIVATE_KEY variable in .env.
3. Fund the account address on the Alfajores testnet here: https://celo.org/developers/faucet
4. Deploy your own cUSD_spender contract to the Alfajores testnet with `truffle migrate --network alfajores`