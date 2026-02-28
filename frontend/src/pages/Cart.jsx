import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import './Cart.css';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const user = useStore((state) => state.user);
  const setCartCount = useStore((state) => state.setCartCount);
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
      const res = await api.get('/carts');
      setCart(res.data);
      updateCartCount(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ items: [], totalAmount: 0 });
    } finally {
      setLoading(false);
    }
  };

  const updateCartCount = (cartData) => {
    const count = cartData?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    setCartCount(count);
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.put('/carts/update', { productId, quantity });
      fetchCart();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour de la quantité');
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/carts/remove/${productId}`);
      toast.success('Produit retiré du panier');
      fetchCart();
    } catch (error) {
      toast.error('Erreur lors de la suppression du produit');
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(10);
      toast.success('Code promo appliqué !');
    } else {
      toast.error('Code promo invalide');
      setDiscount(0);
    }
  };

  if (loading) return <div className="cart-loading">Chargement du panier...</div>;

  const items = cart?.items || [];
  const subtotal = Number(cart?.totalAmount || 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Votre panier est vide</h2>
        <p>Découvrez nos produits et trouvez votre bonheur !</p>
        <Link to="/products" className="btn-continue-shopping">Continuer vos achats</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Votre Panier</h1>
      
      <div className="cart-container">
        <div className="cart-items-section">
          <div className="cart-items-list">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  {item.product?.image ? (
                    <img src={item.product.image} alt={item.product.name} />
                  ) : (
                    <div className="item-placeholder">🛍️</div>
                  )}
                </div>
                
                <div className="item-details">
                  <Link to={`/products/${item.product?.id}`} className="item-name">
                    {item.product?.name}
                  </Link>
                  <p className="item-price">{Number(item.price).toFixed(2)} €</p>
                </div>
                
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.product?.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product?.id, item.quantity + 1)}>+</button>
                </div>
                
                <div className="item-total">
                  {(Number(item.price) * item.quantity).toFixed(2)} €
                </div>
                
                <button className="btn-remove" onClick={() => removeItem(item.product?.id)} title="Retirer">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="cart-summary-section">
          <div className="cart-summary-card">
            <h3>Résumé de la commande</h3>
            
            <div className="summary-row">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            
            <div className="summary-row">
              <span>Frais de livraison</span>
              <span>Gratuit</span>
            </div>
            
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Réduction ({discount}%)</span>
                <span>-{discountAmount.toFixed(2)} €</span>
              </div>
            )}
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            
            <div className="promo-section">
              <input 
                type="text" 
                placeholder="Code promo" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={applyPromoCode}>Appliquer</button>
            </div>
            
            <Link to="/checkout" className="btn-checkout">
              Passer à la caisse
            </Link>
            
            <div className="secure-checkout">
              🔒 Paiement 100% sécurisé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
