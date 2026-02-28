import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import CategoryGrid from '../components/CategoryGrid';
import DealsSection from '../components/DealsSection';
import FeaturedProducts from '../components/FeaturedProducts';
import TrustSignals from '../components/TrustSignals';
import useStore from '../store/useStore';
import './Home.css';

export default function Home() {
  const fetchCart = useStore((state) => state.fetchCart);
  
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className='home-page'>
      <HeroCarousel />

      {/* Overlapping category strip */}
      <div className='home__categories-wrap'>
        <CategoryGrid />
      </div>

      <section className='home__section'>
        <DealsSection />
      </section>

      <section className='home__section home__section--alt'>
        <FeaturedProducts title='New Arrivals' sortBy='created_at' limit={8} />
      </section>

      {/* Promo banner */}
      <section className='home__section'>
        <div className='container'>
          <div className='home__promo'>
            <div className='home__promo-bg'></div>
            <div className='home__promo-body'>
              <span className='home__promo-tag'>Limited Offer</span>
              <h2 className='home__promo-title'>Summer Collection 2025</h2>
              <p className='home__promo-text'>Up to 50% off on selected items. Don't miss out!</p>
              <Link to='/products' className='btn btn-primary home__promo-btn'>
                Shop Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
            <div className='home__promo-visual'>
              <img src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=480&h=360&fit=crop' alt='Summer Sale' />
            </div>
          </div>
        </div>
      </section>

      <section className='home__section home__section--alt'>
        <FeaturedProducts title='Best Sellers' sortBy='rating' limit={4} />
      </section>

      <TrustSignals />
    </div>
  );
}
