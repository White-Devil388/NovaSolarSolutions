import React from 'react';
import { Link } from 'react-router-dom';

function PageBanner({ title, subtitle, imagePath = "/images/green_solar_field_1791612498444.png", breadcrumb }) {
  return (
    <section style={{ 
      position: 'relative', 
      minHeight: '320px', 
      marginTop: '-80px', 
      paddingTop: '80px',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      overflow: 'hidden'
    }}>
      <img 
        src={imagePath} 
        alt={title} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          zIndex: 0 
        }} 
      />
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        background: 'linear-gradient(180deg, rgba(14, 138, 155, 0.3) 0%, rgba(11,31,75,0.7) 100%)', 
        zIndex: 1 
      }}></div>
      
      <div style={{ padding: '0 2rem', zIndex: 2, position: 'relative', maxWidth: '800px', animation: 'fadeInUp 0.8s ease-out' }}>
        {breadcrumb && (
          <div style={{ color: 'var(--sky-200)', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Link to="/" style={{ color: 'var(--sky-200)', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 0.5rem' }}>/</span> {breadcrumb}
          </div>
        )}
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: '1.2rem', color: 'var(--sky-100)', margin: 0 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageBanner;
