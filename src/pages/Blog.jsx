import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/reactbits/LegacyTiltCard';
import useLocalStorageData from '../hooks/useLocalStorageData';
import usePagination from '../hooks/usePagination';
import PageBanner from '../components/ui/PageBanner';
import { CardGridSkeleton } from '../components/ui/Skeleton';

const INITIAL_BLOGS = [
  {
    id: 1,
    title: 'How Many Solar Panels Do You Need?',
    author: 'Tech Guides • 5 min read',
    content: 'A comprehensive guide to calculating your home energy requirements and sizing your solar array perfectly.',
    image: '/images/light_eco_city_1791612526207.png',
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
  const [isFiltering, setIsFiltering] = useState(false);
  const filters = ['All', 'Tech Guides', 'Case Studies', 'Industry News'];
  
  const fetchedBlogs = useLocalStorageData('Blogs');

  const handleFilterClick = (f) => {
    if (f === activeFilter) return;
    setIsFiltering(true);
    setActiveFilter(f);
    setTimeout(() => {
      setIsFiltering(false);
    }, 350);
  };

  // Memoize filtering
  const activeBlogs = useMemo(() => {
    const defaultData = fetchedBlogs.length > 0 ? fetchedBlogs : INITIAL_BLOGS;
    if (activeFilter === 'All') return defaultData;
    return defaultData.filter(blog => blog.author?.includes(activeFilter) || blog.title?.includes(activeFilter));
  }, [fetchedBlogs, activeFilter]);

  // Pagination Hook
  const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(activeBlogs, 3);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Hero Banner */}
      <PageBanner 
        title="Knowledge & Innovations" 
        subtitle="Stay updated with the latest in solar technology, news, and our success stories."
        imagePath="/images/green_windmills_1791612510771.png"
        breadcrumb="Blog"
      />

      {/* Glassmorphic Category Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', padding: '3rem 5% 1rem', background: 'transparent' }}>
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => handleFilterClick(f)}
            style={{ 
              padding: '0.8rem 1.5rem', 
              borderRadius: '30px', 
              border: activeFilter === f ? '1px solid var(--teal-600)' : '1px solid rgba(18,48,107,0.1)',
              background: activeFilter === f ? 'var(--teal-600)' : 'white',
              color: activeFilter === f ? 'white' : 'var(--text-muted)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600'
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Featured Resource (Highlight Block) */}
      <div style={{ padding: '2rem 5% 4rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', background: 'var(--white)', borderRadius: '24px', border: '1px solid rgba(18,48,107,0.05)', boxShadow: '0 10px 40px rgba(18,48,107,0.08)', overflow: 'hidden' }}>
          <div style={{ flex: '1 1 min(400px, 100%)', minHeight: '350px', backgroundImage: 'url(/images/green_solar_panels_1791614319680.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div style={{ flex: '1 1 min(400px, 100%)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'var(--sky-100)', color: 'var(--teal-600)', fontWeight: 'bold', borderRadius: '4px', width: 'max-content', marginBottom: '1.5rem', fontSize: '0.85rem' }}>FEATURED CASE STUDY</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '0 0 1rem 0', color: 'var(--navy-900)', fontWeight: '800' }}>The Future of High-Efficiency Panels</h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Dive deep into the latest advancements in monocrystalline technology. Our exclusive case study outlines how next-generation materials are shattering previous efficiency boundaries in real-world climates.
            </p>
            <Link to="/blog/featured" style={{ color: 'var(--blue-600)', fontWeight: '700', borderBottom: '2px solid var(--blue-600)', width: 'max-content', paddingBottom: '0.2rem', textDecoration: 'none' }}>Read Full Study &rarr;</Link>
          </div>
        </div>
      </div>

      {/* Dynamic Article Grid */}
      <div style={{ padding: '0 5%' }}>
        {isFiltering ? (
          <CardGridSkeleton count={3} height="220px" />
        ) : (
          <div className="features-grid" style={{ padding: 0 }}>
        {currentData.map(blog => {
          let imageUrl = blog.image || '/images/light_eco_city_1791612526207.png';
          if (blog.id === 1) imageUrl = '/images/blog_tech_guides.png';
          if (blog.id === 2) imageUrl = '/images/blog_analysis.png';
          if (blog.id === 3) imageUrl = '/images/blog_news.png';

          return (
            <TiltCard key={blog.id} style={{ width: '100%', height: '100%' }}>
              <div className="feature-card" style={{ background: 'var(--white)', padding: 0, overflow: 'hidden', height: '100%', borderRadius: '20px', border: '1px solid rgba(18,48,107,0.05)', boxShadow: '0 10px 30px rgba(18,48,107,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '220px', backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ color: 'var(--teal-600)', fontWeight: '700', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase' }}>{blog.author}</p>
                  <h3 style={{ fontSize: '1.4rem', margin: '0 0 1rem 0', color: 'var(--navy-900)', fontWeight: '700' }}>{blog.title}</h3>
                  <Link to={`/blog/${blog.id}`} style={{ color: 'var(--blue-600)', textDecoration: 'none', fontWeight: '600', marginTop: 'auto' }}>Read Article &rarr;</Link>
                </div>
              </div>
            </TiltCard>
          );
        })}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '4rem', padding: '0 5%' }}>
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: currentPage === 1 ? '#f1f5f9' : 'white', color: currentPage === 1 ? '#94a3b8' : 'var(--navy-900)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
          >
            &larr; Prev
          </button>
          
          <span style={{ color: 'var(--text-muted)' }}>
            Page <strong style={{ color: 'var(--navy-900)' }}>{currentPage}</strong> of {totalPages}
          </span>
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: currentPage === totalPages ? '#f1f5f9' : 'white', color: currentPage === totalPages ? '#94a3b8' : 'var(--navy-900)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export default Blog;
