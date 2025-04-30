import { useEffect } from 'react';
import './PropertyCard.css';
import { useNavigate } from 'react-router-dom';

function PropertyCard({ property }) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(property.ownerAddress);
  }
  )
  const handleViewDetails = () => {

    navigate('/property-details', { state: { property } });
  };

  return (
    <div className="property-card">

      {/* ID on top */}
      <div className="property-id"># {property.id}</div>

      <div className="property-image-container">
        <img src={property.imageUrl} alt={property.name} className="property-image" />
        {/* Optional tag or category label */}
        {property.tag && (
          <div className="property-tag">{property.tag}</div>
        )}
      </div>

      <div className="property-details">
        <h3 className="property-name">{property.name}</h3>
        <div className="property-location"><strong>Location:</strong> {property.location}</div>
        <div className="property-owner"><strong>Owner:</strong> {property.ownerAddress}</div>
        <div className="property-meta">
          <div className="meta-item"><strong>Area:</strong> {property.area} sqm</div>
          <div className="meta-item"><strong>Price:</strong> {property.price} ETH</div>
        </div>
      </div>

      <button className="view-button" onClick={handleViewDetails}>View Details</button>
    </div>
  );
}

export default PropertyCard;
