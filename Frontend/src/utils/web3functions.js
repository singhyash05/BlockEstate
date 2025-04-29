import Web3 from 'web3';

export let web3 = null;

export const connectWallet = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    localStorage.setItem('connectedAccount', account);
    return { account, web3, contract };
  } else {
    throw new Error('MetaMask not found');
  }
};

// 🔼 Re-list an existing property with a new price
export const relistProperty = async (propertyId, priceInEther, account) => {
	try {
	  const { contract } = await connectWallet();
  
	  await contract.methods
		.listProperty(propertyId, priceInEther)
		.send({ from: account });
  
	  console.log(`✅ Property ${propertyId} listed at ${priceInEther} ETH`);
	  return { success: true };
	} catch (err) {
	  console.error('❌ Re-listing failed:', err);
	  throw err;
	}
  };
  
export const getSavedConnection = () => {
  const account = localStorage.getItem('connectedAccount');
  if (account && window.ethereum) {
    web3 = new Web3(window.ethereum);
    return { account, web3 };
  }
  return null;
};

export const disconnectWallet = () => {
  localStorage.removeItem('connectedAccount');
  web3 = null;
};

// 🔼 Upload and list a new property (with full details)
export const createAndListProperty = async (formData, account, contract) => {
  const { location, name, description, area, tokenURI, tagIndex, price } = formData;

  try {
    await contract.methods
      .listNewProperty(location, name, description, area, tokenURI, tagIndex, price)
      .send({ from: account });

    const count = await contract.methods.getPropertyCount().call();
    return { success: true, propertyId: count };
  } catch (err) {
    console.error('Listing failed:', err);
    throw err;
  }
};

// 🔼 Fetch all listed properties
export const fetchListedProperties = async () => {
  try {
    const { contract } = await connectWallet();
    const ids = await contract.methods.getListedProperties().call();

    const properties = await Promise.all(
      ids.map(async (id) => {
        const p = await contract.methods.getProperty(id).call();
        return {
          id: id.toString(),
          location: p.location,
          name: p.name,
          description: p.description,
          price: Web3.utils.fromWei(p.price.toString(), 'ether'),
          imageUrl: p.tokenURI,
          area: Number(p.area),
          category: p.tag.toString(),
        };
      })
    );

    return properties;
  } catch (err) {
    console.error('Error fetching properties:', err);
    throw err;
  }
};

// 🔼 Buy a property
export const buyProperty = async (id, priceInWei, account) => {
  try {
    const { contract } = await connectWallet();
    await contract.methods.buyProperty(id).send({
      from: account,
      value: priceInWei,
    });
    alert('🎉 Property bought!');
  } catch (err) {
    console.error('Buy failed:', err);
    throw err;
  }
};
export const fetchMyProperties = async (ownerAddress) => {
	try {
	  const { contract } = await connectWallet();
	  const ids = await contract.methods.getPropertiesByOwner(ownerAddress).call();
  
	  const properties = await Promise.all(
		ids.map(async (id) => {
		  const p = await contract.methods.getProperty(id).call();
		  return {
			id: id.toString(),
			location: p.location,
			name: p.name,
			description: p.description,
			price: Web3.utils.fromWei(p.price.toString(), 'ether'),
			imageUrl: p.tokenURI,
			area: Number(p.area),
			category: p.tag.toString(),
		  };
		})
	  );
  
	  return properties;
	} catch (err) {
	  console.error('❌ Error fetching properties by owner:', err);
	  throw err;
	}
  };
  


const CONTRACT_ADDRESS = '0x86D0DA5104Bc32F6e97f721B542f3Ef5d7C6a571';

const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			}
		],
		"name": "buyProperty",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_area",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_tokenURI",
				"type": "string"
			},
			{
				"internalType": "enum RealEstateMarketplace.PropertyTag",
				"name": "_tag",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "listNewProperty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "listProperty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ReentrancyGuardReentrantCall",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "PropertyListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "PropertySold",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getListedProperties",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getPropertiesByOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			}
		],
		"name": "getProperty",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "area",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			},
			{
				"internalType": "enum RealEstateMarketplace.PropertyTag",
				"name": "tag",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "isListed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPropertyCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ownerToProperties",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "properties",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "area",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			},
			{
				"internalType": "enum RealEstateMarketplace.PropertyTag",
				"name": "tag",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "isListed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "propertyCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];