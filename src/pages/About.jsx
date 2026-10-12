import React from 'react';
import PageBanner from '../components/ui/PageBanner';
import TiltCard from '../components/reactbits/LegacyTiltCard';
import { Lightbulb, Target, Leaf } from 'lucide-react';

function About() {
  return (
    <>
      <PageBanner 
        title="About NovaSolar" 
        imagePath="/images/green_solar_field_1791612498444.png"
        breadcrumb="About"
      />

      {/* Metrics Showcase */}
      <div style={{ backgroundColor: 'var(--sky-100)', padding: '4rem 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '0 5%', justifyContent: 'center' }}>
          {[
             { val: "10+", label: "Years of Excellence" },
             { val: "5,000+", label: "Installations" },
             { val: "100%", label: "Satisfaction" }
          ].map((stat, i) => (
            <TiltCard key={i} style={{ flex: '1 1 250px', maxWidth: '350px' }}>
              <div className="feature-card" style={{ width: '100%', height: '100%', textAlign: 'center', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(18, 48, 107, 0.1)', padding: '2rem', borderRadius: '20px', boxShadow: '0 15px 35px rgba(18, 48, 107, 0.1)' }}>
                <h2 style={{ fontSize: '3rem', color: 'var(--teal-600)', margin: '0 0 0.5rem 0' }}>{stat.val}</h2>
                <p style={{ color: 'var(--navy-900)', margin: 0, fontWeight: '700', fontSize: '1.2rem' }}>{stat.label}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Our Story (Split Layout) */}
      <div style={{ background: 'var(--white)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', padding: '4rem 5% 6rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 min(400px, 100%)' }}>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem', color: 'var(--navy-900)' }}>Pioneering Clean Energy</h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1.2rem', lineHeight: '1.8' }}>
              Founded with a vision for a cleaner planet, NovaSolar has quickly become an industry leader in residential and commercial solar solutions. We believe in providing high-quality, durable, and beautiful solar technology that doesn't just save you money, but actively heals the world.
            </p>
            <p style={{ color: 'var(--navy-800)', fontSize: '1.2rem', lineHeight: '1.8', marginTop: '1.5rem', fontWeight: '500' }}>
              Our mission is simple: to accelerate India's transition to sustainable energy with zero compromises on aesthetics or engineering.
            </p>
          </div>
          <div style={{ flex: '1 1 min(400px, 100%)', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-15px', background: 'var(--teal-600)', borderRadius: '24px', filter: 'blur(25px)', opacity: '0.15', zIndex: 0 }}></div>
            <img src="/images/green_energy_abstract_1791612538150.png" alt="Our Process" style={{ width: '100%', borderRadius: '20px', position: 'relative', zIndex: 1, boxShadow: '0 20px 40px rgba(18,48,107,0.15)' }} />
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div style={{ background: 'var(--sky-100)', padding: '6rem 0' }}>
        <div className="section-header">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle" style={{marginBottom: 0}}>The principles that drive every project we undertake.</p>
        </div>
        <div className="features-grid" style={{ padding: '0 5%', marginTop: '3rem' }}>
          <TiltCard style={{ width: '100%', height: '100%' }}>
            <div className="feature-card" style={{ background: 'var(--white)', border: '1px solid rgba(18,48,107,0.05)', boxShadow: '0 10px 30px rgba(18,48,107,0.05)', height: '100%', borderRadius: '20px' }}>
              <div className="feature-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--sky-100)' }}><Lightbulb size={32} color="var(--teal-600)" /></div>
              <h3 style={{ color: 'var(--navy-900)' }}>Innovation</h3>
              <p style={{ color: 'var(--text-body)' }}>We leverage cutting-edge tech, from drone surveys to dynamic 3D rendering, guaranteeing total accuracy.</p>
            </div>
          </TiltCard>
          <TiltCard style={{ width: '100%', height: '100%' }}>
            <div className="feature-card" style={{ background: 'var(--white)', border: '1px solid rgba(18,48,107,0.05)', boxShadow: '0 10px 30px rgba(18,48,107,0.05)', height: '100%', borderRadius: '20px' }}>
              <div className="feature-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--sky-100)' }}><Target size={32} color="var(--teal-600)" /></div>
              <h3 style={{ color: 'var(--navy-900)' }}>Precision</h3>
              <p style={{ color: 'var(--text-body)' }}>We don't take guesses. Every bracket, panel, and wiring pathway is mapped perfectly to your property's architecture.</p>
            </div>
          </TiltCard>
          <TiltCard style={{ width: '100%', height: '100%' }}>
            <div className="feature-card" style={{ background: 'var(--white)', border: '1px solid rgba(18,48,107,0.05)', boxShadow: '0 10px 30px rgba(18,48,107,0.05)', height: '100%', borderRadius: '20px' }}>
              <div className="feature-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--sky-100)' }}><Leaf size={32} color="var(--teal-600)" /></div>
              <h3 style={{ color: 'var(--navy-900)' }}>Sustainability</h3>
              <p style={{ color: 'var(--text-body)' }}>Our commitment goes beyond clean products—we utilize eco-friendly workflows to minimize carbon footprint.</p>
            </div>
          </TiltCard>
        </div>
      </div>
    </>
  );
}

export default About;
