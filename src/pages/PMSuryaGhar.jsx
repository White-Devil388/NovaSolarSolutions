import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageBanner from '../components/ui/PageBanner';
import { Landmark, CheckCircle, ArrowRight } from 'lucide-react';

const PMSuryaGhar = () => {
  return (
    <>
      <PageBanner 
        title="PM Surya Ghar Yojana" 
        subtitle="मुफ्त बिजली योजना - Up to 300 units of free electricity every month."
        breadcrumb="PM Surya Ghar"
      />

      <div style={{ backgroundColor: 'var(--sky-100)', padding: '4rem 5%', minHeight: '60vh' }}>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* Top Intro Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem', color: 'var(--navy-900)' }}>Empowering Indian Households</h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                The PM Surya Ghar Muft Bijli Yojana is a government initiative aimed at providing up to 300 units of free electricity every month to Indian households through rooftop solar installations.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontStyle: 'italic' }}>
                पीएम सूर्य घर मुफ्त बिजली योजना भारत सरकार की एक पहल है, जिसका उद्देश्य रूफटॉप सोलर स्थापना के माध्यम से भारतीय घरेलू उपभोक्ताओं को हर महीने 300 यूनिट तक मुफ्त बिजली प्रदान करना है।
              </p>
            </div>
            
            <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(18,48,107,0.15)', height: '100%', minHeight: '350px' }}>
              <img 
                src="/images/pm_modi.png" 
                alt="PM Narendra Modi" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(to top, rgba(11,31,75,0.9), transparent)', color: 'white', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>Shri Narendra Modi</h4>
                <p style={{ margin: 0, color: 'var(--sky-200)', fontSize: '1rem' }}>Hon'ble Prime Minister of India</p>
              </div>
            </div>
          </div>

          {/* Subsidy Info Cards */}
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Subsidy Structure (सब्सिडी संरचना)</h2>
            <div className="features-grid">
              <div className="feature-card" style={{ background: 'var(--white)' }}>
                <div className="feature-icon" style={{ background: 'var(--sky-100)', color: 'var(--teal-600)' }}><Landmark size={32} /></div>
                <h3>1 kW System</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--green-500)', margin: '1rem 0' }}>₹30,000</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>(१ किलोवाट सिस्टम: ३०,००० रुपये)</p>
              </div>
              <div className="feature-card" style={{ background: 'var(--white)' }}>
                <div className="feature-icon" style={{ background: 'var(--sky-100)', color: 'var(--teal-600)' }}><Landmark size={32} /></div>
                <h3>2 kW System</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--green-500)', margin: '1rem 0' }}>₹60,000</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>(२ किलोवाट सिस्टम: ६०,००० रुपये)</p>
              </div>
              <div className="feature-card" style={{ background: 'var(--white)' }}>
                <div className="feature-icon" style={{ background: 'var(--sky-100)', color: 'var(--teal-600)' }}><Landmark size={32} /></div>
                <h3>3 kW & Above</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--green-500)', margin: '1rem 0' }}>₹78,000 <span style={{fontSize:'1rem', color:'var(--text-muted)'}}>(Max)</span></p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>(३ किलोवाट या अधिक: ७८,००० रुपये - अधिकतम)</p>
              </div>
            </div>
          </div>
          
          {/* Eligibility Steps */}
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Eligibility & Benefits</h2>
            <div className="features-grid" style={{ zIndex: 1, position: 'relative' }}>
              <div className="process-card" style={{ background: 'var(--white)' }}>
                <div className="process-step-num">01</div>
                <h3>Citizenship</h3>
                <p>Must be an Indian citizen with a house and valid electricity connection.</p>
              </div>
              <div className="process-card" style={{ background: 'var(--white)' }}>
                <div className="process-step-num" style={{ color: 'var(--teal-600)' }}>02</div>
                <h3>Earn Annually</h3>
                <p>Earn up to ₹18,000 annually by selling surplus power.</p>
              </div>
              <div className="process-card" style={{ background: 'var(--white)' }}>
                <div className="process-step-num" style={{ color: 'var(--blue-500)' }}>03</div>
                <h3>Apply Easily</h3>
                <p>Register on the national portal to select your local vendor.</p>
              </div>
              <div className="process-card" style={{ background: 'var(--white)' }}>
                <div className="process-step-num" style={{ color: 'var(--blue-500)' }}>04</div>
                <h3>Get Subsidy</h3>
                <p>Direct bank transfer (DBT) of your subsidy amount within 30 days.</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
              Apply Now <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default PMSuryaGhar;
