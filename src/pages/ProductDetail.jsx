import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TiltCard from '../components/ui/TiltCard';

// Dummy Data mapped to route slugs
const PRODUCT_DATA = {
  panels: {
    title: "Residential Panels",
    subtitle: "High-efficiency monocrystalline panels crafted for standard residential roofing.",
    image: "/images/solar_panel.png", 
    features: [
      "Up to 22.8% Conversion Efficiency",
      "Half-cut Cell Technology for Micro-crack Resistance",
      "25-Year Linear Power Warranty",
      "Sleek Black Aesthetic"
    ],
    technicalSpecs: {
      "Power Output": "450W - 550W",
      "Degradation": "0.55% Annual",
      "Dimensions": "2279x1134x35mm",
      "Weight": "28.6 kg"
    }
  },
  batteries: {
    title: "Power Storage Batteries",
    subtitle: "Reliable deep-cycle energy storage solutions for seamless nighttime power transitions.",
    image: "/images/battery_product.png",
    features: [
      "LiFePO4 Chemistry for Extreme Safety",
      "10kWh Module Expandability",
      "IP65 Rated for Outdoor Use",
      "10-Year Cycle Warranty (6000 cycles)"
    ],
    technicalSpecs: {
      "Usable Capacity": "9.6 kWh",
      "Continuous Output": "5 kW",
      "Operating Temp": "-10°C to 50°C",
      "Scalability": "Up to 5 Units"
    }
  },
  inverters: {
    title: "Smart Network Inverters",
    subtitle: "The brain of your solar network, converting DC to grid-ready AC seamlessly.",
    image: "/images/inverter_product.png",
    features: [
      "99% Max Efficiency Rating",
      "Integrated Wi-Fi for Cloud Monitoring",
      "Battery Ready (Hybrid Configurations)",
      "Fanless Cooling Design"
    ],
    technicalSpecs: {
      "DC Input V Max": "600 V",
      "AC Output": "Dual Mode (On/Off Grid)",
      "Communication": "RS485 / WLAN",
      "Protection": "AFCI built-in"
    }
  },
  commercial: {
    title: "Commercial Solar Grids",
    subtitle: "Enterprise-grade solar arrays engineered strictly to eliminate commercial energy overheads.",
    image: "/images/commercial.png",
    features: [
      "Heavy-duty Bifacial Module Support",
      "Three-phase Centralized Inverters",
      "Zero Export Feed-in Algorithms",
      "Dedicated Asset Management Dashboards"
    ],
    technicalSpecs: {
      "System Size Range": "100kW - 10MW+",
      "Payback Period": "3 - 5 Years",
      "Mounting Sys": "Ballasted or Penetrating",
      "Tax Benefits": "Accelerated Depreciation Eligible"
    }
  }
};

function ProductDetail() {
  const { category } = useParams();
  
  // Lookup data based on route param; handle invalid route gracefully
  const data = PRODUCT_DATA[category];

  if (!data) {
    return (
      <div style={{ padding: '8rem 5%', textAlign: 'center' }}>
        <h2 className="section-title">Item Not Found</h2>
        <p className="section-subtitle">We couldn't locate specs for '{category}'.</p>
      </div>
    );
  }

  return (
    <div className="page-padding">
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>{data.subtitle}</p>
        </motion.div>
      </div>

      <div className="showcase" style={{ padding: '0', background: 'transparent', gap: '3rem', flexWrap: 'wrap-reverse' }}>
        
        {/* Left Column: Data */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {/* Key Features Block */}
          <div style={{ background: '#0a0f1c', border: '1px solid rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>Key Features</h3>
            <ul className="showcase-list" style={{ paddingLeft: '1rem' }}>
              {data.features.map((feat, i) => (
                <li key={i} style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>{feat}</li>
              ))}
            </ul>
          </div>

          {/* Technical Specs Block */}
          <div style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(12px)', border: '1px solid var(--glass-border)', padding: '2rem', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'white' }}>Technical Specifications</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {Object.entries(data.technicalSpecs).map(([key, value]) => (
                <div key={key}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{key}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/calculator" style={{ flex: 1 }}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', fontWeight: 'bold' }}>Simulate Capacity</motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Visuals */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ flex: '1 1 500px' }}
        >
          <TiltCard style={{ width: '100%', height: '100%', minHeight: '400px' }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              minHeight: '400px',
              backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.8), rgba(2,6,23,0.2)), url(${data.image})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
               <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={data.image} alt="product" style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }} />
               </div>
            </div>
          </TiltCard>
        </motion.div>

      </div>
    </div>
  );
}

export default ProductDetail;
