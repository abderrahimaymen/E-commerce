import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import useStore from './store/useStore';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import CustomerDashboard from './pages/CustomerDashboard';

import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminOrders from './pages/admin/AdminOrders';
import AdminInventory from './pages/admin/AdminInventory';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReviews from './pages/admin/AdminReviews';

/**
 * 🎯 Application React - E-commerce Frontend
 *
 * Cette application démontre l'utilisation du backend qui implémente:
 * - Encapsulation (Product avec getters/setters)
 * - Héritage (Client/Admin extends User)
 * - Polymorphisme (Payment Strategies)
 * - Composition (Cart contient CartItems)
 * - Strategy Pattern (Choix dynamique de paiement)
 */

function App() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== 'ADMIN') return <Navigate to="/" />;
    return children;
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />

            {/* Protected - Customer */}
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />

            {/* Protected - Admin */}
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminAnalytics /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
            <Route path="/admin/inventory" element={<ProtectedRoute adminOnly><AdminInventory /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute adminOnly><AdminReviews /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
