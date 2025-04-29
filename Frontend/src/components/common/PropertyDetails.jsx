import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { connectWallet, buyProperty } from '../../utils/web3functions';
import Button from '../common/Button';
import './PropertyDetails.css';

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { property } = useLocation().state || {};
  const [loading, setLoading] = useState(false);

  if (!property) {
    return (
      <div className="property-details">
        <p>No property details available.</p>
        <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const handleBuy = async () => {
    try {
      setLoading(true);
      const { account, web3 } = await connectWallet();
      const priceInWei = web3.utils.toWei(property.price.toString(), 'ether');
      await buyProperty(property.id, priceInWei, account);
      alert('🎉 Property purchased successfully!');
    } catch (error) {
      console.error('Buy failed:', error);
      alert('❌ Failed to buy property.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-details">
      <Button variant="secondary" size="small" onClick={() => navigate(-1)}>&larr; Back to Listings</Button>
      <div className="details-card">
        <img src={property.imageUrl} alt={property.name} className="details-image" />
        <div className="details-info">
          <h1>{property.name}</h1>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Category:</strong> {property.category}</p>
          <p><strong>Area:</strong> {property.area} sq ft</p>
          <p><strong>Price:</strong> {property.price} ETH</p>
          <div className="details-actions">
            <Button variant="primary" size="large" onClick={handleBuy} disabled={loading}>
              {loading ? 'Processing...' : 'Buy Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
