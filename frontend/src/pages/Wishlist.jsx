import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import './Dashboard.css';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const setWishlistCount = useStore((state) => state.setWishlistCount);
  const setCartCount = useStore((state) => state.setCartCount);
  const navigate = useNavigate();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const res = await apiClient.get('/wishlist');
      setItems(res.data || []);
    } catch {
      toast.error('Impossible de charger la wishlist');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (productId) => {
    try {
      await apiClient.delete(`/wishlist/${productId}`);
      setItems(prev => prev.filter(i => i.productId !== productId));
      setWishlistCount(prev => Math.max(0, prev - 1));
      toast.success('Retiré de la wishlist');
    } catch { toast.error('Erreur'); }
  };

  const moveToCart = async (productId) => {
    try {
      await apiClient.post('/cart/add', { productId, quantity: 1 });
      await apiClient.delete(`/wishlist/${productId}`);
      setItems(prev => prev.filter(i => i.productId !== productId));
      const countRes = await apiClient.get('/cart/count');
      setCartCount(countRes.data.count || 0);
      setWishlistCount(prev => Math.max(0, prev - 1));
      toast.success('Déplacé dans le panier !');
    } catch { toast.error('Erreur'); }
  };

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <DashboardSidebar active="wishlist" />

        <main className="dashboard-main">
          <h2>❤️ Ma Wishlist</h2>
          {items.length === 0 ? (
            <div className="empty-state">
              <p>Votre wishlist est vide.</p>
              <Link to="/products" className="btn-primary">Parcourir les produits</Link>
            </div>
          ) : (
            <div className="wishlist-list">
              {items.map((item) => {
                const product = item.product || {};
                const hasPriceDrop = item.hasPriceDrop;
                const currentPrice = Number(product.price || 0);

                return (
                  <div key={item.id} className="wishlist-item">
                    <div className="wishlist-img">
                      {product.image ? <img src={product.image} alt={product.name} /> : <span>📦</span>}
                    </div>
                    <div className="wishlist-details">
                      <Link to={`/products/${item.productId}`} className="wishlist-name">
                        {product.name || 'Produit'}
                      </Link>
                      <div className="wishlist-meta">
                        Ajouté le {new Date(item.addedAt).toLocaleDateString('fr-FR')}
                        &nbsp;·&nbsp;
                        {product.inStock ? <span className="in-stock">✅ En stock</span> : <span className="out-stock">❌ Rupture</span>}
                        {product.lowStock && <span className="low-stock"> ⚠️ Stock bas</span>}
                      </div>
                      <div className="wishlist-price">
                        {hasPriceDrop && (
                          <span className="price-drop">
                            ⬇️ Baisse de prix ! (était {Number(item.priceAtAddition).toFixed(2)}€)
                          </span>
                        )}
                        <strong>{currentPrice.toFixed(2)}€</strong>
                      </div>
                    </div>
                    <div className="wishlist-actions">
                      <button className="btn-move-cart" onClick={() => moveToCart(item.productId)}>
                        🛒 Déplacer dans le panier
                      </button>
                      <button className="btn-remove" onClick={() => remove(item.productId)}>
                        ❌ Retirer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export function DashboardSidebar({ active }) {
  return (
    <aside className="dashboard-sidebar">
      <nav>
        <Link to="/dashboard" className={active === 'profile' ? 'active' : ''}>👤 Profil</Link>
        <Link to="/orders" className={active === 'orders' ? 'active' : ''}>📦 Mes commandes</Link>
        <Link to="/wishlist" className={active === 'wishlist' ? 'active' : ''}>❤️ Wishlist</Link>
        <Link to="/settings" className={active === 'settings' ? 'active' : ''}>⚙️ Paramètres</Link>
      </nav>
    </aside>
  );
}
