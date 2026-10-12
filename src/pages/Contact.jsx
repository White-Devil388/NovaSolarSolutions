import React, { useState } from 'react';
import TiltCard from '../components/reactbits/LegacyTiltCard';
import { Phone, Mail, Building, CheckCircle } from 'lucide-react';
import PageBanner from '../components/ui/PageBanner';

function Contact() {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      id: Date.now(),
      ...formData,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    };
    const saved = localStorage.getItem('solar_data_messages');
    const messages = saved ? JSON.parse(saved) : [];
    localStorage.setItem('solar_data_messages', JSON.stringify([newMessage, ...messages]));
    setStatus('success');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <>
      <PageBanner 
        title="Let's Build the Future" 
        imagePath="/images/light_eco_city_1791612526207.png"
        breadcrumb="Contact"
      />

      <div style={{ backgroundColor: 'var(--sky-100)', minHeight: '100vh', paddingBottom: '6rem', width: '100%' }}>
        
        {/* Glassmorphic Data Cards */}
         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', padding: '3rem clamp(1rem, 4vw, 5%) 1rem clamp(1rem, 4vw, 5%)', position: 'relative', zIndex: 10, justifyContent: 'center', marginBottom: '2rem', width: '100%', boxSizing: 'border-box' }}>
          <TiltCard style={{ flex: '1 1 240px', maxWidth: '350px', width: '100%' }}>
            <div className="feature-card" style={{ background: 'var(--white)', backdropFilter: 'blur(12px)', border: '1px solid rgba(18, 48, 107, 0.1)', padding: '2rem 1.2rem', boxShadow: '0 15px 35px rgba(18, 48, 107, 0.08)', borderRadius: '20px', width: '100%', height: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
              <div style={{ marginBottom: '1rem' }}><Phone size={40} color="var(--teal-500)" /></div>
              <h3 style={{ color: 'var(--navy-900)', marginBottom: '0.5rem' }}>Phone Support</h3>
              <p style={{ color: 'var(--teal-600)', fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>1-800-SOLAR-NOW</p>
            </div>
          </TiltCard>
          
          <TiltCard style={{ flex: '1 1 240px', maxWidth: '350px', width: '100%' }}>
             <div className="feature-card" style={{ background: 'var(--white)', backdropFilter: 'blur(12px)', border: '1px solid rgba(18, 48, 107, 0.1)', padding: '2rem 1.2rem', boxShadow: '0 15px 35px rgba(18, 48, 107, 0.08)', borderRadius: '20px', width: '100%', height: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
              <div style={{ marginBottom: '1rem' }}><Mail size={40} color="var(--teal-500)" /></div>
              <h3 style={{ color: 'var(--navy-900)', marginBottom: '0.5rem' }}>Email Us</h3>
              <p style={{ color: 'var(--teal-600)', fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>hello@novasolar.test</p>
            </div>
          </TiltCard>

          <TiltCard style={{ flex: '1 1 240px', maxWidth: '350px', width: '100%' }}>
            <div className="feature-card" style={{ background: 'var(--white)', backdropFilter: 'blur(12px)', border: '1px solid rgba(18, 48, 107, 0.1)', padding: '2rem 1.2rem', boxShadow: '0 15px 35px rgba(18, 48, 107, 0.08)', borderRadius: '20px', width: '100%', height: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
              <div style={{ marginBottom: '1rem' }}><Building size={40} color="var(--teal-500)" /></div>
              <h3 style={{ color: 'var(--navy-900)', marginBottom: '0.5rem' }}>Headquarters</h3>
              <p style={{ color: 'var(--teal-600)', fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>123 Energy Way, Eco City</p>
            </div>
          </TiltCard>
        </div>

        {/* Form UI */}
        <div style={{ padding: '0 clamp(1rem, 4vw, 5%)', display: 'flex', justifyContent: 'center', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ width: '100%', maxWidth: '800px', background: 'var(--white)', borderRadius: '24px', border: '1px solid rgba(18, 48, 107, 0.1)', padding: 'clamp(1.5rem, 4vw, 4rem)', boxShadow: '0 15px 40px rgba(18, 48, 107, 0.08)', position: 'relative', boxSizing: 'border-box' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--navy-900)', margin: '0 0 1rem 0' }}>Drop us a message</h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1.1rem' }}>Whether you have a question about pricing, installation process, or just want to explore possibilities, our experts are ready.</p>
            </div>

            {status === 'success' ? (
              <div style={{ background: 'rgba(20, 163, 168, 0.08)', padding: '4rem 2rem', borderRadius: '16px', border: '1px solid rgba(20, 163, 168, 0.3)', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem' }}><CheckCircle size={64} color="var(--teal-500)" /></div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--teal-600)', fontSize: '2rem' }}>Message Securely Sent</h3>
                <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', marginBottom: '2rem' }}>Thank you. One of our energy consultants will review your information and reach out within 24 hours.</p>
                <button className="btn btn-outline" style={{ borderColor: 'var(--teal-600)', color: 'var(--teal-600)' }} onClick={() => setStatus('idle')}>Submit Another Inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '12px', border: '1px solid #D5E1EE', background: 'var(--sky-100)', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} 
                    onFocus={(e) => {e.target.style.border = '1px solid var(--teal-500)'; e.target.style.background = 'white'}}
                    onBlur={(e) => {e.target.style.border = '1px solid #D5E1EE'; e.target.style.background = 'var(--sky-100)'}}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '12px', border: '1px solid #D5E1EE', background: 'var(--sky-100)', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} 
                    onFocus={(e) => {e.target.style.border = '1px solid var(--teal-500)'; e.target.style.background = 'white'}}
                    onBlur={(e) => {e.target.style.border = '1px solid #D5E1EE'; e.target.style.background = 'var(--sky-100)'}}
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Company or Property Name (Optional)" 
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid #D5E1EE', background: 'var(--sky-100)', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} 
                  onFocus={(e) => {e.target.style.border = '1px solid var(--teal-500)'; e.target.style.background = 'white'}}
                  onBlur={(e) => {e.target.style.border = '1px solid #D5E1EE'; e.target.style.background = 'var(--sky-100)'}}
                />
                <textarea 
                  placeholder="How can we help you?" 
                  rows="6" 
                  required 
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid #D5E1EE', background: 'var(--sky-100)', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', resize: 'vertical' }}
                  onFocus={(e) => {e.target.style.border = '1px solid var(--teal-500)'; e.target.style.background = 'white'}}
                  onBlur={(e) => {e.target.style.border = '1px solid #D5E1EE'; e.target.style.background = 'var(--sky-100)'}}
                ></textarea>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ padding: '1.2rem', fontSize: '1.1rem', fontWeight: 'bold', marginTop: '0.5rem' }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
