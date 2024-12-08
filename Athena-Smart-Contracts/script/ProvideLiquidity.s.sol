// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script, console} from "../lib/forge-std/src/Script.sol";
import "../src/SwapMaker.sol";

contract Deploy is Script {
    function run() external {
        // Address of the deployed SwapContractWithYield
        address SwapContractAddress = 0x36bE7bD5550DD5A1B56f8D34Cf3A20b2E2E657C0;

        // Tokens to provide liquidity
        uint256 amountA = 50 * 10 ** 18; // Assuming tokens have 18 decimals
        uint256 amountB = 50 * 10 ** 18; // Assuming tokens have 18 decimals

        // Start broadcasting transactions
        vm.startBroadcast();

        // Reference the deployed contract
        SwapContractWithYield swapContract = SwapContractWithYield(SwapContractAddress);

        // Ensure the contract has permission to spend the required tokens
        address tokenA = address(swapContract.tokenA());
        address tokenB = address(swapContract.tokenB());

        IERC20(tokenA).approve(SwapContractAddress, amountA);
        IERC20(tokenB).approve(SwapContractAddress, amountB);

        console.log("TokenA Balance:", IERC20(tokenA).balanceOf(msg.sender));
        console.log("TokenB Balance:", IERC20(tokenB).balanceOf(msg.sender));

        console.log("TokenA Allowance:", IERC20(tokenA).allowance(msg.sender, SwapContractAddress));
        console.log("TokenB Allowance:", IERC20(tokenB).allowance(msg.sender, SwapContractAddress));


        // Add liquidity
        swapContract.addLiquidity(50, 50);

        console.log("Successfully added liquidity");

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
