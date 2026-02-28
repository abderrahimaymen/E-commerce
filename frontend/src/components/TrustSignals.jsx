import React from 'react';
import './TrustSignals.css';

export default function TrustSignals() {
  const signals = [
    { icon: '🚚', title: 'Free Shipping', desc: 'On all orders over $50' },
    { icon: '🛡️', title: 'Secure Payment', desc: '100% secure checkout' },
    { icon: '↩️', title: 'Easy Returns', desc: '30-day money back guarantee' },
    { icon: '💬', title: '24/7 Support', desc: 'Dedicated support team' },
  ];

  return (
    <section className="trust-section">
      <div className="container trust-grid">
        {signals.map((s, i) => (
          <div key={i} className="trust-card">
            <span className="trust-icon">{s.icon}</span>
            <div>
              <h3 className="trust-title">{s.title}</h3>
              <p className="trust-desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
