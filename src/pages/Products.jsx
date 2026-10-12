import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun } from 'lucide-react';
import useLocalStorageData from '../hooks/useLocalStorageData';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import PageBanner from '../components/ui/PageBanner';
import { CardGridSkeleton } from '../components/ui/Skeleton';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "NovaPanel Pro Max",
    category: "Solar Panel",
    specs: "550W | 22.8% Efficiency",
    desc: "Our flagship monocrystalline solar panel designed for maximum residential output.",
    image: "/images/solar_panel.png",
    status: 'Published',
    slug: 'panels'
  },
  {
    id: 2,
    name: "Smart Inverter V2",
    category: "Inverter",
    specs: "5kW Capacity | Integrated monitoring",
    desc: "Advanced micro-inverter that seamlessly converts and tracks your energy production.",
    image: "/images/inverter_product.png",
    status: 'Published',
    slug: 'inverters'
  },
  {
    id: 3,
    name: "Nova Cell Battery",
    category: "Battery Storage",
    specs: "10kWh | Deep Cycle",
    desc: "Store excess solar energy for nighttime use and protect your home against local power outages.",
    image: "/images/battery_product.png",
    status: 'Published',
    slug: 'batteries'
  },
  {
    id: 4,
    name: "Enterprise Solar Grid",
    category: "Commercial Solution",
    specs: "100kW - 10MW+ | Zero Export",
    desc: "Enterprise-grade solar arrays engineered strictly to eliminate commercial energy overheads.",
    image: "/images/commercial.png",
    status: 'Published',
    slug: 'commercial'
  }
];

function Products() {
  const fetchedProducts = useLocalStorageData('Products');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Memoize fallback resolution
  const activeProducts = useMemo(() => {
    return fetchedProducts.length > 0 ? fetchedProducts : INITIAL_PRODUCTS;
  }, [fetchedProducts]);

  const categories = ['All', ...new Set(activeProducts.map(p => p.category))];

  const handleFilterChange = (category) => {
    if (category === activeFilter) return;
    setIsFiltering(true);
    setActiveFilter(category);
    setTimeout(() => {
      setIsFiltering(false);
    }, 350);
  };

  const filteredProducts = activeProducts.filter(p => activeFilter === 'All' || p.category === activeFilter);

  // Infinite Scroll Hook (Load 4 at a time)
  const { displayedData, hasMore, loaderRef } = useInfiniteScroll(filteredProducts, 4);

  return (
    <>
      <PageBanner 
        title="Our Premium Products" 
        subtitle="Engineered solar technology built for maximum efficiency and elegant aesthetics."
        breadcrumb="Products"
      />

      <div style={{ backgroundColor: 'var(--sky-100)', padding: '4rem 5%', minHeight: '60vh' }}>
        
        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          {categories.map(category => (
            <button 
              key={category} 
              onClick={() => handleFilterChange(category)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '50px',
                border: activeFilter === category ? '1px solid var(--teal-600)' : '1px solid rgba(11,31,75,0.2)',
                background: activeFilter === category ? 'var(--teal-600)' : 'white',
                color: activeFilter === category ? 'white' : 'var(--navy-900)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeFilter === category ? '0 4px 10px rgba(14, 138, 155, 0.3)' : 'none'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {isFiltering ? (
          <CardGridSkeleton count={4} height="220px" />
        ) : (
          <div className="features-grid">
          {displayedData.map(product => {
            const icon = product.icon || <Sun size={20} color="var(--white)" />;
            let slug = product.slug;
            if (!slug) {
               if (product.category === 'Solar Panel') slug = 'panels';
               else if (product.category === 'Inverter') slug = 'inverters';
               else if (product.category === 'Battery Storage') slug = 'batteries';
               else if (product.category === 'Commercial Solution') slug = 'commercial';
               else slug = product.name.toLowerCase().replace(/\s+/g, '-');
            }
            return (
            <div key={product.id} className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', textAlign: 'left', background: 'var(--white)' }}>
              <div style={{ position: 'relative', height: '220px' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--teal-600)', padding: '0.4rem', borderRadius: '50%', display: 'flex' }}>
                  {icon}
                </div>
              </div>
              
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{ color: 'var(--teal-600)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{product.category}</p>
                <h3 style={{ margin: '0.5rem 0', color: 'var(--navy-900)' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 'bold' }}>{product.price || product.specs}</p>
                <p style={{ color: 'var(--text-body)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>{product.description || product.desc}</p>
                
                <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                  <Link to={`/products/${slug}`} style={{ flex: 1 }}>
                    <button className="btn btn-outline" style={{ width: '100%', padding: '0.8rem', background: 'var(--navy-800)', color: 'white', border: 'none', marginLeft: 0 }}>View Details</button>
                  </Link>
                  <Link to="/calculator" style={{ flex: 1 }}>
                    <button className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>Get Quote</button>
                  </Link>
                </div>
              </div>
            </div>
          )})}
        </div>
        )}
        
        {/* Invisible loader element to trigger intersection observer for Infinite Scroll */}
        <div ref={loaderRef} style={{ height: '20px', width: '100%', margin: '1rem 0' }}></div>
        
        {hasMore && (
          <div style={{ textAlign: 'center', color: 'var(--teal-600)', padding: '1rem' }}>
            Loading more products...
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
