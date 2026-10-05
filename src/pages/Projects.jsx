import React from 'react';
import FlyingPosters from '../components/ui/FlyingPosters';

const items = [
  '/images/residential.png',
  '/images/commercial.png',
  '/images/roof_3d.png',
  '/images/solar_panel.png',
  '/images/weather_resist.png',
  '/images/smart_monitor.png'
];

const projects = [
  {
    id: 1,
    name: "Modern Villa Installation",
    type: "Residential",
    specs: "10 kW System",
    desc: "Complete offset of electricity usage for a luxury property. Beautifully integrated flat-roof panels.",
    image: "/images/residential.png",
    icon: "🏡"
  },
  {
    id: 2,
    name: "Tech Park Mega-Install",
    type: "Commercial",
    specs: "500 kW System",
    desc: "Significant carbon reduction and massive cost savings for a modern commercial tech warehouse.",
    image: "/images/commercial.png",
    icon: "🏢"
  }
];

function Projects() {
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
        {projects.map(project => (
          <div key={project.id} className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '240px' }}>
               <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--primary)', color: 'black', padding: '0.2rem 0.8rem', borderRadius: '4px', fontWeight: 'bold' }}>
                {project.type}
              </div>
            </div>
            
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{project.name}</h3>
                <span style={{ fontSize: '1.5rem' }}>{project.icon}</span>
              </div>
              <p style={{ color: 'var(--primary)', margin: '0.5rem 0', fontWeight: 'bold' }}>{project.specs}</p>
              <p style={{ color: 'var(--text-muted)' }}>{project.desc}</p>
              
              <button className="btn btn-outline" style={{ marginTop: '1.5rem', width: '100%', padding: '0.6rem' }}>View Case Study</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Projects;
