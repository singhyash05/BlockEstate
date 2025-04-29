// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/RealEstateMarketplace.sol";

contract RealEstateMarketplaceTest is Test {
    RealEstateMarketplace marketplace;

    address owner = address(0x1);
    address buyer = address(0x2);
    address thirdParty = address(0x3);

    uint256 initialPropertyPrice = 1 ether;
    string propertyLocation = "123 Main St, CryptoCity";
    string propertyName = "Villa Crypto";
    string propertyDescription = "A beachside luxury villa.";
    uint256 propertyArea = 1500;
    string propertyTokenURI = "https://example.com/property/1";
    RealEstateMarketplace.PropertyTag propertyTag = RealEstateMarketplace.PropertyTag.Beachside;

    event PropertyListed(uint256 indexed id, address indexed owner, uint256 price);
    event PropertySold(uint256 indexed id, address indexed previousOwner, address indexed newOwner, uint256 price);

    function setUp() public {
        marketplace = new RealEstateMarketplace();
        vm.deal(owner, 10 ether);
        vm.deal(buyer, 10 ether);
        vm.deal(thirdParty, 10 ether);
    }

    // Creating and listing a property in one call
    function testListNewProperty() public {
        vm.startPrank(owner);
        vm.expectEmit(true, true, false, true);
        emit PropertyListed(1, owner, initialPropertyPrice);

        marketplace.listNewProperty(
            propertyLocation,
            propertyName,
            propertyDescription,
            propertyArea,
            propertyTokenURI,
            propertyTag,
            initialPropertyPrice
        );

        (
            uint256 id,
            address propertyOwner,
            uint256 price,
            string memory location,
            string memory nameOut,
            string memory description,
            uint256 area,
            string memory uri,
            RealEstateMarketplace.PropertyTag tag,
            bool isListed
        ) = marketplace.getProperty(1);

        assertEq(id, 1);
        assertEq(propertyOwner, owner);
        assertEq(price, initialPropertyPrice);
        assertEq(location, propertyLocation);
        assertEq(nameOut, propertyName);
        assertEq(description, propertyDescription);
        assertEq(area, propertyArea);
        assertEq(uri, propertyTokenURI);
        assertEq(uint(tag), uint(propertyTag));
        assertFalse(isListed); // false means listed for sale
        vm.stopPrank();
    }



    function testCannotListOthersProperty() public {
        vm.prank(owner);
        marketplace.listNewProperty(
            propertyLocation,
            propertyName,
            propertyDescription,
            propertyArea,
            propertyTokenURI,
            propertyTag,
            initialPropertyPrice
        );

        vm.startPrank(buyer);
        vm.expectRevert("Not owner");
        marketplace.listProperty(1, initialPropertyPrice);
        vm.stopPrank();
    }

    function testBuyProperty() public {
        // setup via listNewProperty
        vm.startPrank(owner);
        marketplace.listNewProperty(
            propertyLocation,
            propertyName,
            propertyDescription,
            propertyArea,
            propertyTokenURI,
            propertyTag,
            initialPropertyPrice
        );
        vm.stopPrank();

        vm.startPrank(buyer);
        vm.expectEmit(true, true, true, true);
        emit PropertySold(1, owner, buyer, initialPropertyPrice);

        marketplace.buyProperty{value: initialPropertyPrice}(1);
        (, address newOwner, uint256 price, , , , , , , bool isListed) = marketplace.getProperty(1);
        assertEq(newOwner, buyer);
        assertEq(price, 0);
        assertTrue(isListed);

        uint256[] memory buyerProps = marketplace.getPropertiesByOwner(buyer);
        assertEq(buyerProps.length, 1);
        assertEq(buyerProps[0], 1);
        vm.stopPrank();
    }

    function testCannotBuyWithWrongETH() public {
        vm.startPrank(owner);
        marketplace.listNewProperty(
            propertyLocation,
            propertyName,
            propertyDescription,
            propertyArea,
            propertyTokenURI,
            propertyTag,
            initialPropertyPrice
        );
        vm.stopPrank();

        vm.startPrank(buyer);
        vm.expectRevert("Incorrect ETH");
        marketplace.buyProperty{value: initialPropertyPrice - 1}(1);
        vm.stopPrank();
    }

    function testCannotBuyOwnProperty() public {
        vm.startPrank(owner);
        marketplace.listNewProperty(
            propertyLocation,
            propertyName,
            propertyDescription,
            propertyArea,
            propertyTokenURI,
            propertyTag,
            initialPropertyPrice
        );
        vm.expectRevert("Self-purchase");
        marketplace.buyProperty{value: initialPropertyPrice}(1);
        vm.stopPrank();
    }

    function testGetListedPropertiesAfterSale() public {
        vm.startPrank(owner);
        marketplace.listNewProperty(propertyLocation, "P1", "D1", 100, propertyTokenURI, propertyTag, initialPropertyPrice);
        marketplace.listNewProperty(propertyLocation, "P2", "D2", 200, propertyTokenURI, propertyTag, initialPropertyPrice);
        vm.stopPrank();

        vm.prank(buyer);
        marketplace.buyProperty{value: initialPropertyPrice}(1);

        uint256[] memory listed = marketplace.getListedProperties();
        assertEq(listed.length, 1);
        assertEq(listed[0], 2);
    }

    function testGetPropertiesByOwnerMultiple() public {
        vm.startPrank(owner);
        marketplace.listNewProperty(propertyLocation, "A", "D", 10, propertyTokenURI, propertyTag, initialPropertyPrice);
        marketplace.listNewProperty(propertyLocation, "B", "D", 20, propertyTokenURI, propertyTag, initialPropertyPrice);
        vm.stopPrank();

        uint256[] memory owned = marketplace.getPropertiesByOwner(owner);
        assertEq(owned.length, 2);
        assertEq(owned[0], 1);
        assertEq(owned[1], 2);
    }

    function testGetPropertyInvalidIdReverts() public {
        vm.expectRevert("Invalid property");
        marketplace.getProperty(42);
    }
}