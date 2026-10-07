import React, { useMemo } from 'react';
import FlyingPosters from '../components/ui/FlyingPosters';
import useLocalStorageData from '../hooks/useLocalStorageData';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const items = [
  '/images/residential.png',
  '/images/commercial.png',
  '/images/roof_3d.png',
  '/images/solar_panel.png',
  '/images/weather_resist.png',
  '/images/smart_monitor.png'
];

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Modern Villa Installation",
    client: "Residential (10 kW System)",
    description: "Complete offset of electricity usage for a luxury property. Beautifully integrated flat-roof panels.",
    image: "/images/residential.png",
    status: 'Published'
  },
  {
    id: 2,
    title: "Tech Park Mega-Install",
    client: "Commercial (500 kW System)",
    description: "Significant carbon reduction and massive cost savings for a modern commercial tech warehouse.",
    image: "/images/commercial.png",
    status: 'Published'
  }
];

function Projects() {
  const fetchedProjects = useLocalStorageData('Projects');

  // Memoize fallback logic to prevent constant recalculations
  const activeProjects = useMemo(() => {
    return fetchedProjects.length > 0 ? fetchedProjects : INITIAL_PROJECTS;
  }, [fetchedProjects]);

  // Hook for infinite scrolling
  const { displayedData, hasMore, loaderRef } = useInfiniteScroll(activeProjects, 4);

  return (
    <>
      <div style={{ background: '#020617', paddingTop: '4rem' }}>
        <div style={{ width: '100%', textAlign: 'center', padding: '0 1rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', color: '#fff', margin: 0 }}>Visual Showcase</h1>
          <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: 'clamp(0.9rem, 4vw, 1.2rem)', marginTop: '1rem' }}>Scroll horizontally to explore our dynamic portfolio</p>
        </div>
        <div style={{ height: '70vh', position: 'relative', overflow: 'hidden' }}>
          <FlyingPosters items={items} planeWidth={550} planeHeight={550} />
        </div>
      </div>

    <div className="page-padding">
      <div className="section-header">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Discover our successful solar installations across the region.</p>
      </div>

      <div className="features-grid">
        {displayedData.map(project => (
          <div key={project.id} className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '240px' }}>
               <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--primary)', color: 'black', padding: '0.2rem 0.8rem', borderRadius: '4px', fontWeight: 'bold' }}>
                {project.client?.split(' ')[0] || "Project"}
              </div>
            </div>
            
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{project.title}</h3>
                <span style={{ fontSize: '1.5rem' }}>{project.icon || "☀️"}</span>
              </div>
              <p style={{ color: 'var(--primary)', margin: '0.5rem 0', fontWeight: 'bold' }}>{project.client}</p>
              <p style={{ color: 'var(--text-muted)' }}>{project.description}</p>
              
              <button className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', padding: '0.6rem' }}>View Case Study</button>
            </div>
          </div>
        ))}
      </div>
      
      <div ref={loaderRef} style={{ height: '20px', width: '100%', margin: '1rem 0' }}></div>
      
      {hasMore && (
        <div style={{ textAlign: 'center', color: 'var(--primary)', padding: '1rem' }}>
          Loading more projects...
        </div>
      )}
    </div>
    </>
  );
}

export default Projects;
