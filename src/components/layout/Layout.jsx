import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Zap, Package, ImageIcon, Info, BookOpen, Phone, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GooeyNav from './GooeyNav';
import BlurText from '../reactbits/BlurText';
import Breadcrumbs from './Breadcrumbs';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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

  // Close mobile menu and dropdown on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
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
              padding: '1.2rem 1.5rem 3rem 1.5rem',
              boxSizing: 'border-box'
            }}
          >
            {/* Top Bar with Brand & Close (Cross) */}
            <div style={{
              width: '100%',
              maxWidth: '420px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.8rem',
              paddingBottom: '0.8rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Link 
                to="/" 
                className="nav-brand" 
                style={{ textDecoration: 'none', fontSize: '1.35rem' }} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nova<span>Solar</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--white)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', width: '100%', maxWidth: '400px' }}>
              {navItems.map((item, index) => {
                const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
                const isDropdownOpen = openDropdown === item.label;

                return (
                  <div key={index} style={{ width: '100%', textAlign: 'center' }}>
                    {hasSubItems ? (
                      <div style={{ width: '100%' }}>
                        <button 
                          type="button"
                          onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
                          style={{ 
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontSize: '1.25rem', 
                            fontWeight: '600', 
                            color: isDropdownOpen ? 'var(--teal-400)' : 'var(--white)', 
                            background: isDropdownOpen ? 'rgba(255,255,255,0.06)' : 'transparent',
                            border: '1px solid ' + (isDropdownOpen ? 'rgba(20, 163, 168, 0.3)' : 'transparent'),
                            borderRadius: '12px',
                            padding: '0.65rem 1rem',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 0.25s ease'
                          }}
                        >
                          <span>{item.label}</span>
                          <ChevronDown 
                            size={18} 
                            style={{ 
                              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              color: isDropdownOpen ? 'var(--teal-400)' : 'var(--sky-200)'
                            }} 
                          />
                        </button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '0.4rem', 
                                padding: '0.75rem 0.5rem', 
                                marginTop: '0.4rem',
                                background: 'rgba(255,255,255,0.05)', 
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '14px' 
                              }}>
                                {item.subItems.map((sub, i) => (
                                  <Link 
                                    key={i} 
                                    to={sub.href} 
                                    style={{
                                      fontSize: '1rem', 
                                      fontWeight: '500', 
                                      color: 'var(--sky-200)', 
                                      textDecoration: 'none', 
                                      padding: '0.5rem 1rem',
                                      borderRadius: '8px',
                                      transition: 'background 0.2s, color 0.2s'
                                    }} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link 
                        to={item.href} 
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: 'var(--white)',
                          textDecoration: 'none',
                          display: 'block',
                          padding: '0.65rem 1rem',
                          borderRadius: '12px',
                          transition: 'background 0.2s'
                        }} 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
              <Link 
                to="/portal" 
                className="btn btn-primary" 
                style={{ marginTop: '0.5rem', width: '100%', padding: '0.85rem', textAlign: 'center' }} 
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
