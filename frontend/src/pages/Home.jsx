import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import './Home.css';

const CATEGORIES = [
  { label: 'Électronique', icon: '💻' },
  { label: 'Mode', icon: '👗' },
  { label: 'Maison', icon: '🏠' },
  { label: 'Sports', icon: '⚽' },
  { label: 'Beauté', icon: '💄' },
  { label: 'Livres', icon: '📚' },
];

const HERO_SLIDES = [
  { title: 'Soldes d\'Été', subtitle: 'Jusqu\'à 50% de réduction', cta: 'Voir les offres', bg: '#e94560', link: '/products?sortBy=price_asc' },
  { title: 'Nouveaux Arrivages', subtitle: 'Découvrez les dernières tendances', cta: 'Explorer', bg: '#0f3460', link: '/products?sortBy=newest' },
  { title: 'Livraison Gratuite', subtitle: 'Sur toutes les commandes > 50€', cta: 'Commander', bg: '#533483', link: '/products' },
];

function StarRating({ rating, count }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? 'star filled' : 'star'}>★</span>
      ))}
      {count !== undefined && <span className="rating-count">({count})</span>}
    </div>
  );
}

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const user = useStore((state) => state.user);
  const setCartCount = useStore((state) => state.setCartCount);
  const setWishlistCount = useStore((state) => state.setWishlistCount);
  const wishlistCount = useStore((state) => state.wishlistCount);
  const navigate = useNavigate();

  useEffect(() => {
    loadTrending();
    const interval = setInterval(() => setHeroIndex(i => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const loadTrending = async () => {
    try {
      const res = await apiClient.get('/products?limit=8&sortBy=newest');
      const data = res.data;
      setTrending(Array.isArray(data) ? data : (data.products || []));
    } catch {
      setTrending([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    if (!user) { navigate('/login'); return; }
    try {
      await apiClient.post('/cart/add', { productId, quantity: 1 });
      const countRes = await apiClient.get('/cart/count');
      setCartCount(countRes.data.count || 0);
      toast.success('Ajouté au panier !');
    } catch {
      toast.error('Erreur lors de l\'ajout');
    }
  };

  const addToWishlist = async (productId) => {
    if (!user) { navigate('/login'); return; }
    try {
      await apiClient.post(`/wishlist/${productId}`);
      setWishlistCount(wishlistCount + 1);
      toast.success('Ajouté à la wishlist !');
    } catch {
      toast.error('Déjà dans la wishlist');
    }
  };

  const hero = HERO_SLIDES[heroIndex];

  return (
    <div className="home">
      {/* ─── Hero Banner ─── */}
      <section className="hero-banner" style={{ background: hero.bg }}>
        <div className="hero-content">
          <span className="hero-eyebrow">🌟 Offre Limitée</span>
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
          <Link to={hero.link} className="hero-cta">{hero.cta} →</Link>
        </div>
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`dot ${i === heroIndex ? 'active' : ''}`} onClick={() => setHeroIndex(i)} />
          ))}
        </div>
      </section>

      {/* ─── Category Chips ─── */}
      <section className="categories-section">
        <div className="section-inner">
          <h2>🏷️ Categories</h2>
          <div className="categories-row">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} to={`/products?category=${encodeURIComponent(cat.label)}`} className="category-chip">
                <span className="cat-icon">{cat.icon}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trending Products ─── */}
      <section className="trending-section">
        <div className="section-inner">
          <div className="section-header">
            <h2>🔥 Trending Products</h2>
            <Link to="/products" className="see-all">View All →</Link>
          </div>

          {loading ? (
            <div className="products-row">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-img" />
                  <div className="skeleton-body">
                    <div className="skeleton-line" />
                    <div className="skeleton-line short" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="products-row">
              {trending.slice(0, 8).map((product) => (
                <div key={product.id} className="product-card-home">
                  <div className="product-img-wrap">
                    {product.image ? <img src={product.image} alt={product.name} /> : <div className="no-img">📦</div>}
                    {product.lowStock && <span className="badge-low-stock">Low Stock</span>}
                    {!product.lowStock && !product.inStock === false && <span className="badge-new">New</span>}
                  </div>
                  <div className="product-card-body">
                    <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
                    <StarRating rating={product.avgRating || 0} count={product.reviewCount} />
                    <div className="price-row">
                      <span className="price">{Number(product.price).toFixed(2)} €</span>
                    </div>
                    <div className="card-actions">
                      <button className="btn-wishlist" onClick={() => addToWishlist(product.id)} title="Add to Wishlist">❤️</button>
                      <button className="btn-cart" onClick={() => addToCart(product.id)} disabled={!product.inStock}>
                        {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Promo Strip ─── */}
      <div className="promo-strip">
        <h2>🎉 Exclusive Members Deal</h2>
        <p>Sign up today and get 10% off your first order. No code needed.</p>
        <Link to="/register" className="promo-btn">Create Account — It's Free</Link>
      </div>

      {/* ─── Footer ─── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand footer-col">
            <Link to="/" className="footer-logo">🛒 E-Shop</Link>
            <p>Your one-stop online shop for electronics, fashion, home goods and more. Fast delivery, easy returns.</p>
            <div className="social-links">
              <a href="#" className="social-btn">📘</a>
              <a href="#" className="social-btn">🐦</a>
              <a href="#" className="social-btn">📸</a>
              <a href="#" className="social-btn">▶️</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              {CATEGORIES.map(c => <li key={c.label}><Link to={`/products?category=${encodeURIComponent(c.label)}`}>{c.label}</Link></li>)}
              <li><Link to="/products?sortBy=price_asc">Best Deals</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <ul>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div className="footer-col footer-newsletter">
            <h4>Newsletter</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem', color: '#8892a4' }}>
              Get exclusive deals and offers straight to your inbox.
            </p>
            <input type="email" placeholder="your@email.com" />
            <button>Subscribe →</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 E-Shop. All rights reserved.</p>
          <div className="payment-methods">
            {['VISA', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'].map(p => (
              <span key={p} className="pay-badge">{p}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
