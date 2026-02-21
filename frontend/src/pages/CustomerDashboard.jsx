import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';
import useStore from '../store/useStore';
import { DashboardSidebar } from './Wishlist';
import './Dashboard.css';

const STATUS_LABELS = {
  EN_ATTENTE: { label: 'En attente', color: '#ff9800' },
  PAYEE: { label: 'Payée', color: '#2196f3' },
  EN_PREPARATION: { label: 'En préparation', color: '#9c27b0' },
  EXPEDIEE: { label: 'Expédiée', color: '#03a9f4' },
  LIVREE: { label: 'Livrée', color: '#4caf50' },
  ANNULEE: { label: 'Annulée', color: '#f44336' },
  REMBOURSEE: { label: 'Remboursée', color: '#607d8b' },
};

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ total: 0, delivered: 0, spent: 0 });
  const [loading, setLoading] = useState(true);
  const user = useStore((state) => state.user);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await apiClient.get('/orders');
      const list = res.data || [];
      setOrders(list);
      setStats({
        total: list.length,
        delivered: list.filter(o => o.status === 'LIVREE').length,
        spent: list.reduce((s, o) => s + Number(o.total || 0), 0),
      });
    } catch {} finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <DashboardSidebar active="profile" />

        <main className="dashboard-main">
          <h2>👤 Mon Compte</h2>

          {/* Profile card */}
          <div className="profile-card">
            <div className="profile-avatar">
              {user?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
              <span className="role-badge">{user?.role === 'ADMIN' ? '⚙️ Admin' : '🧑 Client'}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Commandes</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.delivered}</span>
              <span className="stat-label">Livrées</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.spent.toFixed(2)}€</span>
              <span className="stat-label">Total dépensé</span>
            </div>
          </div>

          {/* Recent orders */}
          <h3>📦 Commandes récentes</h3>
          {loading ? (
            <p>Chargement...</p>
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <p>Aucune commande pour le moment.</p>
              <Link to="/products" className="btn-primary">Commencer vos achats</Link>
            </div>
          ) : (
            <div className="orders-table-wrap">
              <table className="orders-table">
                <thead>
                  <tr><th>N°</th><th>Date</th><th>Total</th><th>Statut</th><th></th></tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => {
                    const st = STATUS_LABELS[order.status] || { label: order.status, color: '#999' };
                    return (
                      <tr key={order.id}>
                        <td>#{order.id?.slice(0, 8)}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                        <td><strong>{Number(order.total || 0).toFixed(2)}€</strong></td>
                        <td>
                          <span className="status-badge" style={{ background: st.color }}>
                            {st.label}
                          </span>
                        </td>
                        <td><Link to="/orders" className="link-view">Voir →</Link></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {orders.length > 5 && (
                <Link to="/orders" className="see-all-link">Voir toutes les commandes →</Link>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
