import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">BlockEstate</h3>
          <p className="footer-description">
            Decentralized real estate marketplace built on blockchain technology.
            Buy, sell, and invest in properties with full transparency and security.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Connect</h4>
          <nav className="footer-nav">
            <a href="#" className="footer-link">Discord</a>
            <a href="#" className="footer-link">Twitter</a>
            <a href="#" className="footer-link">Telegram</a>
            <a href="#" className="footer-link">Medium</a>
          </nav>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Resources</h4>
          <nav className="footer-nav">
            <a href="#" className="footer-link">Documentation</a>
            <a href="#" className="footer-link">FAQs</a>
            <a href="#" className="footer-link">Support</a>
          </nav>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">
          &copy; {currentYear} BlockEstate. All rights reserved.
        </p>
        <div className="footer-legal">
          <a href="#" className="legal-link">Terms of Service</a>
          <a href="#" className="legal-link">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer