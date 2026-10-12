import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, Leaf, Landmark, BatteryCharging, Zap, MapPin, ArrowRight, Star, Sun, ShieldCheck, Wrench, Cpu, ChevronDown, Smartphone, Activity, Bell, Mail } from 'lucide-react';

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: "Rajeev Sharma",
    role: "Homeowner",
    review: "I was skeptical about solar at first, but NovaSolar's 3D roof mapping completely sold me. The installation was flawless, and my electricity bill has literally dropped to zero. Highly recommend!",
    rating: 5,
    status: 'Published'
  },
  {
    id: 2,
    name: "Ayesha Singh",
    role: "Business Owner",
    review: "The team helped us navigate the PM Surya Ghar subsidy effortlessly. The all-black panels look incredibly premium on our modern roof. Best aesthetic investment we've ever made.",
    rating: 5,
    status: 'Published'
  },
  {
    id: 3,
    name: "Vikram Kumar",
    role: "Homeowner",
    review: "Their app is fantastic! I can track generation directly on my phone. We had a minor query post-installation, and their 24/7 expert support handled it within minutes. Exceptional service.",
    rating: 5,
    status: 'Published'
  }
];

function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', location: '', requirement: '' });
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [partners, setPartners] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = (key, fallback, setter) => {
      const saved = localStorage.getItem(`solar_dataset_${key}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        const published = parsed.filter(p => p.status === 'Published');
        setter(published.length > 0 ? published : fallback);
      } else {
        setter(fallback);
        const cmsMapped = fallback.map(p => ({
          ...p,
          date: new Date().toISOString().split('T')[0],
          status: 'Published'
        }));
        localStorage.setItem(`solar_dataset_${key}`, JSON.stringify(cmsMapped));
      }
    };

    loadData('testimonials', INITIAL_TESTIMONIALS, setTestimonials);
    loadData('stats', [
      { id: 1, label: '10M+', description: 'Tons CO2 Reduced' },
      { id: 2, label: '25K+', description: 'Homes Powered' },
      { id: 3, label: '150+', description: 'Cities Covered' }
    ], setStats);
    loadData('process', [
      { id: 1, stepNum: '01', title: 'Free Consultation', description: 'We understand your energy requirements, evaluate your roof space, and determine the optimal system sizing.', color: '' },
      { id: 2, stepNum: '02', title: 'Custom System Design', description: 'We create a precise 3D model of your home for shaded-free panel mapping and optimized generation.', color: 'var(--teal-600)' },
      { id: 3, stepNum: '03', title: 'Professional Installation', description: 'Swift mounting, wiring, and commissioning by our certified engineering team to ensure safety and efficiency.', color: 'var(--blue-500)' },
      { id: 4, stepNum: '04', title: 'Start Saving', description: 'Monitor your performance in real-time on our app, enjoy government subsidies, and watch your electricity bills drop.', color: 'var(--blue-500)' }
    ], setProcessSteps);
    loadData('partners', [
      { id: 1, name: 'ECO POWER' }, { id: 2, name: 'SUNERGY LLC' }, { id: 3, name: 'GREEN TECH CORP' }, { id: 4, name: 'NATIONWIDE SOLAR' }
    ], setPartners);
    loadData('faq', [
      { id: 1, question: "How much can I actually save?", answer: "Most customers see between 70% to 100% reduction in their electricity bills. Factors include your current usage, roof shading, and local utility rates. Our free consultation provides a precise estimate." },
      { id: 2, question: "Do you offer financing?", answer: "Yes! We work with top financial partners to provide 0% EMI and low-interest solar loans, allowing you to pay for your system using the money you save on electricity." },
      { id: 3, question: "What happens during a power cut?", answer: "If you have a grid-tied system without batteries, it will shut down for safety reasons. If you choose our Hybrid or Off-grid battery solutions, you will have seamless backup power during outages." },
      { id: 4, question: "How do I claim government subsidies?", answer: "We handle the entire claiming process! From MNRE registration to net-metering approval, our team processes all paperwork to ensure you receive the PM Surya Ghar subsidy directly to your bank account." }
    ], setFaqs);
    loadData('blogs', [
      { id: 1, title: 'How Many Solar Panels Do You Need?', author: 'Tech Guides • 5 min read', content: 'A comprehensive guide to calculating your home energy requirements and sizing your solar array perfectly.', image: '/images/roof_3d.png', date: 'Oct 05, 2026' },
      { id: 2, title: 'Monocrystalline vs Polycrystalline', author: 'Analysis • 4 min read', content: 'Which technology is right for you? We break down the cost, efficiency, and aesthetics of both options.', image: '/images/tech_flow.png', date: 'Sep 28, 2026' },
      { id: 3, title: 'New Solar Incentives for 2025', author: 'Industry News • 3 min read', content: 'Discover the latest tax credits and local rebates that can significantly reduce your installation costs.', image: '/images/smart_monitor.png', date: 'Sep 12, 2026' }
    ], setBlogs);

  }, []);

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const saved = localStorage.getItem('solarLeads');
    const DUMMY_LEADS = [
      { id: "L-492", name: "Ramesh Kumar", phone: "+91 98765 43210", location: "Delhi", requirement: "Residential - 5kW", status: "New" },
      { id: "L-491", name: "Vikas Enterprises", phone: "+91 91234 56789", location: "Pune", requirement: "Commercial - 50kW", status: "Contacted" }
    ];
    const existingLeads = saved ? JSON.parse(saved) : DUMMY_LEADS;
    const newLead = {
      id: `L-${Math.floor(Math.random() * 900) + 100}`,
      ...formData,
      status: 'New'
    };
    
    localStorage.setItem('solarLeads', JSON.stringify([newLead, ...existingLeads]));
    setIsQuoteModalOpen(false);
    setFormData({ name: '', phone: '', location: '', requirement: '' });
    alert("Thank you! Your details have been submitted successfully. Our expert will contact you shortly.");
  };

  return (
    <>
      {/* 1. Hero */}
      <section className="hero" style={{ marginTop: '-80px', position: 'relative', overflow: 'hidden' }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-bg" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }}
        >
          <source src="/upscaled-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
        
        <div className="hero-content">
          <h1 className="hero-title">Slash Your Energy Bills with <span>Solar Power</span></h1>
          <p className="hero-desc">
            Experience the next generation of solar technology. Sleek design, maximum efficiency, and sustainable energy for your modern home.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => setIsQuoteModalOpen(true)}>Get Free Solar Quote</button>
            <Link to="/calculator" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Calculate Savings</Link>
          </div>
        </div>
      </section>

      {/* 1.5 Environmental Impact Stats */}
      <section className="home-stats-section">
        {stats.map((stat, i) => (
          <motion.div key={stat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.2 }}>
            <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--teal-500)', marginBottom: '0.5rem', fontWeight: '800' }}>{stat.label}</h3>
            <p style={{ fontSize: '1rem', color: 'var(--sky-200)', textTransform: 'uppercase', letterSpacing: '2px' }}>{stat.description}</p>
          </motion.div>
        ))}
      </section>

      {/* 1.8 Ecosystem Services */}
      <section style={{ padding: '6rem 5%', backgroundColor: 'var(--sky-100)' }}>
        <div className="section-header">
          <h2 className="section-title">Comprehensive Solar Ecosystem</h2>
          <p className="section-subtitle">Everything you need to future-proof your energy needs.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {[
            { icon: <Sun size={32} />, title: "High-Efficiency Panels", desc: "Tier-1 Mono PERC and TOPCon modules for maximum generation in minimal space." },
            { icon: <BatteryCharging size={32} />, title: "Battery Storage", desc: "Li-ion and LFP backup systems to keep your house running during grid failures." },
            { icon: <Cpu size={32} />, title: "Smart Inverters", desc: "Advanced string and hybrid inverters with WiFi tracking and intelligent load distribution." },
            { icon: <Wrench size={32} />, title: "O&M Support", desc: "24/7 proactive monitoring, preventive maintenance, and rapid technical support." }
          ].map((srv, i) => (
            <div key={i} style={{ background: 'var(--white)', padding: '2.5rem 2rem', borderRadius: '16px', border: '1px solid #D5E1EE', boxShadow: '0 10px 30px rgba(18,48,107,0.05)', textAlign: 'center', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '70px', height: '70px', margin: '0 auto 1.5rem', background: 'rgba(20, 163, 168, 0.1)', color: 'var(--teal-600)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {srv.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '1rem' }}>{srv.title}</h3>
              <p style={{ color: 'var(--text-body)', lineHeight: '1.6' }}>{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Why Go Solar */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="features"
      >
        <div className="section-header">
          <h2 className="section-title">Why Go Solar?</h2>
          <p className="section-subtitle">We blend cutting-edge photovoltaic technology with elegant architectural design.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><IndianRupee /></div>
            <h3>Massive Savings</h3>
            <p>Slash your electricity bills drastically or even drop them to zero by generating your own power.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Leaf /></div>
            <h3>Clean Energy</h3>
            <p>Drastically reduce your carbon footprint and rely on renewable solar power for decades.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Landmark /></div>
            <h3>Government Subsidies</h3>
            <p>Leverage the PM Surya Ghar Yojana and local subsidies to immediately offset your capital cost.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><BatteryCharging /></div>
            <h3>Energy Independence</h3>
            <p>Produce and store your own energy. Never worry about power cuts and grid failures again.</p>
          </div>
        </div>
      </motion.section>

      {/* 3. How Our Solar Works */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="process-section"
      >
        <div className="section-header">
          <h2 className="section-title" style={{ color: 'var(--white)' }}>How Our Solar Works</h2>
        </div>
        
        <div className="features-grid" style={{ zIndex: 1, position: 'relative' }}>
          {processSteps.map((step, i) => (
            <div key={step.id} className="process-card" style={{ borderColor: step.color || 'var(--sky-200)' }}>
              <div className="process-step-num" style={{ color: step.color || 'var(--navy-900)' }}>{step.stepNum}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4. Our Solar Solutions & Calculator */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="showcase" style={{ background: 'linear-gradient(180deg, rgba(11,31,75,0.75), rgba(18,48,107,0.55)), url("/images/light_eco_city_1791612526207.png")', backgroundSize: 'cover' }}
      >
        <div className="showcase-content">
          <div style={{ background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', padding: '3rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 8px 30px rgba(18,48,107,0.1)' }}>
            <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '1.5rem', textAlign: 'left' }}>Estimate Your Savings</h2>
            <p style={{ color: 'var(--text-body)', marginBottom: '2rem' }}>Answer a few quick questions to see how much you could save over the next 25 years.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', color: 'var(--navy-900)', marginBottom: '0.5rem' }}>Average Monthly Electric Bill (₹)</label>
                <input type="number" placeholder="Enter amount" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #D5E1EE' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', color: 'var(--navy-900)', marginBottom: '0.5rem' }}>State</label>
                  <select style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #D5E1EE', background: 'white' }}>
                    <option>Select State</option>
                    <option>Delhi</option>
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', color: 'var(--navy-900)', marginBottom: '0.5rem' }}>City</label>
                  <select style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #D5E1EE', background: 'white' }}>
                    <option>Select City</option>
                  </select>
                </div>
              </div>
              
              <button className="btn btn-primary" onClick={() => navigate('/calculator')} style={{ width: '100%', marginTop: '1rem', background: 'linear-gradient(135deg, var(--teal-600) 0%, var(--blue-600) 100%)' }}>
                Calculate Your Savings <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="showcase-img-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="feature-card" style={{ padding: '0', overflow: 'hidden', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
            <img src="/images/surya_yojana.png" alt="Residential" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>Residential Solar Systems</h3>
              <p style={{ margin: '0 0 1.5rem 0', flex: 1 }}>Power your home cleanly and efficiently. We handle the entire engineering, mapping, and installation process.</p>
              <Link to="/products" className="btn btn-outline" style={{ background: 'var(--navy-800)', color: 'white', border: 'none', marginLeft: 0, alignSelf: 'flex-start' }}>Learn More <ArrowRight size={16} /></Link>
            </div>
          </div>
          
          <div className="feature-card" style={{ padding: '0', overflow: 'hidden', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
            <img src="/images/tech_flow.png" alt="Commercial" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>Commercial Installations</h3>
              <p style={{ margin: '0 0 1.5rem 0', flex: 1 }}>Reduce operational costs drastically for your business and warehouse facilities with our enterprise solutions.</p>
              <Link to="/solutions" className="btn btn-outline" style={{ background: 'var(--navy-800)', color: 'white', border: 'none', marginLeft: 0, alignSelf: 'flex-start' }}>Learn More <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4.5 Zero Upfront Finance */}
      <section style={{ padding: '5rem 5%', background: 'linear-gradient(135deg, var(--sky-100) 0%, var(--white) 100%)', borderTop: '1px solid var(--sky-200)', borderBottom: '1px solid var(--sky-200)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(20, 163, 168, 0.1)', color: 'var(--teal-600)', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem' }}>FLEXIBLE FINANCING</div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--navy-900)', marginBottom: '1rem', lineHeight: '1.2' }}>Solar That Pays For Itself.</h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>We believe clean energy should be accessible to everyone. That's why we offer ₹0 down payment options and 0% EMI financing on approved credit.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--navy-900)', fontWeight: '500' }}><ShieldCheck color="var(--teal-500)" size={24} /> 100% Transparency, No Hidden Fees</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--navy-900)', fontWeight: '500' }}><ShieldCheck color="var(--teal-500)" size={24} /> PM Surya Ghar Subsidy Assistance</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--navy-900)', fontWeight: '500' }}><ShieldCheck color="var(--teal-500)" size={24} /> EMI lower than your current electric bill</li>
            </ul>
            <button className="btn btn-primary" onClick={() => setIsQuoteModalOpen(true)}>Explore Financing Options</button>
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <div style={{ background: 'var(--navy-900)', color: 'white', padding: '2.5rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 20px 40px rgba(11,31,75,0.15)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--sky-200)', marginBottom: '0.5rem' }}>0%</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Interest Rates</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Up to 12 months</div>
            </div>
            <div style={{ background: 'var(--teal-500)', color: 'white', padding: '2.5rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 20px 40px rgba(20, 163, 168, 0.2)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: 'translateY(2rem)' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>₹0</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Down Payment</div>
              <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>For eligible homes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.8 Smart App Integration */}
      <section style={{ padding: '6rem 5%', background: 'var(--white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', flexDirection: 'row-reverse' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--navy-900)', marginBottom: '1rem', lineHeight: '1.2' }}>Total Control in Your Pocket.</h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>The NovaSolar App connects directly to your smart inverter, giving you real-time visibility into your home's energy ecosystem from anywhere in the world.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'var(--sky-100)', padding: '1.5rem', borderRadius: '12px' }}>
                <Activity color="var(--teal-600)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: 'var(--navy-900)', marginBottom: '0.4rem' }}>Live Tracking</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', margin: 0 }}>Monitor generation vs consumption in real-time.</p>
              </div>
              <div style={{ background: 'var(--sky-100)', padding: '1.5rem', borderRadius: '12px' }}>
                <Bell color="var(--teal-600)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: 'var(--navy-900)', marginBottom: '0.4rem' }}>Smart Alerts</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', margin: 0 }}>Instant notifications for maintenance and dips.</p>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            {/* Phone Mockup Frame */}
            <div style={{ width: '280px', height: '580px', background: 'var(--navy-900)', borderRadius: '40px', padding: '12px', boxShadow: '0 30px 60px rgba(11,31,75,0.2), 0 0 0 6px #dde6f0', position: 'relative' }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #1e293b, #0f172a)', borderRadius: '28px', overflow: 'hidden', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', marginBottom: '2rem' }}>
                   <span style={{ fontSize: '0.8rem' }}>9:41</span>
                   <div style={{ display: 'flex', gap: '4px' }}>
                     <div style={{ width: '16px', height: '8px', background: 'white', borderRadius: '2px' }}></div>
                   </div>
                </div>
                <div style={{ color: 'var(--sky-200)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Current Generation</div>
                <div style={{ color: 'white', fontSize: '3rem', fontWeight: '300', marginBottom: '2rem' }}>4.2<span style={{ fontSize: '1.2rem', color: 'var(--teal-500)' }}> kW</span></div>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}><span>Daily Yield</span><span style={{ color: 'var(--teal-500)' }}>24 kWh</span></div>
                   <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}><div style={{ width: '75%', height: '100%', background: 'var(--teal-500)', borderRadius: '3px' }}></div></div>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', flex: 1 }}>
                   <div style={{ color: 'white', fontSize: '0.9rem', marginBottom: '1rem' }}>System Health</div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#10b981' }}><ShieldCheck size={20} /> <span style={{ fontSize: '0.9rem' }}>All Panels Optimal</span></div>
                </div>
              </div>
            </div>
            {/* Ambient Glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'rgba(20, 163, 168, 0.15)', filter: 'blur(50px)', zIndex: -1, borderRadius: '50%' }}></div>
          </div>
        </div>
      </section>

      {/* 5. What Our Customers Say */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ amount: 0.1 }}
        transition={{ duration: 0.6 }}
        style={{ padding: '6rem 5%', background: 'var(--sky-100)' }}
      >
        <div className="section-header">
          <h2 className="section-title">What Our Customers Say</h2>
        </div>
        
        <div className="features-grid">
          {testimonials.map(t => (
            <div key={t.id} className="feature-card" style={{ textAlign: 'left', background: 'var(--white)', border: '1px solid rgba(255,255,255,0.6)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--sky-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', color: 'var(--navy-900)' }}>
                  {t.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--navy-900)' }}>{t.name}</h4>
                  <div style={{ color: 'var(--gold-400)', fontSize: '0.9rem', margin: '4px 0', display: 'flex' }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={`solid-${i}`} fill="var(--gold-400)" color="var(--gold-400)" size={16} />
                    ))}
                  </div>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-body)' }}>"{t.review}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--teal-600)', fontSize: '0.9rem', fontWeight: '600' }}>
                <MapPin size={16} /> Verified Installation
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 5.5 FAQ Section */}
      <section style={{ padding: '6rem 5%', backgroundColor: 'var(--white)' }}>
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about switching to solar.</p>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, i) => (
            <details key={faq.id} style={{ background: 'var(--sky-100)', borderRadius: '12px', padding: '1.5rem', border: '1px solid #D5E1EE', cursor: 'pointer', boxShadow: '0 4px 15px rgba(18,48,107,0.03)' }}>
              <summary style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--navy-900)', display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>
                {faq.question}
                <ChevronDown size={20} color="var(--teal-600)" />
              </summary>
              <p style={{ marginTop: '1rem', color: 'var(--text-body)', lineHeight: '1.6', paddingTop: '1rem', borderTop: '1px solid var(--white)' }}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 6. Trusted By */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 5%', backgroundColor: 'var(--sky-100)' }}>
        <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
          <span style={{ height: '1px', width: '40px', background: 'var(--sky-200)', marginRight: '1rem' }}></span>
          Trusted by homeowners & businesses nationwide
          <span style={{ height: '1px', width: '40px', background: 'var(--sky-200)', marginLeft: '1rem' }}></span>
        </h3>
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', opacity: 0.6 }}>
          {partners.map((partner) => (
            <span key={partner.id} style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--navy-800)' }}>{partner.name}</span>
          ))}
        </div>
      </div>

      {/* 7. Latest Insights (Blog Preview) */}
      <section style={{ padding: '6rem 5%', background: 'var(--white)' }}>
        <div className="section-header" style={{ marginBottom: '3rem' }}>
           <h2 className="section-title">Latest Insights</h2>
           <p className="section-subtitle">Catch up on the latest solar trends, government subsidies, and tech.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
           {blogs.slice(0, 3).map((post, i) => (
             <div key={post.id} style={{ flex: '1 1 300px', maxWidth: '400px', borderRadius: '16px', border: '1px solid #D5E1EE', overflow: 'hidden', transition: 'box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 15px 30px rgba(18,48,107,0.08)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'} onClick={() => navigate('/resources/blog')}>
               <div style={{ height: '200px', width: '100%', background: `url(${post.image}) center/cover` }}>
                 <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.parentNode.style.background = 'linear-gradient(45deg, #0b1f4b, #12306b)'; }} />
               </div>
               <div style={{ padding: '1.5rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                   <span style={{ background: 'rgba(20, 163, 168, 0.1)', color: 'var(--teal-600)', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>{(post.author || '').split('•')[0] || 'Guide'}</span>
                   <span style={{ color: 'var(--text-muted)' }}>{post.date}</span>
                 </div>
                 <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)', marginBottom: '1rem', lineHeight: '1.4' }}>{post.title}</h3>
                 <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--navy-800)', fontWeight: 'bold', fontSize: '0.9rem' }}>Read Article <ArrowRight size={14} /></span>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* 8. Final Newsletter CTA */}
      <section style={{ padding: '8rem 5%', position: 'relative', textAlign: 'center', color: 'white', overflow: 'hidden' }}>
        {/* Background Image with Dark Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(11,31,75,0.95), rgba(11,31,75,0.8)), url("/images/green_solar_field_1791612498444.png") center/cover', zIndex: -2 }}></div>
        {/* Center Glow Effect */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(20, 163, 168, 0.25) 0%, transparent 60%)', zIndex: -1 }}></div>

        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-400)', backdropFilter: 'blur(5px)' }}>
            <Mail size={32} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', fontWeight: '800', color: 'white', textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>Join the Green Revolution</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--sky-100)', marginBottom: '2.5rem', lineHeight: '1.6', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Subscribe to our newsletter for exclusive solar tips, policy updates, and early access to new technology rollouts.</p>
          <form style={{ display: 'flex', gap: '0.8rem', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }} onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}>
            <input type="email" placeholder="Enter your email address" required className="newsletter-input" style={{ flex: '1 1 240px', minWidth: '220px', padding: '1.2rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none', backdropFilter: 'blur(10px)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)' }} />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '30px', padding: '1.2rem 2.5rem', fontSize: '1.1rem', boxShadow: '0 10px 25px rgba(20, 163, 168, 0.4)', flex: '0 1 auto', minWidth: '160px' }}>Subscribe</button>
          </form>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginTop: '1.5rem' }}>No spam, ever. Unsubscribe at any time.</p>
        </div>
      </section>

      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(11,31,75,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-responsive"
              style={{ background: 'var(--white)', width: '90%', maxWidth: '500px', borderRadius: '14px', padding: '2.5rem', boxShadow: '0 25px 50px rgba(11,31,75,0.2)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: 'var(--navy-900)', fontSize: '1.8rem' }}>Book Your Consultation</h3>
                <button onClick={() => setIsQuoteModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.8rem', cursor: 'pointer' }}>&times;</button>
              </div>
              <p style={{ color: 'var(--text-body)', marginBottom: '2rem' }}>Leave your details below and our solar experts will reach out to schedule a free rooftop assessment.</p>
              
              <form onSubmit={handleQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--navy-900)', marginBottom: '0.5rem', fontWeight: '600' }}>Full Name</label>
                  <input 
                    type="text" required value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid #D5E1EE', outline: 'none' }} 
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', color: 'var(--navy-900)', marginBottom: '0.5rem', fontWeight: '600' }}>Phone Number</label>
                  <input 
                    type="text" required value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid #D5E1EE', outline: 'none' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--navy-900)', marginBottom: '0.5rem', fontWeight: '600' }}>Location / City</label>
                  <input 
                    type="text" required value={formData.location} 
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid #D5E1EE', outline: 'none' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--navy-900)', marginBottom: '0.5rem', fontWeight: '600' }}>Roof Type / Requirement</label>
                  <input 
                    type="text" required value={formData.requirement} 
                    placeholder="e.g. Residential, 1000 sq ft"
                    onChange={e => setFormData({...formData, requirement: e.target.value})}
                    style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid #D5E1EE', outline: 'none' }} 
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                  Submit Details
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Home;
