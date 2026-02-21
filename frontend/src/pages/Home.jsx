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
  const { user, setCartCount, setWishlistCount, wishlistCount } = useStore();
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
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
          <Link to={hero.link} className="hero-cta">{hero.cta} →</Link>
        </div>
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === heroIndex ? 'active' : ''}`}
              onClick={() => setHeroIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="categories-section">
        <div className="section-inner">
          <h2>🏷️ Catégories</h2>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                to={`/products?category=${encodeURIComponent(cat.label)}`}
                className="category-card"
              >
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
            <h2>🔥 Produits Tendance</h2>
            <Link to="/products" className="see-all">Voir tout →</Link>
          </div>

          {loading ? (
            <div className="loading-grid">
              {[...Array(4)].map((_, i) => <div key={i} className="product-skeleton" />)}
            </div>
          ) : (
            <div className="products-row">
              {trending.slice(0, 8).map((product) => (
                <div key={product.id} className="product-card-home">
                  <div className="product-img-wrap">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className="no-img">📦</div>
                    )}
                    {product.lowStock && <span className="badge-low-stock">Stock bas</span>}
                  </div>
                  <div className="product-card-body">
                    <Link to={`/products/${product.id}`} className="product-name">
                      {product.name}
                    </Link>
                    <StarRating rating={product.avgRating || 0} count={product.reviewCount} />
                    <div className="price-row">
                      <span className="price">{Number(product.price).toFixed(2)}€</span>
                    </div>
                    <div className="card-actions">
                      <button
                        className="btn-wishlist"
                        onClick={() => addToWishlist(product.id)}
                        title="Wishlist"
                      >❤️</button>
                      <button
                        className="btn-cart"
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? '🛒 Ajouter' : 'Rupture'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Footer Banner ─── */}
      <section className="promo-banner">
        <div className="section-inner">
          <div className="promo-tiles">
            <div className="promo-tile">🚚 <strong>Livraison rapide</strong><small>24h–48h</small></div>
            <div className="promo-tile">🔒 <strong>Paiement sécurisé</strong><small>SSL & 3D Secure</small></div>
            <div className="promo-tile">↩️ <strong>Retour gratuit</strong><small>30 jours</small></div>
            <div className="promo-tile">🎧 <strong>Support 7j/7</strong><small>Chat & Email</small></div>
          </div>
        </div>
      </section>
    </div>
  );
}
