// web3functions.js
import Web3 from 'web3';

export let web3 = null;

export const connectWallet = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    localStorage.setItem('connectedAccount', account);
    return { account, web3 };
  } else {
    throw new Error('MetaMask not found');
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
