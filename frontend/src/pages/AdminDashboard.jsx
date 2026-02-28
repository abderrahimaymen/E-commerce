import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import './admin/Admin.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      toast.error('Accès non autorisé');
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      // In a real app, these would be actual API calls
      // const statsRes = await api.get('/admin/stats');
      // const ordersRes = await api.get('/admin/orders/recent');
      
      // Mock data for demonstration
      setTimeout(() => {
        setStats({
          totalRevenue: 12450.50,
          totalOrders: 145,
          totalUsers: 890,
          totalProducts: 324,
          revenueGrowth: 12.5,
          ordersGrowth: 8.2
        });
        
        setRecentOrders([
          { id: 'ORD-001', customer: 'Jean Dupont', date: '2026-02-27', total: 125.50, status: 'DELIVERED' },
          { id: 'ORD-002', customer: 'Marie Martin', date: '2026-02-26', total: 89.99, status: 'SHIPPED' },
          { id: 'ORD-003', customer: 'Pierre Durand', date: '2026-02-26', total: 245.00, status: 'PROCESSING' },
          { id: 'ORD-004', customer: 'Sophie Leroy', date: '2026-02-25', total: 45.00, status: 'PENDING' },
          { id: 'ORD-005', customer: 'Luc Moreau', date: '2026-02-25', total: 310.20, status: 'DELIVERED' },
        ]);
        
        setLoading(false);
      }, 800);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      setLoading(false);
    }
  };

  if (loading) return <div className="admin-loading">Chargement du tableau de bord...</div>;

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon">📊</span> Vue d'ensemble
          </button>
          <button 
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span className="nav-icon">📦</span> Produits
          </button>
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <span className="nav-icon">🛒</span> Commandes
          </button>
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="nav-icon">👥</span> Utilisateurs
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="nav-icon">⚙️</span> Paramètres
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Tableau de bord</h1>
          <div className="admin-user-info">
            <span>Bonjour, {user?.firstName || 'Admin'}</span>
            <div className="admin-avatar">{user?.firstName?.charAt(0) || 'A'}</div>
          </div>
        </header>

        <div className="admin-content">
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon revenue">💰</div>
                  <div className="stat-info">
                    <h3>Revenus Totaux</h3>
                    <p className="stat-value">{stats?.totalRevenue.toFixed(2)} €</p>
                    <span className="stat-trend positive">↑ {stats?.revenueGrowth}% ce mois</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon orders">📦</div>
                  <div className="stat-info">
                    <h3>Commandes</h3>
                    <p className="stat-value">{stats?.totalOrders}</p>
                    <span className="stat-trend positive">↑ {stats?.ordersGrowth}% ce mois</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon users">👥</div>
                  <div className="stat-info">
                    <h3>Utilisateurs</h3>
                    <p className="stat-value">{stats?.totalUsers}</p>
                    <span className="stat-trend neutral">Stable</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon products">🛍️</div>
                  <div className="stat-info">
                    <h3>Produits</h3>
                    <p className="stat-value">{stats?.totalProducts}</p>
                    <span className="stat-trend neutral">Stable</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                {/* Sales Chart (Mock) */}
                <div className="chart-card">
                  <h3>Évolution des ventes</h3>
                  <div className="chart-placeholder">
                    <div className="chart-bars">
                      <div className="bar" style={{ height: '40%' }}><span>Lun</span></div>
                      <div className="bar" style={{ height: '60%' }}><span>Mar</span></div>
                      <div className="bar" style={{ height: '30%' }}><span>Mer</span></div>
                      <div className="bar" style={{ height: '80%' }}><span>Jeu</span></div>
                      <div className="bar" style={{ height: '50%' }}><span>Ven</span></div>
                      <div className="bar" style={{ height: '90%' }}><span>Sam</span></div>
                      <div className="bar" style={{ height: '70%' }}><span>Dim</span></div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="recent-orders-card">
                  <div className="card-header">
                    <h3>Commandes Récentes</h3>
                    <button className="btn-view-all" onClick={() => setActiveTab('orders')}>Voir tout</button>
                  </div>
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Client</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map(order => (
                          <tr key={order.id}>
                            <td><strong>{order.id}</strong></td>
                            <td>{order.customer}</td>
                            <td>{new Date(order.date).toLocaleDateString('fr-FR')}</td>
                            <td>{order.total.toFixed(2)} €</td>
                            <td>
                              <span className={`status-badge ${order.status.toLowerCase()}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'overview' && (
            <div className="placeholder-content">
              <div className="placeholder-icon">🚧</div>
              <h2>Module en construction</h2>
              <p>Le module "{activeTab}" sera bientôt disponible.</p>
              <button className="btn-primary" onClick={() => setActiveTab('overview')}>
                Retour à la vue d'ensemble
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
