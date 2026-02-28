import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../services/api';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import ProductReviews from '../components/ProductReviews';
import FeaturedProducts from '../components/FeaturedProducts';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Parallel fetch
      const [productRes, reviewsRes] = await Promise.all([
        apiClient.get(`/products/${id}`),
        apiClient.get(`/reviews/product/${id}`).catch(() => ({ data: [] }))
      ]);

      const productData = productRes.data;
      setProduct(productData);
      setReviews(Array.isArray(reviewsRes.data) ? reviewsRes.data : []);

      // Fetch related products
      if (productData.category) {
        try {
          const relatedRes = await apiClient.get(`/products?category=${productData.category}&limit=4`);
          const related = relatedRes.data.products || [];
          setRelatedProducts(related.filter(p => p.id !== productData.id));
        } catch (e) {
          console.error('Related fetch error', e);
        }
      }
    } catch (err) {
      console.error('Error fetching product details', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className='loading-spinner'>Loading product...</div>;
  if (!product) return <div className='not-found'>Product not found</div>;

  return (
    <div className='product-details-page container'>
      <div className='breadcrumb'>
        <Link to='/'>Home</Link> / <Link to='/products'>Products</Link> / <span>{product.name}</span>
      </div>

      <div className='product-layout-main'>
        <div className='gallery-section'>
          <ProductGallery images={[product.image]} />
        </div>
        <div className='info-section'>
          <ProductInfo product={product} />
        </div>
      </div>

      <div className='product-tabs-section'>
        <div className='tabs-header'>
          <button 
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
             className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
             onClick={() => setActiveTab('reviews')}
          >
            Reviews ({reviews.length})
          </button>
          <button 
             className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
             onClick={() => setActiveTab('shipping')}
          >
            Shipping & Returns
          </button>
        </div>

        <div className='tab-content'>
          {activeTab === 'description' && (
            <div className='description-content'>
              <h3>Product Description</h3>
              <p>{product.description}</p>
              {/* Additional dummy content */}
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <ProductReviews productId={product.id} reviews={reviews} onReviewAdded={fetchData} />
          )}

          {activeTab === 'shipping' && (
            <div className='shipping-content'>
              <h3>Shipping Information</h3>
              <p>We offer free standard shipping on all orders over . Standard shipping takes 3-5 business days. Express shipping options are available at checkout.</p>
              <h3>Returns Policy</h3>
              <p>You can return any item within 30 days of purchase if you are not satisfied. Please ensure the item is in its original condition.</p>
            </div>
          )}
        </div>
      </div>

      <div className='related-products-section'>
        <h2 className='section-title'>You May Also Like</h2>
        <FeaturedProducts title='' products={relatedProducts} limit={4} />
      </div>
    </div>
  );
}
