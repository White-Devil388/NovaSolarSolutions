import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "NovaPanel Pro Max",
    category: "Solar Panel",
    specs: "550W | 22.8% Efficiency",
    desc: "Our flagship monocrystalline solar panel designed for maximum residential output.",
    image: "/images/solar_panel.png",
    icon: "☀️"
  },
  {
    id: 2,
    name: "Smart Inverter V2",
    category: "Inverter",
    specs: "5kW Capacity | Integrated monitoring",
    desc: "Advanced micro-inverter that seamlessly converts and tracks your energy production.",
    image: "/images/solar_panel.png", // Reusing panel for aesthetic consistency
    icon: "⚡"
  },
  {
    id: 3,
    name: "Nova Cell Battery",
    category: "Battery Storage",
    specs: "10kWh | Deep Cycle",
    desc: "Store excess solar energy for nighttime use and protect your home against local power outages.",
    image: "/images/solar_panel.png", 
    icon: "🔋"
  }
];

function Products() {
  return (
    <div className="page-padding">
      <div className="section-header">
        <h2 className="section-title">Our Premium Products</h2>
        <p className="section-subtitle">Engineered solar technology built for maximum efficiency and elegant aesthetics.</p>
      </div>

      <div className="features-grid">
        {products.map(product => (
          <div key={product.id} className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '220px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '1.2rem' }}>
                {product.icon}
              </div>
            </div>
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <p style={{ color: 'var(--primary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{product.category}</p>
              <h3 style={{ margin: '0.5rem 0' }}>{product.name}</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 'bold' }}>{product.specs}</p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>{product.desc}</p>
              
              <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                <button className="btn btn-outline" style={{ flex: 1, padding: '0.6rem' }}>Details</button>
                <Link to="/calculator" style={{ flex: 1 }}>
                  <button className="btn btn-primary" style={{ width: '100%', padding: '0.6rem' }}>Get Quote</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
