import React, { useState } from 'react';
import useStore from '../store/useStore';
import apiClient from '../services/api';
import toast from 'react-hot-toast';
import './ProductReviews.css';

export default function ProductReviews({ productId, reviews = [], onReviewAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const user = useStore(state => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login nicely first');
      return;
    }
    try {
      await apiClient.post('/reviews', { productId, rating, comment });
      toast.success('Review submitted!');
      setShowForm(false);
      setComment('');
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    } catch {
      toast.error('Failed to submit review');
    }
  };

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h3>Customer Reviews ({reviews.length})</h3>
        <button className="btn btn-outline" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel Review' : 'Write a Review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label>Rating</label>
            <div className="star-input">
              {[1, 2, 3, 4, 5].map(r => (
                <span 
                  key={r} 
                  className={r <= rating ? 'star filled' : 'star'}
                  onClick={() => setRating(r)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Review</label>
            <textarea 
              rows="4" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review, idx) => (
            <div key={review.id || idx} className="review-item">
              <div className="review-header">
                <span className="reviewer-name">{review.user?.name || 'Anonymous'}</span>
                <span className="review-date">{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
              <div className="review-rating">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
