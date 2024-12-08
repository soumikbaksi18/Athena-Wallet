// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script, console} from "../lib/forge-std/src/Script.sol";
import "../src/SwapMaker.sol";

contract Deploy is Script {
    function run() external {
    
        vm.startBroadcast();

        address tokenA = 0x41007C72d52D5389a135e993af1D6A02761595bE;
        address tokenB = 0x944eC8CD3CdA1D2abD311bd942421E7D5Bd998F1;

        SwapContractWithYield swapContract = new SwapContractWithYield(tokenA, tokenB);
        console.log("SwapContractWithYield deployed at:", address(swapContract));

        vm.stopBroadcast();
    }
}
