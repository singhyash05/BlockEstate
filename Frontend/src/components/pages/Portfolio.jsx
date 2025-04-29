import { useState, useEffect } from 'react'
import PropertyCard from '../common/PropertyCard'
import Button from '../common/Button'
import { userPortfolio } from '../../utils/mockData'
import './Portfolio.css'

function Portfolio() {
  const [portfolio, setPortfolio] = useState([])
  
  // useEffect(() => {
  //   // In a real app, we would fetch the user's portfolio from the blockchain
  //   if (isConnected) {
  //     setPortfolio(userPortfolio)
  //   }
  // }, [isConnected])
  
  // if (!isConnected) {
    return (
      <div className="connect-wallet-prompt">
        <h2>Connect Your Wallet</h2>
        <p>Please connect your wallet to view your real estate portfolio</p>
        <Button variant="primary" size="large">Connect Wallet</Button>
      </div>
    )
  // }
  
  const totalValue = portfolio.reduce((sum, property) => sum + property.currentValue, 0).toFixed(2)
  const totalInvested = portfolio.reduce((sum, property) => sum + property.purchasePrice, 0).toFixed(2)
  const totalAppreciation = ((totalValue - totalInvested) / totalInvested * 100).toFixed(2)
  
  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1 className="portfolio-title">Your Portfolio</h1>
        <div className="wallet-info">
          <span className="wallet-address">
            {wallet?.address.slice(0, 6) + '...' + wallet?.address.slice(-4)}
          </span>
          <span className="wallet-balance">
            {wallet?.balance.toFixed(2)} ETH
          </span>
        </div>
      </div>
      
      <div className="portfolio-stats">
        <div className="stat-card">
          <h3 className="stat-title">Properties Owned</h3>
          <p className="stat-value">{portfolio.length}</p>
        </div>
        
        <div className="stat-card">
          <h3 className="stat-title">Total Value</h3>
          <p className="stat-value">
            {totalValue} ETH
          </p>
        </div>
        
        <div className="stat-card">
          <h3 className="stat-title">Total Invested</h3>
          <p className="stat-value">
            {totalInvested} ETH
          </p>
        </div>
        
        <div className="stat-card">
          <h3 className="stat-title">Total Appreciation</h3>
          <p className={`stat-value ${parseFloat(totalAppreciation) >= 0 ? 'positive' : 'negative'}`}>
            {totalAppreciation}%
          </p>
        </div>
      </div>
      
      {portfolio.length > 0 ? (
        <div className="portfolio-grid">
          {portfolio.map((property) => (
            <div className="portfolio-card" key={property.id}>
              <PropertyCard property={property} />
              <div className="property-performance">
                <div className="performance-item">
                  <span className="performance-label">Purchase Price:</span>
                  <span className="performance-value">{property.purchasePrice} ETH</span>
                </div>
                <div className="performance-item">
                  <span className="performance-label">Current Value:</span>
                  <span className="performance-value">{property.currentValue} ETH</span>
                </div>
                <div className="performance-item">
                  <span className="performance-label">Appreciation:</span>
                  <span className={`performance-value ${property.appreciation.startsWith('+') ? 'positive' : 'negative'}`}>
                    {property.appreciation}
                  </span>
                </div>
                <div className="performance-item">
                  <span className="performance-label">Purchase Date:</span>
                  <span className="performance-value">{property.purchaseDate}</span>
                </div>
              </div>
              <div className="portfolio-actions">
                <button className="action-button list">List for Sale</button>
                <button className="action-button manage">Manage Property</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-properties">
          <h3>No Properties Owned</h3>
          <p>You haven't purchased any properties yet.</p>
          <Button variant="primary" size="large" onClick={() => window.location.href = '/explore'}>Explore Properties</Button>
        </div>
      )}
    </div>
  )
}

export default Portfolio