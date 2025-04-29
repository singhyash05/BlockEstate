import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PropertyCard from '../common/PropertyCard'
import CategoryFilter from '../common/CategoryFilter'
import { properties, categories } from '../../utils/mockData'
import './ExplorePage.css'

function ExplorePage() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const categoryParam = queryParams.get('category')
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all')
  const [filteredProperties, setFilteredProperties] = useState([])
  
  useEffect(() => {
    // Update URL when category changes
    if (activeCategory === 'all') {
      queryParams.delete('category')
    } else {
      queryParams.set('category', activeCategory)
    }

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    )

    // Filter properties based on category
    let filtered = [...properties]

    if (activeCategory !== 'all') {
      filtered = filtered.filter(property => property.category === activeCategory)
    }

    setFilteredProperties(filtered)
  }, [activeCategory])

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
  }

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1 className="explore-title">Explore Properties</h1>
        <p className="explore-description">
          Browse our curated collection of properties from around the world
        </p>
      </div>

      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory}
        onChange={handleCategoryChange}
      />
      
      {filteredProperties.length > 0 ? (
        <div className="properties-grid">
          {filteredProperties.map((property) => (
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
  )
}

export default ExplorePage
