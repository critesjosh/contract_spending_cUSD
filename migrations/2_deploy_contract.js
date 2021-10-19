var cUSD_spender = artifacts.require('cUSD_spender')

const ALFAJORES_CUSD = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
const MAINNET_CUSD = "0x765DE816845861e75A25fCA122bb6898B8B1282a"

module.exports = function(deployer) {
  deployer.deploy(cUSD_spender, ALFAJORES_CUSD)
}