import './PropertyCard.css';
import { useNavigate } from 'react-router-dom';

function PropertyCard({ property }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/property-details', { state: { property } });
  };

  return (
    <div className="property-card">
      <div className="property-image-container">
        <img src={property.imageUrl} alt={property.name} className="property-image" />
        {property.category && (
          <div className="property-category">{property.category}</div>
        )}
      </div>

      <div className="property-details">
        <h3 className="property-name">{property.name}</h3>
        <div className="property-location"><span>{property.location}</span></div>
        <div className="property-meta">
          <div className="meta-item"><span>ID: {property.id}</span></div>
          <div className="meta-item"><span>{property.area} sqm</span></div>
        </div>
        <div className="property-price">{property.price} ETH</div>
      </div>

      <button className="view-button" onClick={handleViewDetails}>View Details</button>
    </div>
  );
}

export default PropertyCard;
