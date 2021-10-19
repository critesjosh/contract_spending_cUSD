// SPDX-License-Identifier: Apache License 2.0

pragma solidity >0.5.0 <0.9.0;

// The IERC20 Interface tells the cUSD_spender contract what functions are available on the cUSD contract
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

/* 

This is a useless contract that exists to demonstrate how you can set up a contract to
spend cUSD on a users behalf.

*/

contract cUSD_spender {

    //
    IERC20 public cUSD;

    // Pass the address of the cUSD contract to the constructor so the cUSD_spender
    // contract knows where the cUSD contract is.

    // cUSD (Alfajores testnet) = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
    // cUSD (Celo mainnet) =      "0x765DE816845861e75A25fCA122bb6898B8B1282a"
    constructor(IERC20 _cUSDAddress) public {
        cUSD = _cUSDAddress;
    }

    function send(address recipient, uint256 amount) public {
        
        // Check that this cUSD_spender contract is authorized to spend the specified amount
        // of cUSD on behalf of the sender.
        require(
            cUSD.allowance(msg.sender, address(this)) >= amount, "Not authorized"
        );
        
        // Transfer cUSD to the recipient
        cUSD.transferFrom(msg.sender, recipient, amount);
        
        // Emit an event
        // This event is unnecessary because the same thing is emitted by the cUSD
        // contract, but it is good practice to emit events from contract functions.
        emit cUSDTransferred(msg.sender, recipient, amount);
    }
    
    // Define the event
    event cUSDTransferred(address indexed from, address indexed to, uint256 value);
}
