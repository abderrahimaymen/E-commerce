import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import './Checkout.css';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const user = useStore((state) => state.user);
  const setCartCount = useStore((state) => state.setCartCount);
  const navigate = useNavigate();

  // Form states
  const [shipping, setShipping] = useState({
    fullName: user?.firstName ? `${user.firstName} ${user.lastName || ''}` : '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('CARD'); // CARD or PAYPAL

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
      if (!res.data || !res.data.items || res.data.items.length === 0) {
        toast.error('Votre panier est vide');
        navigate('/cart');
        return;
      }
      setCart(res.data);
    } catch (error) {
      toast.error('Erreur lors du chargement du panier');
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!shipping.address || !shipping.city || !shipping.postalCode) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const placeOrder = async () => {
    setSubmitting(true);
    try {
      // 1. Create order
      const orderRes = await api.post('/orders', {
        shippingAddress: `${shipping.address}, ${shipping.postalCode} ${shipping.city}, ${shipping.country}`
      });
      
      const orderId = orderRes.data.id;
      
      // 2. Process payment (Strategy Pattern in backend)
      await api.post('/payments/process', {
        orderId,
        method: paymentMethod,
        amount: cart.totalAmount
      });
      
      // 3. Clear cart
      await api.post('/cart/clear');
      setCartCount(0);
      
      toast.success('Commande validée avec succès !');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la validation de la commande');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="checkout-loading">Chargement...</div>;

  const subtotal = Number(cart?.totalAmount || 0);
  const shippingCost = 0; // Free shipping
  const total = subtotal + shippingCost;

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Validation de la commande</h1>
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Livraison</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>Paiement</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Confirmation</span>
          </div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-main">
          {/* STEP 1: SHIPPING */}
          {step === 1 && (
            <div className="checkout-card fade-in">
              <h2>Adresse de livraison</h2>
              <form onSubmit={handleShippingSubmit}>
                <div className="form-group">
                  <label>Nom complet</label>
                  <input 
                    type="text" 
                    value={shipping.fullName} 
                    onChange={(e) => setShipping({...shipping, fullName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Adresse</label>
                  <input 
                    type="text" 
                    value={shipping.address} 
                    onChange={(e) => setShipping({...shipping, address: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Code postal</label>
                    <input 
                      type="text" 
                      value={shipping.postalCode} 
                      onChange={(e) => setShipping({...shipping, postalCode: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Ville</label>
                    <input 
                      type="text" 
                      value={shipping.city} 
                      onChange={(e) => setShipping({...shipping, city: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Pays</label>
                    <select 
                      value={shipping.country} 
                      onChange={(e) => setShipping({...shipping, country: e.target.value})}
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input 
                      type="tel" 
                      value={shipping.phone} 
                      onChange={(e) => setShipping({...shipping, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="checkout-actions">
                  <button type="button" className="btn-back" onClick={() => navigate('/cart')}>Retour au panier</button>
                  <button type="submit" className="btn-next">Continuer vers le paiement</button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
            <div className="checkout-card fade-in">
              <h2>Méthode de paiement</h2>
              <form onSubmit={handlePaymentSubmit}>
                <div className="payment-methods">
                  <label className={`payment-option ${paymentMethod === 'CARD' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="CARD" 
                      checked={paymentMethod === 'CARD'}
                      onChange={() => setPaymentMethod('CARD')}
                    />
                    <div className="payment-info">
                      <span className="payment-name">Carte Bancaire</span>
                      <span className="payment-desc">Visa, Mastercard, CB</span>
                    </div>
                    <div className="payment-icon">💳</div>
                  </label>
                  
                  <label className={`payment-option ${paymentMethod === 'PAYPAL' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="PAYPAL" 
                      checked={paymentMethod === 'PAYPAL'}
                      onChange={() => setPaymentMethod('PAYPAL')}
                    />
                    <div className="payment-info">
                      <span className="payment-name">PayPal</span>
                      <span className="payment-desc">Paiement sécurisé via PayPal</span>
                    </div>
                    <div className="payment-icon">🅿️</div>
                  </label>
                </div>

                {paymentMethod === 'CARD' && (
                  <div className="card-details">
                    <div className="form-group">
                      <label>Numéro de carte</label>
                      <input type="text" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Date d'expiration</label>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label>CVC</label>
                        <input type="text" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="checkout-actions">
                  <button type="button" className="btn-back" onClick={() => setStep(1)}>Retour à la livraison</button>
                  <button type="submit" className="btn-next">Vérifier la commande</button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 3 && (
            <div className="checkout-card fade-in">
              <h2>Vérification de la commande</h2>
              
              <div className="review-section">
                <h3>Adresse de livraison</h3>
                <div className="review-box">
                  <p><strong>{shipping.fullName}</strong></p>
                  <p>{shipping.address}</p>
                  <p>{shipping.postalCode} {shipping.city}</p>
                  <p>{shipping.country}</p>
                  <p>{shipping.phone}</p>
                </div>
                <button className="btn-edit" onClick={() => setStep(1)}>Modifier</button>
              </div>
              
              <div className="review-section">
                <h3>Méthode de paiement</h3>
                <div className="review-box">
                  <p><strong>{paymentMethod === 'CARD' ? 'Carte Bancaire' : 'PayPal'}</strong></p>
                </div>
                <button className="btn-edit" onClick={() => setStep(2)}>Modifier</button>
              </div>

              <div className="checkout-actions">
                <button type="button" className="btn-back" onClick={() => setStep(2)}>Retour au paiement</button>
                <button 
                  type="button" 
                  className="btn-place-order" 
                  onClick={placeOrder}
                  disabled={submitting}
                >
                  {submitting ? 'Traitement en cours...' : 'Confirmer et Payer'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ORDER SUMMARY SIDEBAR */}
        <div className="checkout-sidebar">
          <div className="summary-card">
            <h3>Résumé de la commande</h3>
            
            <div className="summary-items">
              {cart?.items?.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-img">
                    {item.product?.image ? (
                      <img src={item.product.image} alt={item.product.name} />
                    ) : (
                      <div className="placeholder">🛍️</div>
                    )}
                    <span className="item-qty-badge">{item.quantity}</span>
                  </div>
                  <div className="summary-item-info">
                    <span className="summary-item-name">{item.product?.name}</span>
                    <span className="summary-item-price">{(Number(item.price) * item.quantity).toFixed(2)} €</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="summary-row">
              <span>Livraison</span>
              <span>Gratuit</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
