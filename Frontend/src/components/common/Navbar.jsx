import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connectWallet, getSavedConnection, disconnectWallet } from '/src/utils/web3functions.js';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [account, setAccount] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const saved = getSavedConnection();
    if (saved) setAccount(saved.account);
  }, []);

  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleConnect = async () => {
    try {
      const { account } = await connectWallet();
      setAccount(account);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setAccount(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Block <span className="logo-space"></span>Estate</span>
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`toggle-bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`toggle-bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`toggle-bar ${isMenuOpen ? 'open' : ''}`}></span>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item"><Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link></li>
          <li className="navbar-item"><Link to="/explore" className={`navbar-link ${location.pathname === '/explore' ? 'active' : ''}`}>Explore</Link></li>
          <li className="navbar-item"><Link to="/portfolio" className={`navbar-link ${location.pathname === '/portfolio' ? 'active' : ''}`}>Portfolio</Link></li>
          <li className="navbar-item">
            {account ? (
              <button className="wallet-button connected" onClick={handleDisconnect}>
                {account.slice(0, 6)}...{account.slice(-4)}
              </button>
            ) : (
              <button className="wallet-button" onClick={handleConnect}>
                Connect Wallet
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
