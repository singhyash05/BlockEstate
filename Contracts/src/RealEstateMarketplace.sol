    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.28;

    import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

    /**
    * @title RealEstateMarketplace
    * @dev A marketplace for listing, buying, and selling real estate properties as NFTs.
    */
    contract RealEstateMarketplace is ReentrancyGuard {
        /// @notice Tags to categorize properties
        enum PropertyTag {
            Beachside,
            Luxury,
            Rooftop,
            Apartment
        }

        /// @notice Represents a real estate property
        struct Property {
            uint256 id;
            address owner;
            uint256 price;
            string location;
            string name;
            string description;
            uint256 area;
            string tokenURI;
            PropertyTag tag;
            bool isListed;
        }

        uint256 public propertyCount = 0;
        mapping(uint256 => Property) public properties;
        mapping(address => uint256[]) public ownerToProperties;

        /// @notice Emitted when a property is listed for sale
        event PropertyListed(
            uint256 indexed id,
            address indexed owner,
            uint256 price
        );

        /// @notice Emitted when a property is sold
        event PropertySold(
            uint256 indexed id,
            address indexed previousOwner,
            address indexed newOwner,
            uint256 price
        );

        /**
        * @dev Removes an element from an array in storage.
        * @param array The array to remove the element from.
        * @param element The element to remove.
        */
        function removeFromArray(uint256[] storage array, uint256 element) private {
            for (uint256 i = 0; i < array.length; i++) {
                if (array[i] == element) {
                    array[i] = array[array.length - 1];
                    array.pop();
                    break;
                }
            }
        }

        /// @notice Creates a new property (not listed for sale)
        /// @param _location The property's location
        /// @param _name The property's name
        /// @param _area The property's area
        /// @param _tokenURI Metadata URI for the property
        /// @param _tag Property tag/category
        function newProperty(
            string memory _location,
            string memory _name,
            string memory _description,
            uint256 _area,
            string memory _tokenURI,
            PropertyTag _tag
        ) internal {
            propertyCount++;
            properties[propertyCount] = Property({
                id: propertyCount,
                owner: msg.sender,
                price: 0,
                location: _location,
                description: _description,
                name: _name,
                area: _area,
                tokenURI: _tokenURI,
                tag: _tag,
                isListed: true
            });
            ownerToProperties[msg.sender].push(propertyCount);
        }

        /// @notice Lists an owned property for sale
        /// @param _propertyId The property to list
        /// @param _price The listing price in wei
        function listProperty(uint256 _propertyId, uint256 _price) public {
            require(_price > 0, "Price must be greater than 0");

            Property storage property = properties[_propertyId];
            require(property.owner == msg.sender, "Not owner");
            require(property.id == _propertyId, "Invalid property");
            require(property.isListed, "Already listed");
            property.price = _price;
            property.isListed = false;
            emit PropertyListed(_propertyId, msg.sender, _price);
        }

        /// @notice Creates and lists a new property in a single transaction
        /// @param _location The property's location
        /// @param _name The property's name
        /// @param _area The property's area
        /// @param _tokenURI Metadata URI for the property
        /// @param _tag Property tag/category
        /// @param _price The listing price in wei
        function listNewProperty(
            string memory _location,
            string memory _name,
            string memory _description,
            uint256 _area,
            string memory _tokenURI,
            PropertyTag _tag,
            uint256 _price
        ) external {
            newProperty(
                _location,
                _name,
                _description,
                _area,
                _tokenURI,
                _tag
            );
            listProperty(propertyCount, _price);
        }

        /// @notice Buy a listed property
        /// @param _propertyId The property to buy
        function buyProperty(uint256 _propertyId) external payable nonReentrant {
            Property storage property = properties[_propertyId];

            require(property.id == _propertyId, "Invalid property");
            require(!property.isListed, "Already sold");
            require(msg.value == property.price, "Incorrect ETH");
            require(property.owner != msg.sender, "Self-purchase");

            address previousOwner = property.owner;

            property.owner = msg.sender;
            property.isListed = true;
            property.price = 0;

            removeFromArray(ownerToProperties[previousOwner], _propertyId);
            ownerToProperties[msg.sender].push(_propertyId);

            (bool success, ) = payable(previousOwner).call{value: msg.value}("");
            require(success, "Transfer failed");

            emit PropertySold(_propertyId, previousOwner, msg.sender, msg.value);
        }

        /// @notice Returns the total number of properties created
        /// @return The property count
        function getPropertyCount() external view returns (uint256) {
            return propertyCount;
        }

        /// @notice Returns details of a property
        /// @param _propertyId The property ID
        /// @return id Property ID
        /// @return owner Property owner
        /// @return price Property price
        /// @return location Property location
        /// @return name Property name
        /// @return description Property description
        /// @return area Property area
        /// @return tokenURI Property metadata URI
        /// @return tag Property tag
        /// @return isListed Whether the property is listed
        function getProperty(uint256 _propertyId)
            external
            view
            returns (
                uint256 id,
                address owner,
                uint256 price,
                string memory location,
                string memory name,
                string memory description,
                uint256 area,
                string memory tokenURI,
                PropertyTag tag,
                bool isListed
            )
        {
            require(_propertyId <= propertyCount, "Invalid property");
            Property memory property = properties[_propertyId];
            return (
                property.id,
                property.owner,
                property.price,
                property.location,
                property.name,
                property.description,
                property.area,
                property.tokenURI,
                property.tag,
                property.isListed
            );
        }

        /// @notice Returns all property IDs owned by a user
        /// @param user The owner's address
        /// @return Array of property IDs
        function getPropertiesByOwner(address user)
            external
            view
            returns (uint256[] memory)
        {
            return ownerToProperties[user];
        }

        /// @notice Returns all currently listed property IDs
        /// @return Array of listed property IDs
        function getListedProperties() external view returns (uint256[] memory) {
            uint256 count = 0;

            // First pass: count how many are listed
            for (uint256 i = 1; i <= propertyCount; i++) {
                if (!properties[i].isListed) {
                    count++;
                }
            }

            // Second pass: collect listed property IDs
            uint256[] memory listed = new uint256[](count);
            uint256 index = 0;
            for (uint256 i = 1; i <= propertyCount; i++) {
                if (!properties[i].isListed) {
                    listed[index] = i;
                    index++;
                }
            }

            return listed;
        }
    }
