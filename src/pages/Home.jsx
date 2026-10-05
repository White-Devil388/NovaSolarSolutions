import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/ui/TiltCard';

const CountUp = ({ end, duration = 2500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let observer;
    if (ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    
    let startTime = null;
    let animationFrameId = null;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      
      const easeOut = progressRatio === 1 ? 1 : 1 - Math.pow(2, -10 * progressRatio);
      
      setCount(Math.floor(easeOut * end));
      
      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

function Home() {
  return (
    <>
      <section className="hero" style={{ marginTop: '-80px' }}>
        <div className="hero-overlay"></div>
        <video src="/upscaled-video.mp4" className="hero-bg" autoPlay loop muted playsInline></video>
        
        <div className="hero-content">
          <div className="hero-badge">Future of Energy</div>
          <h1 className="hero-title">Power Your Life With <span>Sunlight</span></h1>
          <p className="hero-desc">
            Experience the next generation of solar technology. Sleek design, maximum efficiency, and sustainable energy for your modern home.
          </p>
          <div>
            <Link to="/calculator"><button className="btn btn-primary">Get a Free Quote</button></Link>
            <Link to="/solutions"><button className="btn btn-outline">Our Technology</button></Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="mobile-col trust-bar-responsive" style={{ display: 'flex', justifyContent: 'center', gap: '3rem', padding: '2rem 5%', backgroundColor: 'rgba(0,0,0,0.3)', borderBottom: '1px solid var(--glass-border)', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>⭐ Certified Installation</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>🛡️ 25-Year Warranty</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>📞 24/7 Expert Support</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>☀️ Premium Solar Tech</span>
      </div>

      {/* Company Statistics Section */}
      <section style={{ textAlign: 'center', background: 'var(--bg-darker)', padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', height: '50%', background: 'var(--primary)', filter: 'blur(120px)', opacity: '0.1', zIndex: 0, pointerEvents: 'none' }}></div>
        <div className="stats-block-responsive" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {[
            { end: 10, suffix: "+", label: "Years Experience" },
            { end: 5000, suffix: "+", label: "Installations" },
            { end: 50, suffix: "+", label: "MW Installed" },
            { end: 99, suffix: "%", label: "Satisfaction" }
          ].map((stat, i) => (
            <TiltCard key={i} style={{ flex: '1 1 200px', maxWidth: '280px' }}>
               <div style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(15, 23, 42, 0.4) 100%)', 
                  backdropFilter: 'blur(12px)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '24px', 
                  padding: '2.5rem 1rem', 
                  width: '100%', 
                  height: '100%',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                 <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary)', textShadow: '0 0 20px rgba(245, 158, 11, 0.4)', marginBottom: '0.5rem' }}>
                    <CountUp end={stat.end} suffix={stat.suffix} />
                 </div>
                 <div style={{ color: 'white', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem', textAlign: 'center' }}>{stat.label}</div>
               </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Installation Process */}
      <section className="process-section">
        <div className="section-header" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="section-title">The Installation Process</h2>
          <p className="section-subtitle" style={{ color: 'var(--text-light)' }}>A seamless journey from your first inquiry to powering on your home.</p>
        </div>
        
        <div className="process-cards-container" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem 0.5rem 2rem 0.5rem', flexWrap: 'wrap', position: 'relative', zIndex: 1, justifyContent: 'center' }}>
          <div className="process-card" tabIndex="0" role="article" aria-label="Step 1: Consultation" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.98) 100%), url("/images/process_consultation.png")', backgroundSize: 'cover', backgroundPosition: 'center', outline: 'none' }}>
            <div className="process-step-num" style={{ textShadow: '0 2px 4px rgba(0,0,0,1)' }}>01</div>
            <h3 style={{ textShadow: '0 2px 4px rgba(0,0,0,1)' }}>Consultation</h3>
            <p style={{ color: '#f8fafc', opacity: 1, textShadow: '0 1px 4px rgba(0,0,0,1)', fontWeight: '500' }}>We understand your energy requirements and goals to find exactly what you need.</p>
          </div>
          <div className="process-card" tabIndex="0" role="article" aria-label="Step 2: Site Assessment" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.98) 100%), url("/images/roof_3d.png")', backgroundSize: 'cover', backgroundPosition: 'center', outline: 'none' }}>
            <div className="process-step-num" style={{ textShadow: '0 2px 4px rgba(0,0,0,1)' }}>02</div>
            <h3 style={{ textShadow: '0 2px 4px rgba(0,0,0,1)' }}>Site Assessment</h3>
            <p style={{ color: '#f8fafc', opacity: 1, textShadow: '0 1px 4px rgba(0,0,0,1)', fontWeight: '500' }}>We analyze your roof digitally in 3D for perfect, shaded-free panel mapping.</p>
          </div>
          <div className="process-card" tabIndex="0" role="article" aria-label="Step 3: Proposal" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.98) 100%), url("/images/proposal_digital.png")', backgroundSize: 'cover', backgroundPosition: 'center', outline: 'none' }}>
            <div className="process-step-num" style={{ textShadow: '0 2px 4px rgba(0,0,0,1)' }}>03</div>
            <h3 style={{ textShadow: '0 2px 4px rgba(0,0,0,1)' }}>Proposal</h3>
            <p style={{ color: '#f8fafc', opacity: 1, textShadow: '0 1px 4px rgba(0,0,0,1)', fontWeight: '500' }}>You receive an upfront digital proposal detailing your ROI and total savings.</p>
          </div>
          <div className="process-card" tabIndex="0" role="article" aria-label="Step 4: Installation" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.98) 100%), url("/images/installation_bg.png")', backgroundSize: 'cover', backgroundPosition: 'center', outline: 'none' }}>
            <div className="process-step-num" style={{ textShadow: '0 2px 4px rgba(0,0,0,1)' }}>04</div>
            <h3 style={{ textShadow: '0 2px 4px rgba(0,0,0,1)' }}>Installation</h3>
            <p style={{ color: '#f8fafc', opacity: 1, textShadow: '0 1px 4px rgba(0,0,0,1)', fontWeight: '500' }}>Swift, professional installation by our certified and insured experts.</p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-header">
          <h2 className="section-title">Why Choose NovaSolar?</h2>
          <p className="section-subtitle">We blend cutting-edge photovoltaic technology with elegant architectural design.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card" tabIndex="0" role="article" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.98) 100%), url("/images/tech_flow.png")', backgroundSize: 'cover', backgroundPosition: 'center', outline: 'none' }}>
            <div className="feature-icon" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>⚡</div>
            <h3 style={{ position: 'relative', zIndex: 2, textShadow: '0 2px 4px rgba(0,0,0,1)' }}>Max Flow Technology</h3>
            <p style={{ position: 'relative', zIndex: 2, color: '#f8fafc', opacity: 1, textShadow: '0 1px 4px rgba(0,0,0,1)', fontWeight: '500' }}>Our proprietary micro-inverters ensure maximum energy capture even during low-light conditions and partial shading.</p>
          </div>
          <div className="feature-card" tabIndex="0" role="article" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.98) 100%), url("/images/weather_resist.png")', backgroundSize: 'cover', backgroundPosition: 'center', outline: 'none' }}>
            <div className="feature-icon" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>🛡️</div>
            <h3 style={{ position: 'relative', zIndex: 2, textShadow: '0 2px 4px rgba(0,0,0,1)' }}>Weather Resistant</h3>
            <p style={{ position: 'relative', zIndex: 2, color: '#f8fafc', opacity: 1, textShadow: '0 1px 4px rgba(0,0,0,1)', fontWeight: '500' }}>Built with aerospace-grade glass. NovaSolar panels withstand heavy hail, extreme winds, and intense UV exposure.</p>
          </div>
          <div className="feature-card" tabIndex="0" role="article" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.98) 100%), url("/images/smart_monitor.png")', backgroundSize: 'cover', backgroundPosition: 'center', outline: 'none' }}>
            <div className="feature-icon" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>📱</div>
            <h3 style={{ position: 'relative', zIndex: 2, textShadow: '0 2px 4px rgba(0,0,0,1)' }}>Smart Monitoring</h3>
            <p style={{ position: 'relative', zIndex: 2, color: '#f8fafc', opacity: 1, textShadow: '0 1px 4px rgba(0,0,0,1)', fontWeight: '500' }}>Track your energy production and consumption in real-time through our award-winning mobile application.</p>
          </div>
        </div>
      </section>

      <section className="features" style={{ backgroundColor: 'var(--bg-dark)' }}>
        <div className="section-header">
          <div className="hero-badge" style={{ marginBottom: '1rem', color: '#10b981', borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>New Features</div>
          <h2 className="section-title">Experience Your Roof in 3D</h2>
          <p className="section-subtitle">We don't just show you 2D drawings. See your exact roof in 3D before a single panel is installed.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card" tabIndex="0" role="article" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.98) 100%), url("/images/roof_3d.png")', backgroundSize: 'cover', backgroundPosition: 'center', outline: 'none', display: 'flex', flexDirection: 'column' }}>
            <div className="feature-icon" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>🧊</div>
            <h3 style={{ position: 'relative', zIndex: 2, textShadow: '0 2px 4px rgba(0,0,0,1)' }}>3D Rooftop Solar Design</h3>
            <p style={{ position: 'relative', zIndex: 2, color: '#f8fafc', opacity: 1, textShadow: '0 1px 4px rgba(0,0,0,1)', flexGrow: 1, fontWeight: '500' }}>We generate a precise 3D model of your home to show panel placement, shading effects, and estimated savings visually. See it, trust it, and say yes.</p>
            <br />
            <Link to="/contact" style={{ position: 'relative', zIndex: 2 }}><button className="btn btn-outline" style={{width: '100%', padding: '0.5rem', marginTop: 'auto', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)'}}>Book Free 3D Demo</button></Link>
          </div>
          <div className="feature-card" tabIndex="0" role="article" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.98) 100%), url("/images/surya_yojana.png")', backgroundSize: 'cover', backgroundPosition: 'center', outline: 'none', display: 'flex', flexDirection: 'column' }}>
            <div className="feature-icon" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>🇮🇳</div>
            <h3 style={{ position: 'relative', zIndex: 2, textShadow: '0 2px 4px rgba(0,0,0,1)' }}>PM Surya Ghar Yojana</h3>
            <p style={{ position: 'relative', zIndex: 2, color: '#f8fafc', opacity: 1, textShadow: '0 1px 4px rgba(0,0,0,1)', flexGrow: 1, fontWeight: '500' }}>We are certified installers. We assist you end-to-end with the PM Surya Ghar Muft Bijli Yojana to ensure you get maximum government subsidies seamlessly.</p>
            <br />
            <Link to="/about" style={{ position: 'relative', zIndex: 2 }}><button className="btn btn-outline" style={{width: '100%', padding: '0.5rem', marginTop: 'auto', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)'}}>Learn About Subsidies</button></Link>
          </div>
          <div className="feature-card" tabIndex="0" role="article" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.98) 100%), url("/images/proposal_digital.png")', backgroundSize: 'cover', backgroundPosition: 'center', outline: 'none', display: 'flex', flexDirection: 'column' }}>
            <div className="feature-icon" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>📄</div>
            <h3 style={{ position: 'relative', zIndex: 2, textShadow: '0 2px 4px rgba(0,0,0,1)' }}>Transparent Digital Proposals</h3>
            <p style={{ position: 'relative', zIndex: 2, color: '#f8fafc', opacity: 1, textShadow: '0 1px 4px rgba(0,0,0,1)', flexGrow: 1, fontWeight: '500' }}>Receive detailed, interactive solar proposals highlighting your 25-year savings, ROI, and carbon offset, right on your phone in minutes.</p>
            <br />
            <Link to="/calculator" style={{ position: 'relative', zIndex: 2 }}><button className="btn btn-primary" style={{width: '100%', padding: '0.5rem', marginTop: 'auto', boxShadow: '0 4px 10px rgba(0,0,0,0.5)'}}>Calculate Savings</button></Link>
          </div>
        </div>
      </section>

      <section className="page-padding" style={{ backgroundImage: 'linear-gradient(rgba(2, 6, 23, 0.88), rgba(2, 6, 23, 0.95)), url("/images/solarcraft-workers-installing-solar-panel-5wwj88d06ib7ycn8.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="section-header">
          <div className="hero-badge" style={{ marginBottom: '1rem' }}>Success Stories</div>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Real experiences from homeowners who made the switch to NovaSolar.</p>
        </div>
        
        <div className="features-grid" style={{ gap: '2rem' }}>
          <div className="feature-card">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', color: '#000' }}>RS</div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'Outfit' }}>Rajeev Sharma</h4>
                <div style={{ color: 'var(--primary)', fontSize: '0.9rem', marginTop: '4px' }}>⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--text-light)', opacity: 0.9 }}>"I was skeptical about solar at first, but NovaSolar's 3D roof mapping completely sold me. The installation was flawless, and my electricity bill has literally dropped to zero. Highly recommend!"</p>
          </div>
          
          <div className="feature-card">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', color: '#000' }}>AS</div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'Outfit' }}>Ayesha Singh</h4>
                <div style={{ color: 'var(--primary)', fontSize: '0.9rem', marginTop: '4px' }}>⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--text-light)', opacity: 0.9 }}>"The team helped us navigate the PM Surya Ghar subsidy effortlessly. The all-black panels look incredibly premium on our modern roof. Best aesthetic investment we've ever made."</p>
          </div>
          
          <div className="feature-card">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', color: '#000' }}>VK</div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'Outfit' }}>Vikram Kumar</h4>
                <div style={{ color: 'var(--primary)', fontSize: '0.9rem', marginTop: '4px' }}>⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--text-light)', opacity: 0.9 }}>"Their app is fantastic! I can track generation directly on my phone. We had a minor query post-installation, and their 24/7 expert support handled it within minutes. Exceptional service."</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
