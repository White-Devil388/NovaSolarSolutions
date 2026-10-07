import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PMSuryaGhar = () => {

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.6 }}
      style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Outfit, sans-serif',
        color: 'white',
        minHeight: '100vh'
      }}
    >
      {/* Back Button */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={{ 
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
          padding: '0.6rem 1.2rem', borderRadius: '8px', color: '#94a3b8', 
          cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <span>&larr;</span> Back to Home (वापस जाएँ)
        </button>
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Left Content Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <motion.div variants={itemVariants} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
            <h1 style={{ fontSize: '3rem', margin: '0 0 0.5rem 0', fontWeight: '800', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              PM Surya Ghar Yojana
            </h1>
            <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#f59e0b', fontWeight: '600' }}>
              मुफ्त बिजली योजना
            </h2>
            <p style={{ color: '#94a3b8', marginTop: '1rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
              The PM Surya Ghar Muft Bijli Yojana is a government initiative aimed at providing up to 300 units of free electricity every month to Indian households through rooftop solar installations.
              <br/><br/>
              <span style={{ color: '#cbd5e1', fontSize: '1rem' }}>पीएम सूर्य घर मुफ्त बिजली योजना भारत सरकार की एक पहल है, जिसका उद्देश्य रूफटॉप सोलर स्थापना के माध्यम से भारतीय घरेलू उपभोक्ताओं को हर महीने 300 यूनिट तक मुफ्त बिजली प्रदान करना है।</span>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} initial="initial" animate="animate" transition={{ delay: 0.3 }}
            style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#4ade80' }}>Subsidy Structure (सब्सिडी संरचना)</h3>
            <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem', lineHeight: '1.8', margin: 0 }}>
              <li><strong>1 kW System:</strong> ₹30,000 <br/><span style={{ fontSize: '0.9rem', color: '#64748b' }}>(१ किलोवाट सिस्टम: ३०,००० रुपये)</span></li>
              <li><strong>2 kW System:</strong> ₹60,000 <br/><span style={{ fontSize: '0.9rem', color: '#64748b' }}>(२ किलोवाट सिस्टम: ६०,००० रुपये)</span></li>
              <li><strong>3 kW & Above:</strong> ₹78,000 (Maximum) <br/><span style={{ fontSize: '0.9rem', color: '#64748b' }}>(३ किलोवाट या अधिक: ७८,००० रुपये - अधिकतम)</span></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} initial="initial" animate="animate" transition={{ delay: 0.4 }}
            style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8' }}>Eligibility & Benefits (पात्रता और लाभ)</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
              Must be an Indian citizen with a house and valid electricity connection. Earn up to ₹18,000 annually by selling surplus power. Provide a robust step toward a greener Earth.
              <br/><br/>
              <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>भारत का नागरिक होना चाहिए, घर और वैध बिजली कनेक्शन हो। अतिरिक्त बिजली बेचकर सालाना 18,000 रुपये तक कमाएं। हरित पृथ्वी की ओर एक मजबूत कदम।</span>
            </p>
          </motion.div>

        </div>

        {/* Right Image Column */}
        <motion.div 
          variants={itemVariants} initial="initial" animate="animate" transition={{ delay: 0.5 }}
          style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', height: '100%', minHeight: '400px' }}
        >
          {/* We use a placeholder image for Modi ji. You can place the actual photo at /images/pm_modi.jpg */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1,
            background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0) 50%)'
          }} />
          <img 
            src="/images/pm_modi.png" 
            alt="PM Narendra Modi" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            onError={(e) => {
              e.target.onerror = null; 
              // Fallback styling if image doesn't exist
              e.target.parentElement.style.background = '#1e293b';
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<div style="padding: 3rem; text-align: center; color: #94a3b8; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; border: 2px dashed rgba(255,255,255,0.1); border-radius: 12px; margin: 1rem;"><div style="font-size: 3rem; margin-bottom: 1rem;">📷</div>Place 'pm_modi.png' in public/images directory. <br/> (नरेंद्र मोदी जी की फोटो यहां दिखेगी)</div>`;
            }}
          />
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', zIndex: 2, textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Shri Narendra Modi</h4>
            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.9rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Hon'ble Prime Minister of India</p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default PMSuryaGhar;
