import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './DealsSection.css';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 10, m: 45, s: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="deals__countdown">
      <div className="deals__time-box"><span>{String(timeLeft.h).padStart(2, '0')}</span><small>Hrs</small></div>
      <span className="deals__colon">:</span>
      <div className="deals__time-box"><span>{String(timeLeft.m).padStart(2, '0')}</span><small>Min</small></div>
      <span className="deals__colon">:</span>
      <div className="deals__time-box"><span>{String(timeLeft.s).padStart(2, '0')}</span><small>Sec</small></div>
    </div>
  );
};

export default function DealsSection() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    api.get('/products?limit=4&sortBy=price_asc').then(res => {
      setDeals(res.data.products || []);
    });
  }, []);

  if (!deals.length) return null;

  return (
    <section className="deals">
      <div className="container">
        <div className="deals__header">
          <div className="deals__title-group">
            <h2 className="section-title" style={{ left: 0, transform: 'none', textAlign: 'left' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary,#6366f1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: 8}}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              Deals of the Day
            </h2>
            <CountdownTimer />
          </div>
          <Link to="/products" className="deals__view-all">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="deals__grid">
          {deals.map(deal => {
            const stock = deal.stockQuantity ?? deal.stock ?? 0;
            const pct = Math.min(Math.max((stock / 50) * 100, 15), 85);
            return (
              <Link to={`/products/${deal.id}`} key={deal.id} className="deal">
                <span className="deal__badge">-40%</span>
                <div className="deal__img">
                  <img src={deal.image || 'https://placehold.co/300x300?text=Product'} alt={deal.name} loading="lazy" />
                </div>
                <div className="deal__body">
                  <h3 className="deal__name">{deal.name}</h3>
                  <div className="deal__prices">
                    <span className="deal__old">${(Number(deal.price) * 1.4).toFixed(2)}</span>
                    <span className="deal__new">${Number(deal.price).toFixed(2)}</span>
                  </div>
                  <div className="deal__stock-bar">
                    <div className="deal__stock-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="deal__stock-text">Available: {stock}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
