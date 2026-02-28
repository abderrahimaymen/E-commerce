import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';

const categories = [
  { id: 1, name: 'Electronics', icon: '💻', link: '/products?category=Electronics', color: '#e3f2fd', text: '#0d47a1' },
  { id: 2, name: 'Fashion', icon: '👗', link: '/products?category=Fashion', color: '#fce4ec', text: '#880e4f' },
  { id: 3, name: 'Home', icon: '🏠', link: '/products?category=Home', color: '#e8f5e9', text: '#1b5e20' },
  { id: 4, name: 'Beauty', icon: '💄', link: '/products?category=Beauty', color: '#fff3e0', text: '#e65100' },
  { id: 5, name: 'Sports', icon: '⚽', link: '/products?category=Sports', color: '#f3e5f5', text: '#4a148c' },
  { id: 6, name: 'Books', icon: '📚', link: '/products?category=Books', color: '#fffde7', text: '#f57f17' },
];

export default function CategoryGrid() {
  return (
    <section className="category-section">
      <div className="container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link to={cat.link} key={cat.id} className="category-card">
              <div className="category-icon" style={{ backgroundColor: cat.color, color: cat.text }}>
                {cat.icon}
              </div>
              <span className="category-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
