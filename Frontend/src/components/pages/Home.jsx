import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from '../common/PropertyCard'
import Button from '../common/Button'
import { properties } from '../../utils/mockData'
import './Home.css'

function Home() {
  const [featuredProperties, setFeaturedProperties] = useState([])
  
  useEffect(() => {
    setFeaturedProperties(properties.slice(0, 4))
  }, [])
  
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Revolutionizing Real Estate with Blockchain</h1>
          <p className="hero-description">
            Buy, sell, and invest in properties with full transparency and security.
            No intermediaries, lower fees, and instant transactions.
          </p>
          <div className="hero-buttons">
            <Link to="/explore">
              <Button variant="primary" size="large">Explore Properties</Button>
            </Link>
            <Link to="/listing">
              <Button variant="outline" size="large">List Your Property</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Properties</h2>
          <Link to="/explore" className="view-all-link">View All</Link>
        </div>
        <div className="properties-grid">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
      
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3 className="step-title">Connect Your Wallet</h3>
            <p className="step-description">
              Link your crypto wallet to browse, buy, or list properties on our platform.
            </p>
          </div>
          
          <div className="step-item">
            <div className="step-number">2</div>
            <h3 className="step-title">Browse Properties</h3>
            <p className="step-description">
              Explore our curated collection of real estate from around the world.
            </p>
          </div>
          
          <div className="step-item">
            <div className="step-number">3</div>
            <h3 className="step-title">Purchase with Crypto</h3>
            <p className="step-description">
              Buy properties directly with cryptocurrency through secure smart contracts.
            </p>
          </div>
          
          <div className="step-item">
            <div className="step-number">4</div>
            <h3 className="step-title">Manage Your Portfolio</h3>
            <p className="step-description">
              Track your real estate investments and manage your properties in one place.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home