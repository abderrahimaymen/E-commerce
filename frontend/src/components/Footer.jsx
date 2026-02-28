import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">Shop<span>.</span></Link>
            <p className="footer__desc">
              Your one-stop destination for premium products at unbeatable prices. Quality meets affordability.
            </p>
            <div className="footer__socials">
              <a href="#" aria-label="Facebook" className="footer__social">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="footer__social">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="footer__social">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="footer__social">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m22.54 6.42-.28-1.1A2.41 2.41 0 0 0 20.57 3.7C18.88 3 12 3 12 3s-6.88 0-8.57.7a2.41 2.41 0 0 0-1.69 1.62l-.28 1.1A25.53 25.53 0 0 0 1 12a25.53 25.53 0 0 0 .46 5.58l.28 1.1A2.41 2.41 0 0 0 3.43 20.3C5.12 21 12 21 12 21s6.88 0 8.57-.7a2.41 2.41 0 0 0 1.69-1.62l.28-1.1A25.53 25.53 0 0 0 23 12a25.53 25.53 0 0 0-.46-5.58z"/><path d="m9.75 15.02 5.75-3.27-5.75-3.27z"/></svg>
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div className="footer__links">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products">Deals & Offers</Link></li>
              <li><Link to="/products">Categories</Link></li>
              <li><Link to="/products">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="footer__links">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for exclusive deals.</p>
            <form className="footer__form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} Shop. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
