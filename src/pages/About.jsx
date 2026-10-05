import React from 'react';
import TiltCard from '../components/ui/TiltCard';

function About() {
  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Hero Banner */}
      <div style={{ height: '70vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.4) 0%, rgba(2, 6, 23, 1) 100%), url(/images/installation_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center', padding: '0 5%' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#fff', textShadow: '0 10px 30px rgba(0,0,0,0.9)', margin: 0, fontWeight: '800' }}>
          Empowering the Future, <br/><span style={{ color: 'var(--primary)' }}>One Roof at a Time.</span>
        </h1>
      </div>

      {/* Floating Metrics Showcase */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '0 5%', marginTop: '-5rem', position: 'relative', zIndex: 10, justifyContent: 'center' }}>
        {[
           { val: "10+", label: "Years of Excellence" },
           { val: "5,000+", label: "Installations" },
           { val: "100%", label: "Satisfaction" }
        ].map((stat, i) => (
          <TiltCard key={i} style={{ flex: '1 1 250px', maxWidth: '350px' }}>
            <div className="feature-card" style={{ width: '100%', height: '100%', textAlign: 'center', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '20px' }}>
              <h2 style={{ fontSize: '3rem', color: 'var(--primary)', margin: '0 0 0.5rem 0' }}>{stat.val}</h2>
              <p style={{ color: 'var(--text-light)', margin: 0, fontWeight: 'bold' }}>{stat.label}</p>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Our Story (Split Layout) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', padding: '6rem 5%', alignItems: 'center' }}>
        <div style={{ flex: '1 1 min(400px, 100%)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1.5rem 0', color: 'white' }}>Pioneering Clean Energy</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8' }}>
            Founded with a vision for a cleaner planet, NovaSolar has quickly become an industry leader in residential and commercial solar solutions. We believe in providing high-quality, durable, and beautiful solar technology that doesn't just save you money, but actively heals the world.
          </p>
          <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: '1.8', marginTop: '1.5rem', fontWeight: '500' }}>
            Our mission is simple: to accelerate India's transition to sustainable energy with zero compromises on aesthetics or engineering.
          </p>
        </div>
        <div style={{ flex: '1 1 min(400px, 100%)', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '-10px', background: 'var(--primary)', borderRadius: '24px', filter: 'blur(20px)', opacity: '0.4', zIndex: 0 }}></div>
          <img src="/images/process_consultation.png" alt="Our Process" style={{ width: '100%', borderRadius: '20px', position: 'relative', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="section-header" style={{ padding: '2rem 5% 0' }}>
        <h2 className="section-title">Our Core Values</h2>
        <p className="section-subtitle" style={{marginBottom: 0}}>The principles that drive every project we undertake.</p>
      </div>
      <div className="features-grid" style={{ padding: '0 5%', marginTop: '3rem' }}>
        <TiltCard style={{ width: '100%', height: '100%' }}>
          <div className="feature-card" style={{ background: 'rgba(15, 23, 42, 0.4)', height: '100%', borderRadius: '20px' }}>
            <div className="feature-icon">💡</div>
            <h3>Innovation</h3>
            <p>We leverage cutting-edge tech, from drone surveys to dynamic 3D rendering, guaranteeing total accuracy.</p>
          </div>
        </TiltCard>
        <TiltCard style={{ width: '100%', height: '100%' }}>
          <div className="feature-card" style={{ background: 'rgba(15, 23, 42, 0.4)', height: '100%', borderRadius: '20px' }}>
            <div className="feature-icon">🎯</div>
            <h3>Precision</h3>
            <p>We don't take guesses. Every bracket, panel, and wiring pathway is mapped perfectly to your property's architecture.</p>
          </div>
        </TiltCard>
        <TiltCard style={{ width: '100%', height: '100%' }}>
          <div className="feature-card" style={{ background: 'rgba(15, 23, 42, 0.4)', height: '100%', borderRadius: '20px' }}>
            <div className="feature-icon">🌱</div>
            <h3>Sustainability</h3>
            <p>Our commitment goes beyond clean products—we utilize eco-friendly workflows to minimize carbon footprint.</p>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}

export default About;
