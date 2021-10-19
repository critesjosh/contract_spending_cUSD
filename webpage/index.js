let Web3 = require("web3")
let ContractKit = require("@celo/contractkit")
let BigNumber = require("bignumber.js")
let erc20Abi = require("../build/contracts/IERC20.json").abi
let cUSD_spender = require("../build/contracts/cUSD_spender.json")

const ERC20_DECIMALS = 18
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
      cUSD_spender_contract = new kit.web3.eth.Contract(cUSD_spender.abi, cUSD_spender[chainId].address)
      
    } catch (error) {
      console.log(`⚠️ ${error}.`)
    }
  } else {
    console.log("⚠️ Please install Metamask.")
  }
}


async function approve(amount) {
  const result = await cUSDcontract.methods
    .approve(cUSD_spender_contract.address, amount)
    .send({ from: kit.defaultAccount })

  showTxHash(result.transactionHash) 
  return result
}

async function send(recipient, amount) {
  const result = await cUSD_spender_contract.methods
    .send(recipient, amount)
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
    approve()
}) 

document.querySelector("#send").addEventListener("click", async (e) => {
  send()
}) 