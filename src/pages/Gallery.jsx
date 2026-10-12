import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import PageBanner from '../components/ui/PageBanner';

const ALL_GALLERIES = [
  {
    id: 1,
    title: "Suburban Eco Villa Project",
    category: "Residential",
    location: "Gurugram, Haryana",
    system: "8.5 kW Grid-Tied System",
    before: "/images/green_solar_panels_1791614319680.png",
    after: "/images/green_solar_field_1791612498444.png",
    desc: "Upgraded a traditional concrete roof with a sleek, high-efficiency monocrystalline solar panel array."
  },
  {
    id: 2,
    title: "Commercial Industrial Warehouse Array",
    category: "Commercial",
    location: "Chakan Industrial Park, Pune",
    system: "150 kW Commercial Array",
    before: "/images/light_eco_city_1791612526207.png",
    after: "/images/green_solar_field_1791612498444.png",
    desc: "Transformed an unused 25,000 sq.ft industrial roof into a clean energy generating power plant."
  },
  {
    id: 3,
    title: "Agricultural Solar Microgrid Farm",
    category: "Agricultural",
    location: "Nashik, Maharashtra",
    system: "25 kW Solar Pump Microgrid",
    before: "/images/green_windmills_1791612510771.png",
    after: "/images/green_solar_field_1791612498444.png",
    desc: "Replaced diesel-powered irrigation motors with zero-emission solar pumping grid."
  },
  {
    id: 4,
    title: "Luxury Hillside Farmhouse Setup",
    category: "Residential",
    location: "Dehradun, Uttarakhand",
    system: "12 kW Hybrid Battery Storage",
    before: "/images/green_energy_abstract_1791612538150.png",
    after: "/images/green_solar_panels_1791614319680.png",
    desc: "Installed hybrid off-grid solar panels with lithium battery backup for 24/7 power independence."
  },
  {
    id: 5,
    title: "Corporate Tech Campus Solar Canopy",
    category: "Commercial",
    location: "Electronic City, Bengaluru",
    system: "320 kW Solar Carport & Rooftop",
    before: "/images/light_eco_city_1791612526207.png",
    after: "/images/green_solar_field_1791612498444.png",
    desc: "Engineered parking shades and rooftop dual-benefit clean energy generation structure."
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGalleries = useMemo(() => {
    if (selectedCategory === 'All') return ALL_GALLERIES;
    return ALL_GALLERIES.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const { displayedData, hasMore, loaderRef } = useInfiniteScroll(filteredGalleries, 2);

  return (
    <>
      <PageBanner 
        title="Project Transformations" 
        subtitle="Explore our verified solar installations with before and after project galleries."
        breadcrumb="Gallery"
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem, 4vw, 4rem) 1.5rem' }}>
        
        {/* Category Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {['All', 'Residential', 'Commercial', 'Agricultural'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '50px',
                border: selectedCategory === cat ? '1px solid var(--teal-500)' : '1px solid var(--sky-200)',
                background: selectedCategory === cat ? 'var(--teal-500)' : 'var(--white)',
                color: selectedCategory === cat ? 'white' : 'var(--navy-800)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(18,48,107,0.06)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {displayedData.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ 
              marginBottom: '4rem', 
              background: 'var(--white)', 
              borderRadius: '20px', 
              border: '1px solid var(--sky-200)',
              boxShadow: '0 10px 30px rgba(18,48,107,0.08)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '1.8rem 2rem', borderBottom: '1px solid var(--sky-100)', background: 'var(--sky-50)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)', margin: 0, fontFamily: 'Outfit, sans-serif' }}>{project.title}</h2>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', padding: '0.3rem 0.8rem', borderRadius: '50px', background: 'rgba(14, 165, 233, 0.15)', color: 'var(--teal-600)' }}>
                  {project.category}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--teal-600)', fontWeight: '600', fontSize: '0.9rem' }}>
                <span>📍 {project.location}</span>
                <span>⚡ {project.system}</span>
              </div>
              <p style={{ color: 'var(--text-body)', marginTop: '0.8rem', maxWidth: '800px', lineHeight: '1.6', fontSize: '0.95rem' }}>{project.desc}</p>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                
                {/* Before Section */}
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(18,48,107,0.1)' }}>
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', padding: '0.3rem 0.8rem', borderRadius: '50px', color: 'white', fontWeight: 'bold', fontSize: '0.75rem', zIndex: 10 }}>BEFORE UPGRADE</div>
                  <img src={project.before} alt="Before" style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} />
                </div>

                {/* After Section */}
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(18,48,107,0.1)', border: '2px solid var(--teal-500)' }}>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--teal-500)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.75rem', zIndex: 10, boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)' }}>AFTER SOLAR INSTALL</div>
                  <img src={project.after} alt="After" style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} />
                </div>

              </div>
            </div>
          </motion.div>
        ))}

        {/* Infinite Scroll Loader Target */}
        <div ref={loaderRef} style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          {hasMore ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'var(--teal-600)', fontWeight: '600' }}>
              <div className="skeleton-pulse" style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--teal-500)' }} />
              <span>Loading more transformations...</span>
            </div>
          ) : (
            <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              All project transformations loaded.
            </p>
          )}
        </div>

      </div>
    </>
  );
}
