import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import TiltCard from '../components/reactbits/LegacyTiltCard';

const CERT_DATA = [
  {
    id: 1,
    title: "ISO 9001:2015 Quality Management",
    issuer: "International Organization for Standardization",
    description: "Certified for maintaining strict quality control and continuous improvement across all our engineering and installation processes.",
    image: "/images/cert_iso9001.png",
    date: "Valid until 2029",
    details: {
      registrationNo: "ISO-9001-2015-NX582",
      scope: "Design, Development, Manufacturing, and Support of Advanced Solar Solutions.",
      awardedTo: "ACME TECHNOLOGIES LTD. (NovaSolar Partner)",
      issueDate: "12 October 2023"
    }
  },
  {
    id: 2,
    title: "MNRE Approved Installer",
    issuer: "Ministry of New and Renewable Energy",
    description: "Officially recognized by the Indian Government to execute nationwide grid-tied solar projects and disburse subsidies seamlessly.",
    image: "/images/cert_mnre.png",
    date: "Valid until 2028",
    details: {
      registrationNo: "MNRE-SI-2023-8991X",
      scope: "Authorized framework for national grid-integration and state-level subsidy disbursement.",
      awardedTo: "NOVA SOLAR INDIA PVT LTD",
      issueDate: "05 March 2023"
    }
  },
  {
    id: 3,
    title: "Tier 1 Solar Integration",
    issuer: "Global Solar Council",
    description: "Awarded for utilizing only Tier 1 certified photovoltaic modules, ensuring the highest standards of durability and cell efficiency.",
    image: "/images/cert_tier1.png",
    date: "Valid until 2027",
    details: {
      registrationNo: "T1-GSC-2024-0014",
      scope: "Verification of engineering resilience, verified performance, and premium silicon integration.",
      awardedTo: "NOVA SOLAR GLOBAL OPERATIONS",
      issueDate: "18 January 2024"
    }
  }
];

function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  
  return (
    <div style={{ backgroundColor: 'var(--sky-100)', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <div style={{ padding: '6rem 5% 4rem', textAlign: 'center', background: 'transparent' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--navy-900)', margin: '0 0 1rem 0' }}>
            Licenses & <span style={{ color: 'var(--teal-600)' }}>Certifications</span>
          </h1>
          <p style={{ color: 'var(--text-body)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Our commitment to engineering excellence is backed by national and international governing bodies. We don't just promise quality, we prove it.
          </p>
        </motion.div>
      </div>

      {/* Certifications Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', padding: '0 5%', maxWidth: '1400px', margin: '0 auto' }}>
        {CERT_DATA.map((cert, index) => (
          <motion.div 
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <TiltCard style={{ width: '100%', height: '100%' }}>
              <div style={{ 
                background: 'var(--white)', 
                border: '1px solid rgba(18, 48, 107, 0.1)',
                borderRadius: '24px',
                padding: '2rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 15px 35px rgba(18, 48, 107, 0.05)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ position: 'relative', width: '100%', height: '260px', marginBottom: '2rem', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(18, 48, 107, 0.1)', background: 'var(--sky-100)' }}>
                   <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                     Verified
                   </div>
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ color: 'var(--teal-600)', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{cert.issuer}</p>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--navy-900)', marginBottom: '1rem', lineHeight: '1.3' }}>{cert.title}</h3>
                  <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                    {cert.description}
                  </p>
                  <div style={{ borderTop: '1px solid rgba(18, 48, 107, 0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{cert.date}</span>
                    <button onClick={() => setSelectedCert(cert)} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderColor: 'var(--teal-600)', color: 'var(--teal-600)' }}>View Details</button>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedCert(null)}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(11, 31, 75, 0.7)', backdropFilter: 'blur(5px)' }} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{ position: 'relative', width: '100%', maxWidth: '800px', background: 'var(--white)', border: '1px solid rgba(18, 48, 107, 0.1)', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh', boxShadow: '0 25px 50px rgba(11, 31, 75, 0.2)' }}
            >
              <button 
                onClick={() => setSelectedCert(null)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(11, 31, 75, 0.05)', border: 'none', color: 'var(--text-muted)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}
              >
                <X size={24} />
              </button>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto' }}>
                <div style={{ flex: '1 1 300px', background: 'var(--sky-100)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid rgba(18, 48, 107, 0.05)' }}>
                  <img src={selectedCert.image} alt={selectedCert.title} style={{ width: '100%', maxWidth: '300px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(18, 48, 107, 0.1)' }} />
                </div>
                
                <div style={{ flex: '1 1 300px', padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--navy-900)', marginBottom: '0.5rem', lineHeight: '1.2' }}>{selectedCert.title}</h3>
                    <p style={{ color: 'var(--teal-600)', fontWeight: 'bold' }}>{selectedCert.issuer}</p>
                  </div>
                  
                  <p style={{ color: 'var(--text-body)', lineHeight: '1.6' }}>{selectedCert.description}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', borderTop: '1px solid rgba(18, 48, 107, 0.1)', paddingTop: '1.5rem' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                      <CheckCircle size={20} color="var(--teal-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Registration Number</div>
                        <div style={{ color: 'var(--navy-800)', fontWeight: '600' }}>{selectedCert.details.registrationNo}</div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                      <CheckCircle size={20} color="var(--teal-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Scope / Domain</div>
                        <div style={{ color: 'var(--navy-800)', fontWeight: '600' }}>{selectedCert.details.scope}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                      <CheckCircle size={20} color="var(--teal-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Awarded To</div>
                        <div style={{ color: 'var(--navy-800)', fontWeight: '600' }}>{selectedCert.details.awardedTo}</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Certifications;
