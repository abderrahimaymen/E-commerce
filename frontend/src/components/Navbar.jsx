import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import apiClient from '../services/api';
import './Navbar.css';

export default function Navbar() {
  const user = useStore((state) => state.user);
  const cartCount = useStore((state) => state.cartCount);
  const wishlistCount = useStore((state) => state.wishlistCount);
  const setCartCount = useStore((state) => state.setCartCount);
  const setWishlistCount = useStore((state) => state.setWishlistCount);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      apiClient.get('/cart/count').then(r => setCartCount(r.data.count || 0)).catch(() => {});
      apiClient.get('/wishlist/count').then(r => setWishlistCount(r.data.count || 0)).catch(() => {});
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">🛒 E-Shop</Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="🔍 Rechercher des produits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </form>

        <div className="navbar-right">
          {user ? (
            <>
              <Link to="/wishlist" className="nav-icon-btn" title="Wishlist">
                ❤️ {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
              </Link>
              <Link to="/cart" className="nav-icon-btn" title="Panier">
                🛍️ {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </Link>
              <div className="nav-profile" onClick={() => setMenuOpen(!menuOpen)}>
                👤 {user.name?.split(' ')[0]}
                {menuOpen && (
                  <div className="profile-dropdown">
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>🗂️ Mon compte</Link>
                    <Link to="/orders" onClick={() => setMenuOpen(false)}>📦 Mes commandes</Link>
                    <Link to="/wishlist" onClick={() => setMenuOpen(false)}>❤️ Wishlist</Link>
                    {user.role === 'ADMIN' && (
                      <Link to="/admin" onClick={() => setMenuOpen(false)}>⚙️ Admin Panel</Link>
                    )}
                    <button onClick={handleLogout}>🚪 Déconnexion</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Connexion</Link>
              <Link to="/register" className="nav-link nav-link-primary">S'inscrire</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
