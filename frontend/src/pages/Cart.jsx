import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import './Cart.css';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useStore(state => state.user);
  const setCartCount = useStore(state => state.setCartCount);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data);
      const items = res.data?.items || [];
      const count = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
      setCartCount(count);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ items: [], subtotal: 0 });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.put(`/cart/items/${productId}`, { quantity });
      fetchCart();
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/items/${productId}`);
      fetchCart();
      toast.success('Item removed');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (loading) return <div className='loading-spinner'>Loading cart...</div>;

  const cartItems = cart?.items || [];
  const totalAmount = cart?.subtotal || cart?.totalAmount || 0;

  if (cartItems.length === 0) {
    return (
      <div className='empty-cart-page container'>
        <div className='empty-cart-content'>
          <span className='empty-icon'>🛒</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to='/products' className='btn btn-primary'>Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='cart-page container'>
      <h1 className='page-title'>Shopping Cart ({cartItems.length} items)</h1>
      
      <div className='cart-layout'>
        <div className='cart-items-section'>
          <div className='cart-header'>
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>Action</span>
          </div>
          
          <div className='cart-list'>
            {cartItems.map((item) => (
              <div key={item.id || item.productId} className='cart-item'>
                <div className='item-product'>
                    <Link to={`/products/${item.productId}`}>
                        <img 
                            src={item.productImage || 'https://placehold.co/100x100?text=Product'} 
                            alt={item.productName} 
                            className='item-thumb'
                        />
                    </Link>
                    <div className='item-details'>
                        <Link to={`/products/${item.productId}`} className='item-name'>
                            {item.productName}
                        </Link>
                        <span className='item-price'>${Number(item.unitPrice || 0).toFixed(2)}</span>
                        {(item.stockQuantity || 0) > 0 && (item.stockQuantity || 0) < 5 && <span className='stock-warning'>Only {item.stockQuantity} left!</span>}
                    </div>
                </div>
                
                <div className='item-quantity'>
                   <button 
                     onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                     disabled={item.quantity <= 1}
                   >-</button>
                   <span>{item.quantity}</span>
                   <button 
                     onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                     disabled={item.quantity >= (item.stockQuantity || 99)}
                   >+</button>
                </div>
                
                <div className='item-total'>
                    ${Number(item.lineTotal || 0).toFixed(2)}
                </div>
                
                <div className='item-action'>
                    <button onClick={() => removeItem(item.productId)} className='btn-remove' title='Remove'>
                        ×
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='cart-summary-section'>
          <div className='summary-card'>
            <h3>Order Summary</h3>
            <div className='summary-row'>
               <span>Subtotal</span>
               <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className='summary-row'>
               <span>Shipping</span>
               <span>Free</span>
            </div>
            <div className='divider'></div>
            <div className='summary-total'>
               <span>Total</span>
               <span>${totalAmount.toFixed(2)}</span>
            </div>
            
            <button 
               className='btn btn-primary btn-block btn-checkout'
               onClick={() => navigate('/checkout')}
            >
               Proceed to Checkout
            </button>
            
            <Link to='/products' className='continue-shopping'>
               Continue Shopping
            </Link>
          </div>
          
          <div className='secure-msg'>
             🔒 Secure Checkout
          </div>
        </div>
      </div>
    </div>
  );
}
