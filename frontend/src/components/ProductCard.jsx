import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import apiClient from '../services/api';
import toast from 'react-hot-toast';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setCartCount = useStore((state) => state.setCartCount);

  const price = Number(product.price) || 0;
  const discount = product.discount || 0;
  const finalPrice = price * (1 - discount / 100);
  const stock = product.stockQuantity ?? product.stock ?? 0;

  const addToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please log in first');
      navigate('/login');
      return;
    }
    try {
      await apiClient.post('/cart/items', { productId: product.id, quantity: 1 });
      const cartRes = await apiClient.get('/cart');
      const cartItems = cartRes.data?.items || [];
      setCartCount(cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0));
      toast.success('Added to cart!');
    } catch {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="pc">
      {/* Image */}
      <div className="pc__img-wrap">
        <img 
          src={product.image || `https://placehold.co/400x400/f3f4f6/94a3b8?text=${encodeURIComponent(product.name?.charAt(0) || 'P')}`}
          alt={product.name} 
          className="pc__img"
          loading="lazy"
          onError={(e) => { e.target.src = `https://placehold.co/400x400/f3f4f6/94a3b8?text=No+Image`; }}
        />
        {discount > 0 && <span className="pc__badge pc__badge--sale">-{discount}%</span>}
        {stock > 0 && stock <= 5 && <span className="pc__badge pc__badge--low">Low Stock</span>}
        {stock === 0 && (
          <div className="pc__sold-out">
            <span>Sold Out</span>
          </div>
        )}
        
        {/* Hover actions */}
        <div className="pc__actions">
          <button 
            className="pc__action-btn"
            onClick={addToCart}
            disabled={stock === 0}
            title="Add to Cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="pc__body">
        <span className="pc__category">{product.category}</span>
        <h3 className="pc__name">{product.name}</h3>
        
        <div className="pc__rating">
          <div className="pc__stars">
            {[1, 2, 3, 4, 5].map(s => (
              <svg key={s} width="14" height="14" viewBox="0 0 24 24" 
                fill={s <= Math.round(product.rating || 0) ? 'var(--accent)' : 'none'}
                stroke={s <= Math.round(product.rating || 0) ? 'var(--accent)' : '#d1d5db'} 
                strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <span className="pc__review-count">{product.reviews_count || 0}</span>
        </div>
        
        <div className="pc__price-row">
          <div className="pc__prices">
            <span className="pc__price">${finalPrice.toFixed(2)}</span>
            {discount > 0 && <span className="pc__price-old">${price.toFixed(2)}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
