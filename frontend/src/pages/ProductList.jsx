import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '../services/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import './ProductList.css';

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={s <= Math.round(rating) ? 'star filled' : 'star'}>★</span>
      ))}
    </div>
  );
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setCartCount = useStore((state) => state.setCartCount);
  const setWishlistCount = useStore((state) => state.setWishlistCount);
  const wishlistCount = useStore((state) => state.wishlistCount);

  // Filters state
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    sortBy: searchParams.get('sortBy') || 'newest',
  });

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    apiClient.get('/products/categories').then(r => setCategories(r.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    setPage(1);
    setFilters(f => ({
      ...f,
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      sortBy: searchParams.get('sortBy') || f.sortBy,
    }));
  }, [searchParams.toString()]);

  useEffect(() => {
    fetchProducts();
  }, [page, filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 12 });
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const res = await apiClient.get(`/products?${params}`);
      const data = res.data;
      setProducts(Array.isArray(data) ? data : (data.products || []));
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    try {
      await apiClient.post('/cart/add', { productId, quantity: 1 });
      const countRes = await apiClient.get('/cart/count');
      setCartCount(countRes.data.count || 0);
      toast.success('Ajouté au panier !');
    } catch { toast.error('Erreur lors de l\'ajout'); }
  };

  const addToWishlist = async (productId, e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    try {
      await apiClient.post(`/wishlist/${productId}`);
      setWishlistCount(wishlistCount + 1);
      toast.success('Ajouté à la wishlist !');
    } catch { toast.error('Déjà dans la wishlist'); }
  };

  const applyFilter = (key, value) => {
    setFilters(f => ({ ...f, [key]: value }));
    setPage(1);
  };

  return (
    <div className="product-list-page">
      {/* Sidebar Filters */}
      <aside className="filters-sidebar">
        <h3>🔍 Filtres</h3>

        <div className="filter-group">
          <label>Catégorie</label>
          <select value={filters.category} onChange={e => applyFilter('category', e.target.value)}>
            <option value="">Toutes</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Prix min (€)</label>
          <input type="number" min="0" value={filters.minPrice}
            onChange={e => applyFilter('minPrice', e.target.value)} placeholder="0" />
        </div>

        <div className="filter-group">
          <label>Prix max (€)</label>
          <input type="number" min="0" value={filters.maxPrice}
            onChange={e => applyFilter('maxPrice', e.target.value)} placeholder="9999" />
        </div>

        <div className="filter-group">
          <label>Trier par</label>
          <select value={filters.sortBy} onChange={e => applyFilter('sortBy', e.target.value)}>
            <option value="newest">Plus récents</option>
            <option value="price_asc">Prix ↑</option>
            <option value="price_desc">Prix ↓</option>
            <option value="name">Nom A-Z</option>
          </select>
        </div>

        <button className="btn-reset" onClick={() => {
          setFilters({ search: '', category: '', minPrice: '', maxPrice: '', sortBy: 'newest' });
          setPage(1);
        }}>
          Réinitialiser
        </button>
      </aside>

      {/* Main content */}
      <main className="products-main">
        <div className="products-header">
          <h2>
            {filters.search ? `Résultats pour "${filters.search}"` : 'Tous les produits'}
          </h2>
          <div className="header-actions">
            <span className="result-count">{total} produit(s)</span>
            <div className="view-toggle">
              <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vue Grille">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              </button>
              <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vue Liste">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className={`products-${viewMode}`}>
            {[...Array(8)].map((_, i) => <div key={i} className="product-skeleton" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <p>😔 Aucun produit trouvé.</p>
            <p>Vérifiez que le backend est démarré ou modifiez vos filtres.</p>
          </div>
        ) : (
          <div className={`products-${viewMode}`}>
            {products.map((product) => (
              <div key={product.id} className={`product-card ${viewMode}-card`}>
                <Link to={`/products/${product.id}`} className="product-img-link">
                  <div className="product-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className="no-image">📦</div>
                    )}
                    {product.lowStock && <span className="badge-warning">Stock bas</span>}
                    {!product.inStock && <span className="badge-danger">Rupture</span>}
                  </div>
                </Link>

                <div className="product-info">
                  <Link to={`/products/${product.id}`} className="product-name">
                    {product.name}
                  </Link>
                  {product.category && <span className="product-category">{product.category}</span>}
                  <StarRating rating={product.avgRating || 0} />
                  <p className="product-price">{Number(product.price).toFixed(2)}€</p>

                  <div className="card-actions">
                    <button className="btn-wishlist" onClick={e => addToWishlist(product.id, e)} title="Wishlist">
                      ❤️
                    </button>
                    <button
                      className="btn-add-cart"
                      onClick={e => addToCart(product.id, e)}
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

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>← Précédent</button>
            <span>Page {page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Suivant →</button>
          </div>
        )}
      </main>
    </div>
  );
}
