import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './components/pages/Home'
import ExplorePage from './components/pages/ExplorePage'
import Portfolio from './components/pages/Portfolio'
import ListPageForm from './components/pages/ListPageForm'
import PropertyDetails from './components/common/PropertyDetails'


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
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/listing" element={<ListPageForm />} />
            <Route path="/property-details" element={<PropertyDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
  )
}

export default App