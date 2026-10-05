import React from 'react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/ui/TiltCard';

function Solutions() {
  return (
    <div className="page-padding">
      <div className="section-header">
        <h2 className="section-title">Solar Solutions</h2>
        <p className="section-subtitle">Comprehensive energy solutions for every requirement.</p>
      </div>

      <div className="features-grid">
        <TiltCard style={{ width: '100%', height: '100%' }}>
          <div className="feature-card" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.8) 100%), url(/images/residential.png)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'var(--text-light)', width: '100%', height: '100%', borderRadius: '20px' }}>
            <div className="feature-icon" style={{ zIndex: 1, position: 'relative' }}>🏠</div>
            <h3 style={{ position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Residential Solar</h3>
            <p style={{ position: 'relative', zIndex: 1, color: '#e2e8f0' }}>Power your home with clean energy and reduce your electricity bills significantly.</p>
            <br/>
            <Link to="/contact" style={{ position: 'relative', zIndex: 1 }}><button className="btn btn-outline" style={{width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.4)'}}>Learn More</button></Link>
          </div>
        </TiltCard>
        <TiltCard style={{ width: '100%', height: '100%' }}>
          <div className="feature-card" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.8) 100%), url(/images/commercial.png)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'var(--text-light)', width: '100%', height: '100%', borderRadius: '20px' }}>
            <div className="feature-icon" style={{ zIndex: 1, position: 'relative' }}>🏢</div>
            <h3 style={{ position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Commercial Solar</h3>
            <p style={{ position: 'relative', zIndex: 1, color: '#e2e8f0' }}>Optimize your business operations with sustainable and cost-effective solar power.</p>
            <br/>
            <Link to="/contact" style={{ position: 'relative', zIndex: 1 }}><button className="btn btn-outline" style={{width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.4)'}}>Learn More</button></Link>
          </div>
        </TiltCard>
        <TiltCard style={{ width: '100%', height: '100%' }}>
          <div className="feature-card" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.8) 100%), url(/images/solar_panel.png)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'var(--text-light)', width: '100%', height: '100%', borderRadius: '20px' }}>
            <div className="feature-icon" style={{ zIndex: 1, position: 'relative' }}>🏭</div>
            <h3 style={{ position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Industrial Solar</h3>
            <p style={{ position: 'relative', zIndex: 1, color: '#e2e8f0' }}>Large-scale solar installations designed to meet heavy industrial energy demands.</p>
            <br/>
            <Link to="/contact" style={{ position: 'relative', zIndex: 1 }}><button className="btn btn-outline" style={{width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.4)'}}>Learn More</button></Link>
          </div>
        </TiltCard>
      </div>

      <div className="section-header" style={{ marginTop: 'clamp(4rem, 10vw, 8rem)' }}>
        <h2 className="section-title">The NovaSolar Advantage</h2>
        <p className="section-subtitle">We utilize cutting-edge digital tools to ensure 100% precision before installation.</p>
      </div>

      <div className="features-grid">
        <TiltCard style={{ width: '100%', height: '100%' }}>
          <div className="feature-card" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.8) 100%), url(/images/tech_flow.png)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'var(--text-light)', width: '100%', height: '100%', borderRadius: '20px' }}>
            <div className="feature-icon" style={{ zIndex: 1, position: 'relative' }}>🌳</div>
            <h3 style={{ position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Shadow & Shading Analysis</h3>
            <p style={{ position: 'relative', zIndex: 1, color: '#e2e8f0' }}>We calculate hour-by-hour shading from trees, parapets, and water tanks to give you generation estimates you can actually trust.</p>
          </div>
        </TiltCard>
        <TiltCard style={{ width: '100%', height: '100%' }}>
          <div className="feature-card" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.8) 100%), url(/images/roof_3d.png)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'var(--text-light)', width: '100%', height: '100%', borderRadius: '20px' }}>
            <div className="feature-icon" style={{ zIndex: 1, position: 'relative' }}>🏠</div>
            <h3 style={{ position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Supports All Roof Types</h3>
            <p style={{ position: 'relative', zIndex: 1, color: '#e2e8f0' }}>Whether you have a standard flat roof, RCC, or a tin-shed, our mounting technology is built to handle Indian roofing systems securely.</p>
          </div>
        </TiltCard>
        <TiltCard style={{ width: '100%', height: '100%' }}>
          <div className="feature-card" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.8) 100%), url(/images/smart_monitor.png)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'var(--text-light)', width: '100%', height: '100%', borderRadius: '20px' }}>
            <div className="feature-icon" style={{ zIndex: 1, position: 'relative' }}>📊</div>
            <h3 style={{ position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Auto-generated Energy Reports</h3>
            <p style={{ position: 'relative', zIndex: 1, color: '#e2e8f0' }}>You receive a complete Energy Report alongside a full electrical Single Line Diagram (SLD) outlining performance and layout.</p>
          </div>
        </TiltCard>
        <TiltCard style={{ width: '100%', height: '100%' }}>
          <div className="feature-card" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.8) 100%), url(/images/proposal_digital.png)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'var(--text-light)', width: '100%', height: '100%', borderRadius: '20px' }}>
            <div className="feature-icon" style={{ zIndex: 1, position: 'relative' }}>📱</div>
            <h3 style={{ position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>WhatsApp & PDF Proposals</h3>
            <p style={{ position: 'relative', zIndex: 1, color: '#e2e8f0' }}>After your site survey, we send your branded, interactive proposal featuring 25-year ROI right to your WhatsApp or email.</p>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}

export default Solutions;
