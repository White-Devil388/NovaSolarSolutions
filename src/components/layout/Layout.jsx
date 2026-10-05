import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Zap, Package, ImageIcon, Info, BookOpen, Phone, Menu, X } from 'lucide-react';
import GooeyNav from './GooeyNav';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: "Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Resources", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="navbar">
        <Link to="/" className="nav-brand" style={{textDecoration: 'none'}}>
          Nova<span>Solar</span>
        </Link>
        
        <div className="nav-links">
          <GooeyNav items={navItems} />
        </div>

        <div className="nav-actions" style={{ display: 'flex', gap: '1rem' }}>
          <Link to="#" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', margin: 0 }}>Customer Portal</Link>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <div className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} style={{ cursor: 'pointer', zIndex: 999, position: 'relative' }} /> : <Menu size={28} style={{ cursor: 'pointer' }} />}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(2, 6, 23, 0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          padding: '2rem'
        }}>
          {navItems.map((item, index) => (
            <Link key={index} to={item.href} style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-light)',
              textDecoration: 'none',
              letterSpacing: '1px'
            }}>
              {item.label}
            </Link>
          ))}
          <Link to="#" className="btn btn-primary" style={{ marginTop: '2rem', width: '80%' }}>Customer Portal</Link>
        </div>
      )}

      <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
        <Outlet />
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <h2>Nova<span>Solar</span></h2>
            <p>Pioneering the sustainable energy revolution for modern homes and businesses.</p>
          </div>
          <div className="footer-links">
            <h4>Products</h4>
            <ul>
              <li><Link to="/products/panels">Residential Panels</Link></li>
              <li><Link to="/solutions/commercial">Commercial Solar</Link></li>
              <li><Link to="/products/batteries">Power Storage</Link></li>
              <li><Link to="/products/inverters">Smart Inverters</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} NovaSolar Energy Systems. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Layout;
