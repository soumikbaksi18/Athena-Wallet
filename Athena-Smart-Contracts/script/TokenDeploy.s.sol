// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script, console} from "../lib/forge-std/src/Script.sol"; // Import path as you requested

import {ChillToken} from "../src/ChillToken.sol";
import {EthToken} from "../src/EthToken.sol";
import {UsdcToken} from "../src/UsdcToken.sol";

contract DeployChillToken is Script {
    function run() external {

        // Start the transaction
        vm.startBroadcast();

        ChillToken chillToken = new ChillToken();
        EthToken ethToken = new EthToken();
        UsdcToken usdcToken = new UsdcToken();

        vm.stopBroadcast();

        console.log("Deployed ChillToken contract at:", address(chillToken));
        console.log("Deployed EthToken contract at:", address(ethToken));
        console.log("Deployed UsdcToken contract at:", address(usdcToken));
    }
}
