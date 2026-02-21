import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import useStore from '../store/useStore';
import './ProductDetails.css';

const STARS = (n, total = 5) => Array.from({ length: total }, (_, i) => (
  <span key={i} style={{ color: i < n ? '#ffc107' : '#ddd', fontSize: '1.1rem' }}>★</span>
));

export default function ProductDetails() {
  const { id } = useParams();
  const user = useStore((state) => state.user);
  const setWishlistCount = useStore((state) => state.setWishlistCount);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [qty, setQty] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    if (user) checkWishlist();
  }, [id]);

  const fetchProduct = async () => {
    try { const res = await api.get(`/products/${id}`); setProduct(res.data); }
    catch { toast.error('Product not found'); }
  };

  const fetchReviews = async () => {
    try { const res = await api.get(`/reviews/product/${id}`); setReviews(res.data); }
    catch { setReviews({ reviews: [], averageRating: 0, totalReviews: 0, ratingBreakdown: {} }); }
  };

  const checkWishlist = async () => {
    try { const res = await api.get(`/wishlist/check/${id}`); setInWishlist(res.data.inWishlist); }
    catch { /* ignore */ }
  };

  const addToCart = async () => {
    if (!user) { toast.error('Please login first'); return; }
    try {
      await api.post('/carts/add', { productId: +id, quantity: qty });
      toast.success('Added to cart!');
    } catch (e) { toast.error(e.response?.data?.message || 'Error'); }
  };

  const toggleWishlist = async () => {
    if (!user) { toast.error('Please login first'); return; }
    try {
      if (inWishlist) {
        await api.delete(`/wishlist/${id}`);
        setInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        await api.post(`/wishlist/${id}`);
        setInWishlist(true);
        toast.success('Added to wishlist!');
      }
      const countRes = await api.get('/wishlist/count');
      setWishlistCount(countRes.data.count || 0);
    } catch (e) { toast.error(e.response?.data?.message || 'Error'); }
  };

  const submitReview = async () => {
    if (reviewForm.comment.length < 10) { toast.error('Comment must be at least 10 characters'); return; }
    setSubmitting(true);
    try {
      await api.post(`/reviews/product/${id}`, reviewForm);
      toast.success('Review submitted — pending moderation');
      setShowReviewForm(false);
      setReviewForm({ rating: 5, title: '', comment: '' });
      fetchReviews();
    } catch (e) { toast.error(e.response?.data?.message || 'Error submitting review'); }
    finally { setSubmitting(false); }
  };

  const voteHelpful = async (reviewId, helpful) => {
    if (!user) { toast.error('Please login first'); return; }
    try {
      await api.patch(`/reviews/${reviewId}/vote`, { helpful });
      fetchReviews();
    } catch (e) { toast.error(e.response?.data?.message || 'Already voted'); }
  };

  if (!product) return <div className="pd-loading">Loading…</div>;

  const avgRating = reviews?.averageRating ?? 0;
  const breakdown = reviews?.ratingBreakdown ?? {};
  const totalReviews = reviews?.totalReviews ?? 0;
  const initials = str => (str ?? 'U').toString().trim().charAt(0).toUpperCase();

  return (
    <div className="pd-page">

      {/* Breadcrumb */}
      <nav className="pd-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/products">Products</Link>
        {product.category && <><span>›</span><Link to={`/products?category=${product.category}`}>{product.category}</Link></>}
        <span>›</span>
        <span style={{ color: '#444' }}>{product.name}</span>
      </nav>

      {/* Product hero */}
      <div className="pd-hero">

        {/* Gallery */}
        <div className="pd-gallery">
          <div className="pd-main-img">
            {product.image
              ? <img src={product.image} alt={product.name} />
              : <div className="pd-image-placeholder">🛍️</div>}
          </div>
          <div className="pd-thumbs">
            {[product.image, product.image, product.image].map((src, i) =>
              src
                ? <div key={i} className={`pd-thumb ${i === 0 ? 'active' : ''}`}><img src={src} alt="" /></div>
                : <div key={i} className={`pd-thumb ${i === 0 ? 'active' : ''}`} style={{ display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', background:'#f4f6f8' }}>🛍️</div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="pd-info">
          {product.category && <span className="pd-category">{product.category}</span>}
          <h1 className="pd-name">{product.name}</h1>
          <div className="pd-rating-row">
            <div className="pd-stars">{STARS(Math.round(avgRating))}</div>
            <span className="pd-avg">{avgRating.toFixed(1)}</span>
            <span className="pd-count">
              <a href="#reviews">({totalReviews} reviews)</a>
            </span>
          </div>
          <div className="pd-price">{(+product.price).toFixed(2)} €</div>
          <div className="pd-stock">
            {product.stock > 10
              ? <><span className="in-stock">✓ In Stock ({product.stock})</span><span className="pd-ships">· Ships in 2–3 days</span></>
              : product.stock > 0
                ? <><span className="low-stock">⚠ Low Stock ({product.stock} left)</span><span className="pd-ships">· Order soon!</span></>
                : <span className="out-stock">✗ Out of Stock</span>}
          </div>
          <p className="pd-desc">{product.description}</p>
          <hr className="pd-divider" />
          <div className="pd-actions">
            <div className="qty-row">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
            </div>
            <button className="btn-add-cart" onClick={addToCart} disabled={product.stock === 0}>
              🛒 Add to Cart
            </button>
            <button className={`btn-wishlist ${inWishlist ? 'active' : ''}`} onClick={toggleWishlist} title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
              {inWishlist ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="reviews-section" id="reviews">
        <h2>Customer Reviews</h2>

        {totalReviews > 0 && (
          <div className="reviews-summary">
            <div className="reviews-avg-big">
              <span className="avg-number">{avgRating.toFixed(1)}</span>
              <div className="avg-stars">{STARS(Math.round(avgRating))}</div>
              <span className="avg-total">{totalReviews} reviews</span>
            </div>
            <div className="rating-breakdown">
              {[5, 4, 3, 2, 1].map(star => {
                const count = breakdown[star] ?? 0;
                const pct = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
                return (
                  <div key={star} className="breakdown-row">
                    <span className="breakdown-label">{star}★</span>
                    <div className="breakdown-bar"><div className="breakdown-fill" style={{ width: pct + '%' }} /></div>
                    <span className="breakdown-count">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="review-cta">
          <p>* Only verified buyers can leave a review.</p>
          {user && (
            <button className="btn-write-review" onClick={() => setShowReviewForm(v => !v)}>
              ✏️ Write a Review
            </button>
          )}
        </div>

        {showReviewForm && (
          <div className="review-form-card">
            <h3>Your Review</h3>
            <div className="star-picker">
              {[1, 2, 3, 4, 5].map(s => (
                <span key={s} onClick={() => setReviewForm(p => ({ ...p, rating: s }))}
                  style={{ cursor: 'pointer', fontSize: '1.6rem', color: s <= reviewForm.rating ? '#ffc107' : '#ddd' }}>★</span>
              ))}
            </div>
            <input placeholder="Summary title…" value={reviewForm.title}
              onChange={e => setReviewForm(p => ({ ...p, title: e.target.value }))} className="review-input" />
            <textarea placeholder="Write your review (min 10 chars)…" rows={4}
              value={reviewForm.comment} onChange={e => setReviewForm(p => ({ ...p, comment: e.target.value }))}
              className="review-textarea" />
            <button className="btn-submit-review" onClick={submitReview} disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Review'}
            </button>
          </div>
        )}

        <div className="reviews-list">
          {(reviews?.reviews?.length ?? 0) === 0
            ? <p className="no-reviews">No reviews yet. Be the first!</p>
            : reviews.reviews.map(r => (
                <div key={r.id} className="review-item">
                  <div className="review-item-header">
                    <div className="reviewer-avatar">{initials(r.user?.firstName || r.userId)}</div>
                    <div>
                      <div className="reviewer-name">{r.user?.firstName ?? `User #${r.userId}`}</div>
                      <div className="review-stars-row">{STARS(r.rating)}</div>
                    </div>
                    {r.title && <span className="review-item-title">"{r.title}"</span>}
                    <span className="review-item-date">{new Date(r.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <p>{r.comment}</p>
                  <div className="review-helpful">
                    Helpful?
                    <button onClick={() => voteHelpful(r.id, true)}>👍 {r.helpfulVotes ?? 0}</button>
                    <button onClick={() => voteHelpful(r.id, false)}>👎 {r.notHelpfulVotes ?? 0}</button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
