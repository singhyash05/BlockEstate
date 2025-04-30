import { useState, useEffect } from 'react';
import PropertyCard from '../common/PropertyCard';
import Button from '../common/Button';
import { connectWallet, fetchMyProperties } from '../../utils/web3functions';
import './Portfolio.css';

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [account, setAccount] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const connectAndFetch = async () => {
      try {
        const { account, web3 } = await connectWallet();
        setAccount(account);

        const properties = await fetchMyProperties(account);
        setPortfolio(properties);
        console.log('Portfolio:', properties);
        const balance = await web3.eth.getBalance(account);
        setWalletBalance(Number(web3.utils.fromWei(balance, 'ether')));
      } catch (error) {
        console.error('Error loading portfolio:', error);
      }
    };

    connectAndFetch();
  }, []);

  if (!account) {
    return (
      <div className="connect-wallet-prompt">
        <h2>Connect Your Wallet</h2>
        <p>Please connect your wallet to view your real estate portfolio</p>
        <Button variant="primary" size="large" onClick={() => window.location.reload()}>
          Connect Wallet
        </Button>
      </div>
    );
  }

  const totalValue = portfolio
    .reduce((sum, p) => sum + parseFloat(p.price), 0)
    .toFixed(4);

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1 className="portfolio-title">Your Portfolio</h1>
        <div className="wallet-info">
          <span className="wallet-address">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <span className="wallet-balance">{walletBalance.toFixed(4)} ETH</span>
        </div>
      </div>

      <div className="portfolio-stats">
        <div className="stat-card">
          <h3 className="stat-title">Properties Owned</h3>
          <p className="stat-value">{portfolio.length}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Total Value</h3>
          <p className="stat-value">{totalValue} ETH</p>
        </div>
      </div>

      {portfolio.length > 0 ? (
        <div className="portfolio-grid">
          {portfolio.map((property) => (
            <div className="portfolio-card" key={property.id}>
              <PropertyCard property={property} />
              <div className="property-performance">
                <div className="performance-item">
                  <span className="performance-label">Current Value:</span>
                  <span className="performance-value">{property.price} ETH</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-properties">
          <h3>No Properties Owned</h3>
          <p>You haven't purchased any properties yet.</p>
          <Button variant="primary" size="large" onClick={() => window.location.href = '/'}>
            Explore Properties
          </Button>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
