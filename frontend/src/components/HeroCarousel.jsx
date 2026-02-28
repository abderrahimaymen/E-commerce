import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './HeroCarousel.css';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    subtitle: 'Summer Collection',
    title: 'New Arrivals 2026',
    desc: 'Discover the latest trends in fashion and electronics.',
    cta: 'Shop Now',
    link: '/products?category=Fashion',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    subtitle: 'Step Up Your Game',
    title: 'Premium Sneakers',
    desc: 'Get up to 40% off on all sports brands this week.',
    cta: 'View Deals',
    link: '/products?category=Sports',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    subtitle: 'Smart Tech',
    title: 'Digital Revolution',
    desc: 'Upgrade your workspace with our latest gadgets.',
    cta: 'Shop Tech',
    link: '/products?category=Electronics',
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="hero">
      {slides.map((slide, i) => (
        <div key={slide.id} className={`hero__slide ${i === current ? 'hero__slide--active' : ''}`}
             style={{ backgroundImage: `url(${slide.image})` }}>
          <div className="hero__overlay" />
          <div className="hero__content container">
            <span className="hero__tag">{slide.subtitle}</span>
            <h1 className="hero__title">{slide.title}</h1>
            <p className="hero__desc">{slide.desc}</p>
            <Link to={slide.link} className="hero__cta">
              {slide.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      ))}

      <button className="hero__arrow hero__arrow--prev" onClick={prev} aria-label="Previous">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button className="hero__arrow hero__arrow--next" onClick={next} aria-label="Next">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <div className="hero__dots">
        {slides.map((_, i) => (
          <button key={i}
            className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
