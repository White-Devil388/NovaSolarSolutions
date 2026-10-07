import React, { useState } from 'react';
import TiltCard from '../components/ui/TiltCard';

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
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Immersive Ambient Header */}
      <div style={{ height: '60vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.4) 0%, rgba(2, 6, 23, 1) 100%), url(/images/commercial.png)', backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center', padding: '0 5%' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', textShadow: '0 10px 30px rgba(0,0,0,0.9)', margin: 0, fontWeight: '800' }}>
          Let's Build the <span style={{ color: 'var(--primary)' }}>Future</span>
        </h1>
      </div>

      {/* Glassmorphic Data Cards */}
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '0 5%', marginTop: '-8rem', position: 'relative', zIndex: 10, justifyContent: 'center', marginBottom: '4rem' }}>
        <TiltCard style={{ flex: '1 1 250px', maxWidth: '350px' }}>
          <div className="feature-card" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.8) 100%), url(/images/process_consultation.png)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', textAlign: 'center', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2.5rem 1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderRadius: '20px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', position: 'relative', zIndex: 1, textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>📞</div>
            <h3 style={{ color: 'white', marginBottom: '0.5rem', position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Phone Support</h3>
            <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.1rem', margin: 0, position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>1-800-SOLAR-NOW</p>
          </div>
        </TiltCard>
        
        <TiltCard style={{ flex: '1 1 250px', maxWidth: '350px' }}>
           <div className="feature-card" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.8) 100%), url(/images/proposal_digital.png)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', textAlign: 'center', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2.5rem 1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderRadius: '20px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', position: 'relative', zIndex: 1, textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>✉️</div>
            <h3 style={{ color: 'white', marginBottom: '0.5rem', position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Email Us</h3>
            <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.1rem', margin: 0, position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>hello@novasolar.test</p>
          </div>
        </TiltCard>

        <TiltCard style={{ flex: '1 1 250px', maxWidth: '350px' }}>
          <div className="feature-card" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.8) 100%), url(/images/residential.png)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', textAlign: 'center', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2.5rem 1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderRadius: '20px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', position: 'relative', zIndex: 1, textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>🏢</div>
            <h3 style={{ color: 'white', marginBottom: '0.5rem', position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Headquarters</h3>
            <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.1rem', margin: 0, position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>123 Energy Way, Eco City</p>
          </div>
        </TiltCard>
      </div>

      {/* Elevated Form UI */}
      <div style={{ padding: '0 5%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '800px', backgroundImage: 'linear-gradient(to right, rgba(2, 6, 23, 0.9) 0%, rgba(2, 6, 23, 0.6) 100%), url(/images/solarcraft-workers-installing-solar-panel-5wwj88d06ib7ycn8.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(2rem, 5vw, 4rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'white', margin: '0 0 1rem 0' }}>Drop us a message</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Whether you have a question about pricing, installation process, or just want to explore possibilities, our experts are ready.</p>
          </div>

          {status === 'success' ? (
            <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '4rem 2rem', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center', boxShadow: '0 0 30px rgba(16, 185, 129, 0.15)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>✅</div>
              <h3 style={{ marginBottom: '1rem', color: '#10b981', fontSize: '2rem' }}>Message Securely Sent</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginBottom: '2rem' }}>Thank you. One of our energy consultants will review your information and reach out within 24 hours.</p>
              <button className="btn btn-outline" style={{ borderColor: '#10b981', color: '#10b981' }} onClick={() => setStatus('idle')}>Submit Another Inquiry</button>
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
                  style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} 
                  onFocus={(e) => {e.target.style.border = '1px solid var(--primary)'; e.target.style.background = 'rgba(255,255,255,0.08)'}}
                  onBlur={(e) => {e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'}}
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} 
                  onFocus={(e) => {e.target.style.border = '1px solid var(--primary)'; e.target.style.background = 'rgba(255,255,255,0.08)'}}
                  onBlur={(e) => {e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'}}
                />
              </div>
              <input 
                type="text" 
                placeholder="Company or Property Name (Optional)" 
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} 
                onFocus={(e) => {e.target.style.border = '1px solid var(--primary)'; e.target.style.background = 'rgba(255,255,255,0.08)'}}
                onBlur={(e) => {e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'}}
              />
              <textarea 
                placeholder="How can we help you?" 
                rows="6" 
                required 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', resize: 'vertical' }}
                onFocus={(e) => {e.target.style.border = '1px solid var(--primary)'; e.target.style.background = 'rgba(255,255,255,0.08)'}}
                onBlur={(e) => {e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'}}
              ></textarea>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ padding: '1.2rem', fontSize: '1.1rem', fontWeight: 'bold', marginTop: '0.5rem', boxShadow: '0 10px 20px rgba(245, 158, 11, 0.2)' }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
