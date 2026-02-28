import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import apiClient from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './ProductInfo.css';

export default function ProductInfo({ product }) {
  const [qty, setQty] = useState(1);
  const user = useStore(state => state.user);
  const setCartCount = useStore(state => state.setCartCount);
  const setWishlistCount = useStore(state => state.setWishlistCount);
  const wishlistCount = useStore(state => state.wishlistCount);
  const [inWishlist, setInWishlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && product) {
      apiClient.get(`/wishlist/check/${product.id}`)
        .then(res => setInWishlist(res.data.inWishlist))
        .catch(() => {});
    }
  }, [user, product]);

  // Price calculations
  const price = Number(product.price) || 0;
  const finalPrice = price * (1 - (product.discount || 0) / 100);

  const handleAddToCart = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      await apiClient.post('/cart/items', { productId: product.id, quantity: qty });
      const cartRes = await apiClient.get('/cart');
      const items = cartRes.data?.items || [];
      setCartCount(items.reduce((sum, i) => sum + (i.quantity || 1), 0));
      toast.success('Added to cart!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not add to cart';
      toast.error(msg);
    }
  };

  const handleWishlist = async () => {
    if (!user) { navigate('/login'); return; }
    try {
        if (inWishlist) {
            await apiClient.delete(`/wishlist/${product.id}`);
            setWishlistCount(wishlistCount - 1);
            setInWishlist(false);
            toast.success('Removed from wishlist');
        } else {
            await apiClient.post(`/wishlist/${product.id}`);
            setWishlistCount(wishlistCount + 1);
            setInWishlist(true);
            toast.success('Added to wishlist');
        }
    } catch {
        toast.error('Wishlist error');
    }
  };

  return (
    <div className="product-info-container">
      <h1 className="product-title-large">{product.name}</h1>
      <div className="product-meta">
        <div className="rating-badge">
          <span>★</span> {product.rating || 0} ({product.reviews_count || 0} reviews)
        </div>
        <span className="stock-status">
          {(product.stockQuantity || product.stock || 0) > 0 ? (
            <span className="text-success">In Stock</span>
          ) : (
            <span className="text-danger">Out of Stock</span>
          )}
        </span>
        <span className="product-sku">SKU: {product.sku || 'N/A'}</span>
      </div>

      <div className="price-section">
        {product.discount > 0 && <span className="price-old">${price.toFixed(2)}</span>}
        <span className="price-final">${finalPrice.toFixed(2)}</span>
        {product.discount > 0 && <span className="badge-discount">{product.discount}% OFF</span>}
      </div>

      <p className="product-short-desc">{product.description}</p>

      {/* Options if any (Color, Size) - mockup for now */}
      <div className="quantity-selector">
        <span>Quantity:</span>
        <div className="qty-controls">
          <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>-</button>
          <input type="number" value={Number.isFinite(qty) ? qty : 1} readOnly />
          <button onClick={() => setQty(Math.min((product.stockQuantity || product.stock || 99), qty + 1))} disabled={qty >= (product.stockQuantity || product.stock || 0)}>+</button>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="btn btn-primary btn-lg btn-add-cart"
          onClick={handleAddToCart}
          disabled={(product.stockQuantity || product.stock || 0) === 0}
        >
          {(product.stockQuantity || product.stock || 0) === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button 
          className={`btn btn-secondary btn-icon ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlist}
          title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          💙
        </button>
      </div>

      <div className="product-extra-info">
        <div className="info-item">
          <span>🚚</span> Free delivery on orders over $50
        </div>
        <div className="info-item">
          <span>🛡️</span> 1 Year Warranty
        </div>
      </div>
    </div>
  );
}
