import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { AdminSidebar } from './AdminAnalytics';
import './Admin.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const limit = 20;

  useEffect(() => { fetchUsers(); }, [search, page]);

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/admin/users?search=${search}&page=${page}&limit=${limit}`);
      setUsers(res.data.users || []);
      setTotal(res.data.total || 0);
    } catch { setUsers([]); }
  };

  const toggleBlock = async (u) => {
    try {
      await api.patch(`/admin/users/${u.id}/block`, { blocked: !u.isBlocked });
      toast.success(u.isBlocked ? 'User unblocked' : 'User blocked');
      fetchUsers();
    } catch { toast.error('Failed'); }
  };

  const resetPassword = async (id) => {
    if (!confirm('Send a password reset email?')) return;
    try {
      await api.patch(`/admin/users/${id}/reset-password`);
      toast.success('Reset email sent');
    } catch { toast.error('Failed'); }
  };

  const viewOrders = async (u) => {
    setSelected(u);
    try {
      const res = await api.get(`/admin/users/${u.id}/orders`);
      setUserOrders(Array.isArray(res.data) ? res.data : []);
    } catch { setUserOrders([]); }
  };

  const pages = Math.ceil(total / limit);

  return (
    <div className="admin-page">
      <AdminSidebar active="/admin/users" />
      <main className="admin-main">
        <div className="admin-header">
          <h2>User Management</h2>
          <input placeholder="Search by name or email…" value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }} className="admin-search" />
        </div>

        <div className="admin-card">
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className={u.isBlocked ? 'row-blocked' : ''}>
                  <td>{u.id}</td>
                  <td>{u.firstName} {u.lastName}</td>
                  <td>{u.email}</td>
                  <td><span className={`role-pill ${u.role}`}>{u.role}</span></td>
                  <td>{u.isBlocked ? <span className="badge-oos">Blocked</span> : <span className="badge-ok">Active</span>}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <button className="link-action" onClick={() => viewOrders(u)}>Orders</button>
                    <button className={u.isBlocked ? 'link-action' : 'link-danger'} onClick={() => toggleBlock(u)}>
                      {u.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                    <button className="link-action" onClick={() => resetPassword(u.id)}>Reset PWD</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan="7" className="empty-row">No users found</td></tr>}
            </tbody>
          </table>
          {pages > 1 && (
            <div className="pagination">
              {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                <button key={p} className={`page-btn ${p === page ? 'active' : ''}`} onClick={() => setPage(p)}>{p}</button>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3>Orders — {selected.firstName} {selected.lastName}</h3>
              <p style={{ color: '#888', fontSize: '0.85rem' }}>{selected.email}</p>
              {userOrders.length > 0 ? (
                <table className="admin-table" style={{ marginTop: '1rem' }}>
                  <thead><tr><th>#</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
                  <tbody>
                    {userOrders.map(o => (
                      <tr key={o.id}>
                        <td>#{o.id}</td>
                        <td>{new Date(o.createdAt).toLocaleDateString('fr-FR')}</td>
                        <td>{(+o.totalAmount || 0).toFixed(2)} €</td>
                        <td>{o.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : <p className="empty-row">No orders</p>}
              <button className="modal-close" onClick={() => setSelected(null)}>✕ Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
