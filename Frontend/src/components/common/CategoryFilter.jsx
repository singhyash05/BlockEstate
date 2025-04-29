import { useState } from 'react'
import './CategoryFilter.css'

function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="category-filter">
      <button 
        className={`category-item ${activeCategory === 'all' ? 'active' : ''}`}
        onClick={() => onChange('all')}
      >
        All Properties
      </button>
      
      {categories.map((category) => (
        <button 
          key={category.id}
          className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onChange(category.id)}
        >
          {category.icon && (
            <span className="category-icon">{category.icon}</span>
          )}
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter