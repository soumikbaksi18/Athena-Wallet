// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script, console} from "../lib/forge-std/src/Script.sol";
import "../src/Lending.sol";

contract DeployLendingContract is Script {
    function run() external {
        // Define LP token and deposit token addresses
        address lpToken = 0x36bE7bD5550DD5A1B56f8D34Cf3A20b2E2E657C0;
        address usdcToken = 0x1eA3b9fc2ACFAB2Ee16F7515727999C52A8F9B7E;

        // Start broadcast
        vm.startBroadcast();

        // Deploy the Lending Contract
        LendingContract lendingContract = new LendingContract(lpToken, usdcToken);

        console.log("Lending Contract deployed at:", address(lendingContract));

        vm.stopBroadcast();
    }
}
