import React from 'react';

/**
 * Primitive Skeleton component with animated wave shimmer
 */
export function Skeleton({ 
  variant = 'text', 
  width, 
  height, 
  borderRadius, 
  style = {}, 
  className = '' 
}) {
  const getDefaultStyles = () => {
    switch (variant) {
      case 'circle':
        return {
          width: width || '44px',
          height: height || width || '44px',
          borderRadius: '50%'
        };
      case 'rect':
        return {
          width: width || '100%',
          height: height || '120px',
          borderRadius: borderRadius || '8px'
        };
      case 'card':
        return {
          width: width || '100%',
          height: height || '220px',
          borderRadius: borderRadius || '16px'
        };
      case 'text':
      default:
        return {
          width: width || '100%',
          height: height || '16px',
          borderRadius: borderRadius || '4px'
        };
    }
  };

  return (
    <div 
      className={`skeleton-shimmer ${className}`}
      style={{
        ...getDefaultStyles(),
        ...style
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Universal Page Skeleton with banner and content placeholders
 */
export function PageSkeleton() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--sky-100)', boxSizing: 'border-box' }}>
      {/* Banner Skeleton */}
      <div style={{ 
        width: '100%', 
        height: '320px', 
        background: 'linear-gradient(180deg, rgba(14, 138, 155, 0.25) 0%, rgba(11, 31, 75, 0.4) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        <Skeleton width="140px" height="18px" style={{ marginBottom: '1.2rem', opacity: 0.7 }} />
        <Skeleton width="min(450px, 85%)" height="42px" borderRadius="10px" style={{ marginBottom: '1rem' }} />
        <Skeleton width="min(300px, 70%)" height="20px" style={{ opacity: 0.8 }} />
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem clamp(1rem, 4vw, 5%)', boxSizing: 'border-box' }}>
        {/* Filter Pills Skeleton */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} width="110px" height="38px" borderRadius="20px" />
          ))}
        </div>

        {/* 6 Grid Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Skeleton variant="rect" height="180px" borderRadius="12px" />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Skeleton width="70px" height="22px" borderRadius="12px" />
                <Skeleton width="50px" height="22px" borderRadius="12px" />
              </div>
              <Skeleton width="85%" height="24px" borderRadius="6px" />
              <Skeleton width="100%" height="14px" />
              <Skeleton width="90%" height="14px" />
              <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton width="80px" height="20px" />
                <Skeleton width="100px" height="36px" borderRadius="8px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Grid Skeleton for Products, Solutions, Projects, Blogs, and Gallery
 */
export function CardGridSkeleton({ count = 6, height = "180px" }) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '2rem',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Skeleton variant="rect" height={height} borderRadius="12px" />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Skeleton width="70px" height="22px" borderRadius="12px" />
          </div>
          <Skeleton width="80%" height="22px" borderRadius="6px" />
          <Skeleton width="100%" height="14px" />
          <Skeleton width="70%" height="14px" />
          <div style={{ marginTop: 'auto', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton width="90px" height="28px" borderRadius="6px" />
            <Skeleton width="90px" height="28px" borderRadius="6px" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Responsive Table Skeleton for CRM, Quotations, Attendance, etc.
 */
export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--sky-200)', overflow: 'hidden', padding: '1.5rem', width: '100%', boxSizing: 'border-box' }}>
      {/* Table Header Placeholder */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
        <Skeleton width="180px" height="24px" borderRadius="6px" />
        <Skeleton width="110px" height="34px" borderRadius="8px" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Table column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '1rem', paddingBottom: '0.8rem', borderBottom: '2px solid var(--sky-200)' }}>
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} height="18px" borderRadius="4px" />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '1rem', padding: '0.8rem 0', borderBottom: '1px solid var(--sky-100)' }}>
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} height="20px" width={c === 0 ? "50%" : c === 1 ? "80%" : "70%"} borderRadius="4px" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Admin Dashboard Skeleton with stat cards and content placeholder
 */
export function AdminDashboardSkeleton() {
  return (
    <div className="admin-dash-container" style={{ width: '100%', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar Placeholder */}
      <div className="admin-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Skeleton variant="circle" width="40px" height="40px" />
          <Skeleton width="120px" height="24px" borderRadius="6px" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '2rem' }}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} height="42px" borderRadius="8px" style={{ opacity: 0.3 }} />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="admin-main" style={{ flex: 1, padding: 'clamp(1.5rem, 3vw, 3rem)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <Skeleton width="260px" height="36px" borderRadius="8px" />
          <Skeleton width="140px" height="36px" borderRadius="20px" />
        </div>

        {/* 4 Stat Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '2.5rem' 
        }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-card" style={{ height: '170px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton width="110px" height="18px" />
                <Skeleton variant="circle" width="45px" height="45px" />
              </div>
              <Skeleton width="100px" height="38px" borderRadius="8px" />
              <Skeleton width="130px" height="16px" />
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <TableSkeleton rows={4} cols={5} />
      </div>
    </div>
  );
}

export default Skeleton;
