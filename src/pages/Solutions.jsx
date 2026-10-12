import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/ui/PageBanner';
import { Home, Building, Factory, TreePine, FileBarChart, Smartphone, ArrowRight } from 'lucide-react';

function Solutions() {
  return (
    <>
      <PageBanner 
        title="Our Solar Solutions" 
        subtitle="Comprehensive clean energy systems for every requirement."
        breadcrumb="Solutions"
      />

      {/* Cloud-white grid of solution cards */}
      <div className="features" style={{ backgroundColor: 'var(--sky-100)' }}>
        <div className="features-grid">
          
          <div className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', textAlign: 'left', background: 'var(--white)' }}>
            <div style={{ position: 'relative', height: '200px' }}>
              <img src="/images/green_solar_field_1791612498444.png" alt="Residential Solar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--white)', padding: '0.6rem', borderRadius: '50%', display: 'flex', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', color: 'var(--teal-600)' }}>
                <Home size={24} />
              </div>
            </div>
            <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 0.8rem 0', color: 'var(--navy-900)' }}>Residential Solar</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-body)', fontSize: '0.95rem' }}>Power your home with clean energy and reduce your electricity bills significantly.</p>
              <div style={{ marginTop: 'auto' }}>
                <Link to="/contact" className="btn btn-outline" style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '0.8rem', background: 'var(--navy-800)', color: 'white', border: 'none', marginLeft: 0, fontWeight: '600' }}>Learn More <ArrowRight size={18} className="ml-2"/></Link>
              </div>
            </div>
          </div>

          <div className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', textAlign: 'left', background: 'var(--white)' }}>
            <div style={{ position: 'relative', height: '200px' }}>
              <img src="/images/light_eco_city_1791612526207.png" alt="Commercial Solar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--white)', padding: '0.6rem', borderRadius: '50%', display: 'flex', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', color: 'var(--teal-600)' }}>
                <Building size={24} />
              </div>
            </div>
            <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 0.8rem 0', color: 'var(--navy-900)' }}>Commercial Solar</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-body)', fontSize: '0.95rem' }}>Optimize your business operations with sustainable and cost-effective solar power.</p>
              <div style={{ marginTop: 'auto' }}>
                <Link to="/contact" className="btn btn-outline" style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '0.8rem', background: 'var(--navy-800)', color: 'white', border: 'none', marginLeft: 0, fontWeight: '600' }}>Learn More <ArrowRight size={18} className="ml-2"/></Link>
              </div>
            </div>
          </div>

          <div className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', textAlign: 'left', background: 'var(--white)' }}>
            <div style={{ position: 'relative', height: '200px' }}>
              <img src="/images/green_windmills_1791612510771.png" alt="Industrial Solar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--white)', padding: '0.6rem', borderRadius: '50%', display: 'flex', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', color: 'var(--teal-600)' }}>
                <Factory size={24} />
              </div>
            </div>
            <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 0.8rem 0', color: 'var(--navy-900)' }}>Industrial Solar</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-body)', fontSize: '0.95rem' }}>Large-scale solar installations designed to meet heavy industrial energy demands.</p>
              <div style={{ marginTop: 'auto' }}>
                <Link to="/contact" className="btn btn-outline" style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '0.8rem', background: 'var(--navy-800)', color: 'white', border: 'none', marginLeft: 0, fontWeight: '600' }}>Learn More <ArrowRight size={18} className="ml-2"/></Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dark panel section with CTA */}
      <div className="showcase" style={{ background: 'linear-gradient(180deg, rgba(11,31,75,0.75), rgba(18,48,107,0.55)), url("/images/green_solar_field_1791612498444.png")', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <div className="showcase-content" style={{ textAlign: 'center', width: '100%', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
          <h2 className="section-title" style={{ color: 'white' }}>Ready to transition to solar?</h2>
          <p style={{ color: 'var(--sky-100)', fontSize: '1.2rem', marginBottom: '2rem' }}>We utilize cutting-edge digital tools to ensure 100% precision before installation. See the impact on your bills immediately.</p>
          <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>Get Free Solar Quote</Link>
        </div>
      </div>

      {/* "How it works" steps strip / The NovaSolar Advantage */}
      <div className="features" style={{ backgroundColor: 'var(--sky-100)', padding: '6rem 5%' }}>
        <div className="section-header">
          <h2 className="section-title">The NovaSolar Advantage</h2>
          <p className="section-subtitle">A seamless journey powered by digital precision.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card" style={{ background: 'var(--white)', border: '1px solid rgba(18,48,107,0.1)', boxShadow: '0 10px 40px rgba(18,48,107,0.08)' }}>
            <div className="feature-icon" style={{ background: 'var(--sky-100)', color: 'var(--teal-600)' }}><TreePine size={32} /></div>
            <h3 style={{ color: 'var(--navy-900)' }}>Shading Analysis</h3>
            <p style={{ color: 'var(--text-body)' }}>We calculate hour-by-hour shading from trees and parapets for accurate generation estimates.</p>
          </div>
          <div className="feature-card" style={{ background: 'var(--white)', border: '1px solid rgba(18,48,107,0.1)', boxShadow: '0 10px 40px rgba(18,48,107,0.08)' }}>
            <div className="feature-icon" style={{ background: 'var(--sky-100)', color: 'var(--teal-600)' }}><Home size={32} /></div>
            <h3 style={{ color: 'var(--navy-900)' }}>All Roof Types</h3>
            <p style={{ color: 'var(--text-body)' }}>Whether you have a standard flat roof, RCC, or a tin-shed, our mounts adapt securely.</p>
          </div>
          <div className="feature-card" style={{ background: 'var(--white)', border: '1px solid rgba(18,48,107,0.1)', boxShadow: '0 10px 40px rgba(18,48,107,0.08)' }}>
            <div className="feature-icon" style={{ background: 'var(--sky-100)', color: 'var(--teal-600)' }}><FileBarChart size={32} /></div>
            <h3 style={{ color: 'var(--navy-900)' }}>Energy Reports</h3>
            <p style={{ color: 'var(--text-body)' }}>You receive a complete Energy Report alongside a full electrical Single Line Diagram (SLD).</p>
          </div>
          <div className="feature-card" style={{ background: 'var(--white)', border: '1px solid rgba(18,48,107,0.1)', boxShadow: '0 10px 40px rgba(18,48,107,0.08)' }}>
            <div className="feature-icon" style={{ background: 'var(--sky-100)', color: 'var(--teal-600)' }}><Smartphone size={32} /></div>
            <h3 style={{ color: 'var(--navy-900)' }}>Digital Proposals</h3>
            <p style={{ color: 'var(--text-body)' }}>Interactive proposals featuring 25-year ROI right to your WhatsApp or email.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Solutions;
