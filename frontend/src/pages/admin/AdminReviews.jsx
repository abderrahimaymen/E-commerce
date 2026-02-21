import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { AdminSidebar } from './AdminAnalytics';
import './Admin.css';

const STARS = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [tab, setTab] = useState('PENDING');

  useEffect(() => { fetchReviews(); }, [tab]);

  const fetchReviews = async () => {
    try {
      const endpoint = tab === 'PENDING' ? '/reviews/admin/pending' : '/reviews/admin/all';
      const res = await api.get(endpoint);
      const data = Array.isArray(res.data) ? res.data : res.data.reviews || [];
      setReviews(tab === 'ALL' ? data : data);
    } catch { setReviews([]); }
  };

  const moderate = async (id, status) => {
    try {
      await api.patch(`/reviews/admin/${id}/moderate`, { status });
      toast.success(`Review ${status.toLowerCase()}`);
      fetchReviews();
    } catch { toast.error('Failed'); }
  };

  const displayed = tab === 'ALL' ? reviews : reviews.filter(r => r.status === 'PENDING');

  return (
    <div className="admin-page">
      <AdminSidebar active="/admin/reviews" />
      <main className="admin-main">
        <div className="admin-header">
          <h2>Review Moderation</h2>
          <div className="tab-group">
            {['PENDING', 'ALL'].map(t => (
              <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="admin-card">
          {displayed.length === 0 ? (
            <p className="empty-row">No reviews to moderate</p>
          ) : (
            displayed.map(r => (
              <div key={r.id} className="review-card">
                <div className="review-header">
                  <span className="stars">{STARS(r.rating)}</span>
                  <strong>{r.title}</strong>
                  <span className={`status-pill ${r.status?.toLowerCase()}`}>{r.status}</span>
                  <span className="review-meta">Product #{r.productId} · User #{r.userId}</span>
                  <span className="review-date">{new Date(r.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <p className="review-comment">{r.comment}</p>
                <div className="review-stats">
                  👍 {r.helpfulVotes} · 👎 {r.notHelpfulVotes}
                </div>
                {r.status === 'PENDING' && (
                  <div className="review-actions">
                    <button className="btn-approve" onClick={() => moderate(r.id, 'APPROVED')}>✓ Approve</button>
                    <button className="btn-reject" onClick={() => moderate(r.id, 'REJECTED')}>✕ Reject</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
