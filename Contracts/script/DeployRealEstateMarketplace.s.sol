// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/RealEstateMarketplace.sol"; // adjust path

contract Deploy is Script {
    function run() external returns (RealEstateMarketplace) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        RealEstateMarketplace realEstate = new RealEstateMarketplace(); 
        vm.stopBroadcast();
        return realEstate;
    }
}
