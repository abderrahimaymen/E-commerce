import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { AdminSidebar } from './AdminAnalytics';
import './Admin.css';

const EMPTY_FORM = { name: '', description: '', price: '', stock: '', category: '', image: '' };

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editing, setEditing] = useState(null);
  const [stockEdits, setStockEdits] = useState({});
  const csvRef = useRef();

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/admin/all');
      setProducts(Array.isArray(res.data) ? res.data : res.data.products || []);
    } catch { setProducts([]); }
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const saveProduct = async () => {
    try {
      if (editing) {
        await api.patch(`/products/${editing}`, { ...form, price: +form.price, stock: +form.stock });
        toast.success('Product updated');
      } else {
        await api.post('/products', { ...form, price: +form.price, initialStock: +form.stock });
        toast.success('Product created');
      }
      setShowForm(false); setEditing(null); setForm(EMPTY_FORM);
      fetchProducts();
    } catch (e) { toast.error(e.response?.data?.message || 'Error saving product'); }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    try { await api.delete(`/products/${id}`); toast.success('Deleted'); fetchProducts(); }
    catch { toast.error('Cannot delete'); }
  };

  const saveStock = async (id) => {
    const val = stockEdits[id];
    if (val === undefined) return;
    try {
      await api.patch(`/products/${id}`, { stock: +val });
      toast.success('Stock updated');
      setStockEdits(prev => { const n = { ...prev }; delete n[id]; return n; });
      fetchProducts();
    } catch { toast.error('Failed'); }
  };

  const exportCsv = async () => {
    try {
      const res = await api.get('/products/admin/export-csv', { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a'); a.href = url; a.download = 'products.csv'; a.click();
    } catch { toast.error('Export failed'); }
  };

  const importCsv = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append('file', file);
    try {
      const res = await api.post('/products/admin/import-csv', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(`Imported: ${res.data.imported} products, ${res.data.errors} errors`);
      fetchProducts();
    } catch { toast.error('Import failed'); }
    e.target.value = '';
  };

  const openEdit = (p) => { setEditing(p.id); setForm({ name: p.name, description: p.description || '', price: p.price, stock: p.stock, category: p.category || '', image: p.image || '' }); setShowForm(true); };

  return (
    <div className="admin-page">
      <AdminSidebar active="/admin/inventory" />
      <main className="admin-main">
        <div className="admin-header">
          <h2>Inventory</h2>
          <div className="admin-filters">
            <input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} className="admin-search" />
            <button className="btn-admin" onClick={() => { setEditing(null); setForm(EMPTY_FORM); setShowForm(true); }}>+ Add Product</button>
            <button className="btn-admin btn-outline" onClick={exportCsv}>⬇ Export CSV</button>
            <button className="btn-admin btn-outline" onClick={() => csvRef.current.click()}>⬆ Import CSV</button>
            <input type="file" accept=".csv" ref={csvRef} style={{ display: 'none' }} onChange={importCsv} />
          </div>
        </div>

        <div className="admin-card">
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className={p.stock <= 5 ? 'row-danger' : p.stock <= 10 ? 'row-warn' : ''}>
                  <td>{p.id}</td>
                  <td>{p.name}{p.stock === 0 && <span className="badge-oos">Out of Stock</span>}</td>
                  <td>{p.category || '—'}</td>
                  <td>{(+p.price).toFixed(2)} €</td>
                  <td>
                    <div className="stock-edit">
                      <input
                        type="number" min="0"
                        value={stockEdits[p.id] ?? p.stock}
                        onChange={e => setStockEdits(prev => ({ ...prev, [p.id]: e.target.value }))}
                        className="stock-input"
                      />
                      {stockEdits[p.id] !== undefined && (
                        <button className="btn-save-stock" onClick={() => saveStock(p.id)}>✓</button>
                      )}
                      {p.stock <= 10 && p.stock > 0 && <span title="Low stock">⚠️</span>}
                    </div>
                  </td>
                  <td>
                    <button className="link-action" onClick={() => openEdit(p)}>Edit</button>
                    <button className="link-danger" onClick={() => deleteProduct(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="6" className="empty-row">No products</td></tr>}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
              {['name','description','price','stock','category','image'].map(field => (
                <div key={field} className="form-row">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} placeholder={field} />
                </div>
              ))}
              <div className="modal-actions">
                <button className="btn-admin" onClick={saveProduct}>Save</button>
                <button className="btn-admin btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
