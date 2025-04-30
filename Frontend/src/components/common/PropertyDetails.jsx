import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connectWallet, buyProperty, relistProperty } from '../../utils/web3functions';
import Button from '../common/Button';
import './PropertyDetails.css';

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { property } = useLocation().state || {};
  const [loading, setLoading] = useState(false);
  const [relistPrice, setRelistPrice] = useState('');
  const [connectedAccount, setConnectedAccount] = useState('');

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const { account } = await connectWallet();
        setConnectedAccount(account.toLowerCase());
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    };
    fetchWallet();
  }, []);

  if (!property) {
    return (
      <div className="property-details">
        <p>No property details available.</p>
        <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const isOwner = property.ownerAddress?.toLowerCase() === connectedAccount;

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

  const handleRelist = async () => {
    if (!relistPrice || isNaN(relistPrice)) {
      alert('❌ Invalid price in Wei.');
      return;
    }

    try {
      setLoading(true);
      const { account } = await connectWallet();
      await relistProperty(property.id, relistPrice, account);
      alert(`✅ Property re-listed for ${relistPrice} Wei.`);
    } catch (error) {
      console.error('Re-listing failed:', error);
      alert('❌ Failed to relist property.');
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
          <p><strong>Description:</strong> {property.description} ETH</p>


          <div className="details-actions">
            {!isOwner && (
              <Button variant="primary" size="large" onClick={handleBuy} disabled={loading}>
                {loading ? 'Processing...' : 'Buy Now'}
              </Button>
            )}

            {isOwner && (
              <div className="relist-section">
                <label htmlFor="relistPrice">New Price (Wei):</label>
                <input
                  type="number"
                  id="relistPrice"
                  value={relistPrice}
                  onChange={(e) => setRelistPrice(e.target.value)}
                  placeholder="Enter price"
                />
                <button onClick={handleRelist} disabled={loading || !relistPrice}>
                  {loading ? 'Processing...' : 'Relist Property'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
