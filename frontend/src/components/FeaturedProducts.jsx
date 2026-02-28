import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from './ProductCard';
import './FeaturedProducts.css';

export default function FeaturedProducts({ title = 'New Arrivals', sortBy = 'newest', limit = 8, products: initialProducts }) {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await api.get(`/products?limit=${limit}&sortBy=${sortBy}`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error('Error fetching featured products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit, sortBy, initialProducts]);

  if (loading) return <div className='text-center py-5'>Loading...</div>;

  return (
    <section className='featured-section'>
      <div className='container'>
        <div className='section-header'>
          <h2 className='section-title'>{title}</h2>
          <Link to='/products' className='view-all-btn'>View All Products →</Link>
        </div>
        
        <div className='products-grid'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
