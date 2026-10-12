import React from 'react';
import { Link } from 'react-router-dom';

function PageBanner({ title, subtitle, imagePath = "/images/green_solar_field_1791612498444.png", breadcrumb }) {
  return (
    <section className="page-banner">
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
      
      <div className="page-banner-content">
        {breadcrumb && (
          <div className="page-banner-breadcrumb">
            <Link to="/" style={{ color: 'var(--sky-200)', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 0.5rem' }}>/</span> {breadcrumb}
          </div>
        )}
        <h1 className="page-banner-title">{title}</h1>
        {subtitle && (
          <p className="page-banner-subtitle">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageBanner;
