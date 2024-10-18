// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender){}

    // Mint function allows the owner to create new tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}