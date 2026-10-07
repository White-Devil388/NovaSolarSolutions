import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/ui/TiltCard';
import useLocalStorageData from '../hooks/useLocalStorageData';
import usePagination from '../hooks/usePagination';

const INITIAL_BLOGS = [
  {
    id: 1,
    title: 'How Many Solar Panels Do You Need?',
    author: 'Tech Guides • 5 min read',
    content: 'A comprehensive guide to calculating your home energy requirements and sizing your solar array perfectly.',
    image: '/images/roof_3d.png',
    status: 'Published'
  },
  {
    id: 2,
    title: 'Monocrystalline vs Polycrystalline',
    author: 'Analysis • 4 min read',
    content: 'Which technology is right for you? We break down the cost, efficiency, and aesthetics of both options.',
    image: '/images/tech_flow.png',
    status: 'Published'
  },
  {
    id: 3,
    title: 'New Solar Incentives for 2025',
    author: 'Industry News • 3 min read',
    content: 'Discover the latest tax credits and local rebates that can significantly reduce your installation costs.',
    image: '/images/smart_monitor.png',
    status: 'Published'
  }
];

function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Tech Guides', 'Case Studies', 'Industry News'];
  
  const fetchedBlogs = useLocalStorageData('Blogs');

  // Memoize filtering
  const activeBlogs = useMemo(() => {
    const defaultData = fetchedBlogs.length > 0 ? fetchedBlogs : INITIAL_BLOGS;
    if (activeFilter === 'All') return defaultData;
    return defaultData.filter(blog => blog.author?.includes(activeFilter) || blog.title?.includes(activeFilter));
  }, [fetchedBlogs, activeFilter]);

  // Pagination Hook
  const { currentData, currentPage, totalPages, nextPage, prevPage, goToPage } = usePagination(activeBlogs, 3); // 3 per page to showcase pagination with small dataset

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Hero Banner */}
      <div style={{ height: '60vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.3) 0%, rgba(2, 6, 23, 1) 100%), url(/images/weather_resist.png)', backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center', padding: '0 5%' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#fff', textShadow: '0 10px 30px rgba(0,0,0,0.9)', margin: 0, fontWeight: '800' }}>
          Knowledge & <span style={{ color: 'var(--primary)' }}>Innovations</span>
        </h1>
      </div>

      {/* Glassmorphic Category Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', padding: '2rem 5%', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{ 
              padding: '0.8rem 1.5rem', 
              borderRadius: '30px', 
              border: activeFilter === f ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
              background: activeFilter === f ? 'transparent' : 'rgba(15, 23, 42, 0.7)',
              color: activeFilter === f ? 'var(--primary)' : 'white',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: 'bold'
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Featured Resource (Highlight Block) */}
      <div style={{ padding: '2rem 5% 4rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <div style={{ flex: '1 1 min(400px, 100%)', height: '400px', backgroundImage: 'url(/images/solar_panel.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div style={{ flex: '1 1 min(400px, 100%)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'var(--primary)', color: '#020617', fontWeight: 'bold', borderRadius: '4px', width: 'max-content', marginBottom: '1.5rem' }}>FEATURED CASE STUDY</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '0 0 1rem 0', color: 'white' }}>The Future of High-Efficiency Panels</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Dive deep into the latest advancements in monocrystalline technology. Our exclusive case study outlines how next-generation materials are shattering previous efficiency boundaries in real-world Indian climates.
            </p>
            <Link to="#" style={{ color: 'var(--primary)', fontWeight: 'bold', borderBottom: '1px solid var(--primary)', width: 'max-content', paddingBottom: '0.2rem' }}>Read Full Study →</Link>
          </div>
        </div>
      </div>

      {/* Dynamic Article Grid */}
      <div className="features-grid" style={{ padding: '0 5%' }}>
        {currentData.map(blog => (
          <TiltCard key={blog.id} style={{ width: '100%', height: '100%' }}>
            <div className="feature-card" style={{ backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.1) 0%, rgba(2, 6, 23, 0.9) 100%), url(${blog.image || '/images/roof_3d.png'})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem', width: '100%', height: '100%', borderRadius: '20px' }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>{blog.author}</p>
                <h3 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{blog.title}</h3>
                <Link to="#" style={{ color: '#e2e8f0', textDecoration: 'underline' }}>Read Article</Link>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem', padding: '0 5%' }}>
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: currentPage === 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)', color: 'white', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            ← Prev
          </button>
          
          <span style={{ color: '#94a3b8' }}>
            Page <strong style={{ color: 'white' }}>{currentPage}</strong> of {totalPages}
          </span>
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: currentPage === totalPages ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)', color: 'white', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default Blog;
