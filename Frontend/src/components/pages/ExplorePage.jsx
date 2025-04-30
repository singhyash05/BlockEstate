import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../common/PropertyCard';
import CategoryFilter from '../common/CategoryFilter';
import { fetchListedProperties } from '../../utils/web3functions';
import './ExplorePage.css';

const PROPERTY_TAGS = [
  { id: 'all', name: 'All' },
  { id: '0', name: 'Beachside' },
  { id: '1', name: 'Luxury' },
  { id: '2', name: 'Rooftop' },
  { id: '3', name: 'Apartment' },
];

function ExplorePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const props = await fetchListedProperties();
        const normalized = props.map(p => ({
          ...p,
          area: typeof p.area === 'bigint' ? Number(p.area) : p.area,
          category: typeof p.category === 'number' ? p.category.toString() : p.category,
        }));
        console.log(normalized);
        setAllProperties(normalized);
      } catch (err) {
        console.error('Error fetching listed properties:', err);
      }
    };
    loadProperties();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      queryParams.delete('category');
    } else {
      queryParams.set('category', activeCategory);
    }
    window.history.replaceState({}, '', `${window.location.pathname}${queryParams.toString() ? '?' + queryParams.toString() : ''}`);
    let filtered = [...allProperties];
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    setFilteredProperties(filtered);
  }, [activeCategory, allProperties]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1 className="explore-title">Explore Properties</h1>
        <p className="explore-description">Browse our curated collection of properties from around the world</p>
      </div>
      <CategoryFilter categories={PROPERTY_TAGS} activeCategory={activeCategory} onChange={handleCategoryChange} />
      {filteredProperties.length > 0 ? (
        <div className="properties-grid">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No properties found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}

export default ExplorePage;
