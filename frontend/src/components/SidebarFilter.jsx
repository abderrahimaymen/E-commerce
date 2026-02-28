import React from 'react';
import './SidebarFilter.css';

export default function SidebarFilter({ filters, setFilters, categories = [], onClear }) {
  
  const handleCategoryChange = (cat) => {
    // If selecting the same category, deselect it
    const newCat = filters.category === cat ? '' : cat;
    setFilters({ ...filters, category: newCat });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleRatingChange = (rating) => {
    // specific rating filter or min rating
    const newRating = filters.rating === rating ? '' : rating;
    setFilters({ ...filters, rating: newRating });
  };

  return (
    <aside className="sidebar-filter">
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="btn-clear" onClick={onClear}>Clear All</button>
      </div>

      <div className="filter-section">
        <h4>Categories</h4>
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat.id || cat}>
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={filters.category === (cat.id || cat)} 
                  onChange={() => handleCategoryChange(cat.id || cat)}
                />
                <span>{cat.name || cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-inputs">
           <input 
             type="number" 
             name="minPrice" 
             placeholder="Min" 
             value={filters.minPrice} 
             onChange={handlePriceChange}
             min="0"
           />
           <span>-</span>
           <input 
             type="number" 
             name="maxPrice" 
             placeholder="Max" 
             value={filters.maxPrice} 
             onChange={handlePriceChange}
             min="0"
           />
        </div>
      </div>

      <div className="filter-section">
        <h4>Rating</h4>
        <div className="rating-list">
          {[5, 4, 3, 2, 1].map((r) => (
            <div 
              key={r} 
              className={`rating-item ${filters.rating >= r ? 'active' : ''}`}
              onClick={() => handleRatingChange(r)}
            >
              <span className="stars">{'★'.repeat(r)}{'☆'.repeat(5-r)}</span>
              <span>& Up</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
