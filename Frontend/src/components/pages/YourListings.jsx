import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from '../common/PropertyCard'
import Button from '../common/Button'
import { userListings } from '../../utils/mockData'
import './YourListings.css'

function YourListings() {
  const [listings, setListings] = useState([])
  
  // useEffect(() => {
  //   // In a real app, we would fetch the user's listings from the blockchain
  //   if (isConnected) {
  //     setListings(userListings)
  //   }
  // }, [isConnected])
  
  // if (!isConnected) {
    return (
      <div className="connect-wallet-prompt">
        <h2>Connect Your Wallet</h2>
        <p>Please connect your wallet to view your property listings</p>
        <Button variant="primary" size="large">Connect Wallet</Button>
      </div>
    )
  // }
  
  // return (
  //   <div className="listings-page">
  //     <div className="listings-header">
  //       <h1 className="listings-title">Your Listings</h1>
  //       <Button variant="secondary">List New Property</Button>
  //     </div>
      
  //     <div className="listings-stats">
  //       <div className="stat-card">
  //         <h3 className="stat-title">Total Listings</h3>
  //         <p className="stat-value">{listings.length}</p>
  //       </div>
        
  //       <div className="stat-card">
  //         <h3 className="stat-title">Total Value</h3>
  //         <p className="stat-value">
  //           {listings.reduce((sum, property) => sum + property.price, 0).toFixed(2)} ETH
  //         </p>
  //       </div>
        
  //       <div className="stat-card">
  //         <h3 className="stat-title">Total Views</h3>
  //         <p className="stat-value">
  //           {listings.reduce((sum, property) => sum + property.views, 0)}
  //         </p>
  //       </div>
        
  //       <div className="stat-card">
  //         <h3 className="stat-title">Active Offers</h3>
  //         <p className="stat-value">
  //           {listings.reduce((sum, property) => sum + property.offers, 0)}
  //         </p>
  //       </div>
  //     </div>
      
  //     {listings.length > 0 ? (
  //       <div className="listings-grid">
  //         {listings.map((property) => (
  //           <div className="listing-card" key={property.id}>
  //             <PropertyCard property={property} />
  //             <div className="listing-actions">
  //               <button className="action-button edit">Edit Listing</button>
  //               <button className="action-button cancel">Cancel Listing</button>
  //             </div>
  //             <div className="listing-meta">
  //               <div className="meta-item">
  //                 <span className="meta-label">Listed on:</span>
  //                 <span className="meta-value">{property.listedDate}</span>
  //               </div>
  //               <div className="meta-item">
  //                 <span className="meta-label">Views:</span>
  //                 <span className="meta-value">{property.views}</span>
  //               </div>
  //               <div className="meta-item">
  //                 <span className="meta-label">Offers:</span>
  //                 <span className="meta-value">{property.offers}</span>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ) : (
  //       <div className="no-listings">
  //         <h3>No Properties Listed</h3>
  //         <p>You haven't listed any properties for sale yet.</p>
  //         <Button variant="primary" size="large">List Your First Property</Button>
  //       </div>
  //     )}
  //   </div>
  // )
}

export default YourListings