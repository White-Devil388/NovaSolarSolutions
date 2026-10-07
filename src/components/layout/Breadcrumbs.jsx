import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Do not show breadcrumbs on the home page
  if (pathnames.length === 0) return null;

  return (
    <div className="page-padding" style={{ paddingBottom: '0', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <nav aria-label="breadcrumb">
        <ol style={{ 
          display: 'flex', 
          listStyle: 'none', 
          padding: 0, 
          margin: 0, 
          gap: '0.8rem', 
          color: 'var(--text-muted)', 
          fontSize: '0.95rem',
          fontFamily: 'Outfit, sans-serif'
        }}>
          <li>
            <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            
            // Format text (e.g. "product-detail" -> "Product Detail")
            const formattedValue = value
              .replace(/-/g, ' ')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            
            return (
              <React.Fragment key={to}>
                <li style={{ opacity: 0.5 }}>/</li>
                <li>
                  {isLast ? (
                    <span style={{ color: 'white', fontWeight: 'bold' }}>{formattedValue}</span>
                  ) : (
                    <Link to={to} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>{formattedValue}</Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
