let Web3 = require("web3")
let ContractKit = require("@celo/contractkit")
let erc20Abi = require("../build/contracts/IERC20.json").abi
let cUSD_spender = require("../build/contracts/cUSD_spender.json")

const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

let kit
let cUSDcontract
let cUSD_spender_contract

// Connect to Metamask
// Get the users account
// Initialize the contract that you want to interact with on the appropriate network
const connectCeloWallet = async function () {
  if (window.ethereum) {
    try {

      // Enable the extension to access the page if it isn't already enabled
      await window.ethereum.enable()

      // Get the ethereum provider injected by metamask
      const web3 = new Web3(window.ethereum)
      kit = ContractKit.newKitFromWeb3(web3)

      // Get the users accounts
      const accounts = await kit.web3.eth.getAccounts()
      kit.defaultAccount = accounts[0]

      // Get the network that the user is connected to
      let chainId = await kit.web3.eth.getChainId()

      // Initialize the cUSD contract w/ ABI & address
      cUSDcontract = new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress)
      // Initialize the cusd spender contract with abi & address for the current network
      cUSD_spender_contract = new kit.web3.eth.Contract(cUSD_spender.abi, cUSD_spender.networks[chainId].address)
      
    } catch (error) {
      console.log(`⚠️ ${error}.`)
    }
  } else {
    console.log("⚠️ Please install Metamask.")
  }
}


async function approve(amount) {

  const result = await cUSDcontract.methods
    // Call the approve function on the cUSD contract
    // Pass the cUSD spender contract address to approve it
    // Convert the amount of cUSD to the appropriate units (cUSD has 10^18 decimal places, like Ether)
    .approve(cUSD_spender_contract._address, kit.web3.utils.toWei(amount, "ether"))
    .send({ from: kit.defaultAccount })

  // print the tx hash on the UI
  showTxHash(result.transactionHash) 
}

async function send(recipient, amount) {
  const result = await cUSD_spender_contract.methods
    // Call the "send" function on the cUSD_spender contract
    .send(recipient, kit.web3.utils.toWei(amount, "ether"))
    .send({ from: kit.defaultAccount })

    showTxHash(result.transactionHash) 
}

const showTxHash = async function(transactionHash){
  let link = `https://alfajores-blockscout.celo-testnet.org/tx/${transactionHash}`
  document.querySelector("#txHash").textContent = link
  document.getElementById("txHash").href = link
}

document.querySelector("#login").addEventListener("click", async (e) => {
  connectCeloWallet()
})  

document.querySelector("#approve").addEventListener("click", async (e) => {
    let amount = document.getElementById('amount').value
    approve(amount)
}) 

document.querySelector("#send").addEventListener("click", async (e) => {
  let amount = document.getElementById('amount').value
  let recipient = "0x5038ae19CDf0B623e6e8015249ecF58A1165D653" // this address is the recipeint of the cUSD coming from the cUSD_spender
  send(recipient, amount)
}) 