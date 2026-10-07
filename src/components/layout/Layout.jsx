import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Zap, Package, ImageIcon, Info, BookOpen, Phone, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import GooeyNav from './GooeyNav';
import BlurText from '../ui/BlurText';
import Breadcrumbs from './Breadcrumbs';

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
    { label: "Resources", href: "#", subItems: [
      { label: "Solar Calculator", href: "/calculator" },
      { label: "Blogs", href: "/blog" }
    ]},
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
          <Link to="/portal" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', margin: 0 }}>Employee Portal</Link>
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
            <React.Fragment key={index}>
              {item.subItems ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-light)', letterSpacing: '1px', marginBottom: '1rem', opacity: 0.7 }}>
                    {item.label}
                  </div>
                  {item.subItems.map((sub, i) => (
                    <Link key={i} to={sub.href} style={{
                      display: 'block', fontSize: '1.2rem', fontWeight: '500', color: 'var(--primary)', textDecoration: 'none', marginBottom: '0.8rem'
                    }} onClick={() => setIsMobileMenuOpen(false)}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link to={item.href} style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--text-light)',
                  textDecoration: 'none',
                  letterSpacing: '1px'
                }} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
          <Link to="/portal" className="btn btn-primary" style={{ marginTop: '2rem', width: '80%' }} onClick={() => setIsMobileMenuOpen(false)}>Employee Portal</Link>
        </div>
      )}

      <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
        <Breadcrumbs />
        <Outlet />
      </main>

      <motion.footer 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="footer-content">
          <div className="footer-brand">
            <h2>Nova<span style={{ color: "var(--primary)" }}>Solar</span></h2>
            <p>
              <BlurText text="Pioneering the sustainable energy revolution for modern homes and businesses." delay={0.03} />
            </p>
          </div>
          
          <div className="footer-links">
            <motion.h4 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <BlurText text="Products" stagger="char" delay={0.05} />
            </motion.h4>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
            >
              {[
                { name: "Residential Panels", path: "/products/panels" },
                { name: "Commercial Solar", path: "/solutions/commercial" },
                { name: "Power Storage", path: "/products/batteries" },
                { name: "Smart Inverters", path: "/products/inverters" }
              ].map((link, i) => (
                <motion.li key={i} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                  <Link to={link.path}>{link.name}</Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="footer-links">
            <motion.h4 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <BlurText text="Company" stagger="char" delay={0.05} />
            </motion.h4>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } }}
            >
              {[
                { name: "About Us", path: "/about" },
                { name: "Projects", path: "/projects" },
                { name: "FAQ", path: "/faq" },
                { name: "Contact", path: "/contact" }
              ].map((link, i) => (
                <motion.li key={i} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                  <Link to={link.path}>{link.name}</Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="footer-links">
            <motion.h4 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <BlurText text="Contact Info" stagger="char" delay={0.05} />
            </motion.h4>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
            >
              <motion.li variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <span>📍</span> 123 Solar Blvd, Eco Valley 90210
              </motion.li>
              <motion.li variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span>📞</span> +1 (800) 555-0199
              </motion.li>
              <motion.li variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span>✉️</span> hello@novasolar.com
              </motion.li>
            </motion.ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} NovaSolar Energy Systems. All rights reserved.
        </div>
      </motion.footer>
    </>
  );
}

export default Layout;
