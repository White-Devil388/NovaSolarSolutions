import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Zap, Package, ImageIcon, Info, BookOpen, Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GooeyNav from './GooeyNav';
import BlurText from '../reactbits/BlurText';
import Breadcrumbs from './Breadcrumbs';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: "Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Resources", href: "#", subItems: [
      { label: "Solar Calculator", href: "/calculator" },
      { label: "Blogs", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Team Members", href: "/team" },
      { label: "Certifications", href: "/certifications" }
    ]},
    { label: "Contact", href: "/contact" },
  ];

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect for navbar
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-brand" style={{textDecoration: 'none'}}>
          Nova<span>Solar</span>
        </Link>
        
        <div className="nav-links">
          <GooeyNav items={navItems} />
        </div>

        <div className="nav-actions" style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/portal" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem', margin: 0 }}>Employee Portal</Link>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <div 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(11, 31, 75, 0.98)',
              backdropFilter: 'blur(16px)',
              zIndex: 998,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflowY: 'auto',
              padding: '6rem 1.5rem 3rem 1.5rem',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
              {navItems.map((item, index) => (
                <div key={index} style={{ width: '100%', textAlign: 'center' }}>
                  {item.subItems ? (
                    <div>
                      <div 
                        style={{ fontSize: '1.3rem', fontWeight: '600', color: 'var(--white)', letterSpacing: '0.5px', marginBottom: '0.8rem', opacity: 0.9 }}
                      >
                        {item.label}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: '0.5rem 0', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                        {item.subItems.map((sub, i) => (
                          <Link 
                            key={i} 
                            to={sub.href} 
                            style={{
                              fontSize: '1.05rem', 
                              fontWeight: '500', 
                              color: 'var(--sky-200)', 
                              textDecoration: 'none', 
                              padding: '0.4rem 0'
                            }} 
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      to={item.href} 
                      style={{
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        color: 'var(--white)',
                        textDecoration: 'none',
                        display: 'block',
                        padding: '0.5rem 0'
                      }} 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link 
                to="/portal" 
                className="btn btn-primary" 
                style={{ marginTop: '1rem', width: '100%', padding: '0.85rem', textAlign: 'center' }} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Employee Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ minHeight: '80vh', paddingTop: '80px', width: '100%', overflowX: 'hidden' }}>
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
