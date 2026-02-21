import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import api from '../../services/api';
import './Admin.css';

const SIDEBAR_LINKS = [
  { to: '/admin', label: '📊 Analytics' },
  { to: '/admin/orders', label: '📦 Orders' },
  { to: '/admin/inventory', label: '🏷️ Inventory' },
  { to: '/admin/users', label: '👥 Users' },
  { to: '/admin/reviews', label: '⭐ Reviews' },
];

export function AdminSidebar({ active }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-title">Admin Panel</div>
      <nav>
        {SIDEBAR_LINKS.map(l => (
          <Link key={l.to} to={l.to} className={active === l.to ? 'active' : ''}>{l.label}</Link>
        ))}
      </nav>
    </aside>
  );
}

export default function AdminAnalytics() {
  const [period, setPeriod] = useState('week');
  const [overview, setOverview] = useState(null);
  const [chart, setChart] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      const [ov, ch, tp, ls] = await Promise.all([
        api.get(`/admin/analytics/overview?period=${period}`),
        api.get('/admin/analytics/revenue-chart?days=30'),
        api.get('/admin/analytics/top-products?limit=5'),
        api.get('/admin/analytics/low-stock?threshold=10'),
      ]);
      setOverview(ov.data);
      setChart(ch.data);
      setTopProducts(tp.data);
      setLowStock(ls.data);
    } catch { /* no-op */ }
  };

  const fmt = v => (v ?? 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  const pct = v => v > 0 ? `+${v}%` : `${v}%`;

  return (
    <div className="admin-page">
      <AdminSidebar active="/admin" />
      <main className="admin-main">
        <div className="admin-header">
          <h2>Analytics</h2>
          <select value={period} onChange={e => setPeriod(e.target.value)} className="period-select">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {overview && (
          <div className="kpi-row">
            <div className="kpi-card">
              <span className="kpi-value">{fmt(overview.revenue?.current)}</span>
              <span className="kpi-label">Revenue</span>
              <span className={`kpi-change ${overview.revenue?.change >= 0 ? 'up' : 'down'}`}>
                {pct(overview.revenue?.change)}
              </span>
            </div>
            <div className="kpi-card">
              <span className="kpi-value">{overview.orders?.current ?? 0}</span>
              <span className="kpi-label">Orders</span>
              <span className={`kpi-change ${overview.orders?.change >= 0 ? 'up' : 'down'}`}>
                {pct(overview.orders?.change)}
              </span>
            </div>
            <div className="kpi-card">
              <span className="kpi-value">{overview.newUsers?.current ?? 0}</span>
              <span className="kpi-label">New Users</span>
              <span className={`kpi-change ${overview.newUsers?.change >= 0 ? 'up' : 'down'}`}>
                {pct(overview.newUsers?.change)}
              </span>
            </div>
          </div>
        )}

        <div className="admin-charts-row">
          <div className="chart-card wide">
            <h3>Revenue (Last 30 Days)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={v => fmt(v)} />
                <Line type="monotone" dataKey="revenue" stroke="#e94560" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Top Products</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="sold" fill="#1a1a2e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {lowStock.length > 0 && (
          <div className="admin-card">
            <h3>⚠️ Low Stock Alerts</h3>
            <table className="admin-table">
              <thead><tr><th>Product</th><th>Stock</th><th>Action</th></tr></thead>
              <tbody>
                {lowStock.map(p => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td><span className="low-stock-badge">{p.stock} left</span></td>
                    <td><Link to="/admin/inventory" className="link-action">Manage</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
