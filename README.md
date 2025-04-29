# 🏡 BlockEstate

**BlockEstate** is a decentralized real estate marketplace built on Ethereum. It allows users to mint, list, and buy tokenized properties securely while storing listing data off-chain using IPFS via Pinata.

---

## 📁 Folder Structure

```
Frontend/
├── src/
│   ├── components/
│   │   └── common/         # Shared UI components (Card, Button, Navbar, etc.)
        ├── pages/              # Explore, Property Listing, Portfolio, Details
        └── utils/              # web3functions.js, mockData.js

smart-contracts/
├── src/                    # Solidity smart contracts
└── test/                   # Foundry test files
```

> ⚠️ Uses standard Vite + React structure for the frontend

---

## 🔧 How to Run

### 1. Setup `.env`

Create a `.env` file based on `.env.sample` and fill in:

```
VITE_PINATA_JWT=your_pinata_jwt_token
VITE_GATEWAY_URL=https://your_gateway.mypinata.cloud/
VITE_SERVER_URL=your_backend_server_if_using_presigned_uploads
```

### 2. Install and Run Frontend

```bash
cd Frontend
npm install
npm run dev
```

App runs at: [http://localhost:5173](http://localhost:5173)

---

## ✅ Features

- 🧪 **Tested with Foundry** – Reliable and fast contract testing
- 📦 **Pinata IPFS Integration** – Off-chain image and metadata storage using JWT
- 📜 **Fully On-Chain Logic** – Name, location, price, category stored on-chain
- 🛡️ **Reentrancy Guards** – Secures buy/list functions
- 🔗 **Decentralized Flow** – All user interactions are permissionless and wallet-based

---