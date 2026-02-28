import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import './OrderHistory.css';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        console.log('Orders response:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des commandes:', error);
        toast.error('Impossible de charger vos commandes');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    if (!status) return '';
    const s = status.toUpperCase();
    switch (s) {
      case 'PENDING': return 'status-pending';
      case 'PAID': return 'status-confirmed';
      case 'PROCESSING': return 'status-processing';
      case 'SHIPPED': return 'status-shipped';
      case 'DELIVERED': return 'status-delivered';
      case 'CANCELLED': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const translateStatus = (status) => {
    if (!status) return 'Inconnu';
    const s = status.toUpperCase();
    switch (s) {
      case 'PENDING': return 'En attente';
      case 'PAID': return 'Payée';
      case 'PROCESSING': return 'En cours';
      case 'SHIPPED': return 'Expédiée';
      case 'DELIVERED': return 'Livrée';
      case 'CANCELLED': return 'Annulée';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <h1 className="orders-page-title">Mes Commandes</h1>
        <div className="loading-spinner">Chargement des commandes...</div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-page-title">Mes Commandes</h1>

      {!orders || orders.length === 0 ? (
        <div className="empty-orders">
          <span className="empty-icon" style={{fontSize: '48px', display: 'block', marginBottom: '16px'}}>📦</span>
          <h3>Aucune commande trouvée</h3>
          <p>Vous n'avez pas encore passé de commande.</p>
          <Link to="/products" className="btn" style={{ 
            marginTop: '1rem', 
            display: 'inline-block',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            Découvrir nos produits
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Commande #{order.id.slice(0, 8)}</h3>
                  <span className="order-date">{formatDate(order.createdAt)}</span>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {translateStatus(order.status)}
                </div>
              </div>
              
              <div className="order-body">
                <div className="order-items">
                  {order.items && order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="item-image-container">
                       {item.product && item.product.image ? (
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="item-image"
                            style={{width: '60px', height: '60px', objectFit: 'cover', marginRight: '1rem', borderRadius: '4px'}}
                            onError={(e) => {e.target.style.display = 'none'}}
                          />
                        ) : (
                          <div style={{width: '60px', height: '60px', background: '#eee', marginRight: '1rem', borderRadius: '4px'}}></div>
                        )}
                      </div>
                      <div className="item-details" style={{flex: 1}}>
                        <div className="item-name" style={{fontWeight: 'bold'}}>{item.product ? item.product.name : 'Produit inconnu'}</div>
                        <div className="item-meta" style={{color: '#666', fontSize: '0.9em'}}>
                          Quantité: {item.quantity} × {Number(item.unitPriceSnapshot).toFixed(2)} €
                        </div>
                      </div>
                      <div className="item-total-price" style={{fontWeight: 'bold'}}>
                        {Number(item.lineTotal).toFixed(2)} €
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total-container" style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                    <span style={{color: '#666'}}>Total</span>
                    <span className="total-amount" style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                      {order.total ? Number(order.total).toFixed(2) : '0.00'} €
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
