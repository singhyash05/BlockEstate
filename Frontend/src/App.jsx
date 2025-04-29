import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './components/pages/Home'
import ExplorePage from './components/pages/ExplorePage'
import YourListings from './components/pages/YourListings'
import Portfolio from './components/pages/Portfolio'
import './App.css'

function App() {
  const [isConnected, setIsConnected] = useState(false)
  
  // Mock function to simulate wallet connection
  const connectWallet = () => {
    setIsConnected(true)
  }

  return (
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/listings" element={<YourListings />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </main>
        <Footer />
      </div>
  )
}

export default App