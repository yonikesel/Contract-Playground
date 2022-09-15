// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract RECToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Recognition", "REC") {
        _mint(msg.sender, initialSupply);
    }

    function Mint(uint256 amount) external onlyOwner {
        _mint(msg.sender, amount);
    }
}
