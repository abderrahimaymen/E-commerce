import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { AdminSidebar } from './AdminAnalytics';
import './Admin.css';

const STATUS_OPTIONS = ['EN_ATTENTE','PAYEE','EN_PREPARATION','EXPEDIEE','LIVREE','ANNULEE'];
const STATUS_COLORS = { EN_ATTENTE:'#999', PAYEE:'#2196f3', EN_PREPARATION:'#ff9800', EXPEDIEE:'#9c27b0', LIVREE:'#4caf50', ANNULEE:'#f44336', REMBOURSEE:'#795548' };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/admin/all');
      setOrders(Array.isArray(res.data) ? res.data : res.data.orders || []);
    } catch { setOrders([]); }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      toast.success('Status updated');
      fetchOrders();
      if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
    } catch { toast.error('Failed to update status'); }
  };

  const filtered = orders.filter(o =>
    (!filter || o.status === filter) &&
    (!search || String(o.id).includes(search) || o.user?.email?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="admin-page">
      <AdminSidebar active="/admin/orders" />
      <main className="admin-main">
        <div className="admin-header">
          <h2>Order Management</h2>
          <div className="admin-filters">
            <input placeholder="Search ID or email…" value={search} onChange={e => setSearch(e.target.value)} className="admin-search" />
            <select value={filter} onChange={e => setFilter(e.target.value)} className="period-select">
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr><th>#</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.user?.email || '—'}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>{(+o.totalAmount || 0).toFixed(2)} €</td>
                  <td><span className="status-pill" style={{ background: STATUS_COLORS[o.status] }}>{o.status}</span></td>
                  <td>
                    <button className="link-action" onClick={() => setSelected(o)}>View</button>
                    <select
                      defaultValue=""
                      onChange={e => { if (e.target.value) updateStatus(o.id, e.target.value); }}
                      className="inline-select"
                    >
                      <option value="" disabled>Update…</option>
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="6" className="empty-row">No orders found</td></tr>}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3>Order #{selected.id}</h3>
              <p><b>Customer:</b> {selected.user?.email}</p>
              <p><b>Status:</b> <span className="status-pill" style={{ background: STATUS_COLORS[selected.status] }}>{selected.status}</span></p>
              <p><b>Total:</b> {(+selected.totalAmount || 0).toFixed(2)} €</p>
              <p><b>Date:</b> {new Date(selected.createdAt).toLocaleString('fr-FR')}</p>
              {selected.items?.length > 0 && (
                <table className="admin-table" style={{ marginTop: '1rem' }}>
                  <thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead>
                  <tbody>
                    {selected.items.map((it, i) => (
                      <tr key={i}><td>{it.product?.name || it.productId}</td><td>{it.quantity}</td><td>{(+it.price || 0).toFixed(2)} €</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div style={{ marginTop: '1rem' }}>
                <b>Update Status:</b>
                <div className="status-btn-group">
                  {STATUS_OPTIONS.map(s => (
                    <button key={s} className={`status-btn ${selected.status === s ? 'active' : ''}`}
                      style={{ '--c': STATUS_COLORS[s] }} onClick={() => updateStatus(selected.id, s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕ Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
