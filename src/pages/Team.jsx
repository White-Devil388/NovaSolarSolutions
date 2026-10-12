import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageCircle, Mail } from 'lucide-react';
import PageBanner from '../components/ui/PageBanner';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    try {
      let storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      
      // If employees not seeded yet in this browser, initialize with standard default system accounts
      if (!Array.isArray(storedEmployees) || storedEmployees.length === 0) {
        const initialEmployees = [
          { 
            username: 'admin', 
            password: 'password', 
            role: 'Administrator', 
            status: 'Active', 
            bio: 'Leading the NovaSolar mission and core clean energy operations forward.',
            permissions: ['My Tasks', 'CRM Leads', 'Messages', 'Project Tracker', 'WhatsApp Auto', 'Content Manager', 'Quotations'], 
            capabilities: { canDelete: true, canAssign: true, officialComm: true } 
          },
          { 
            username: 'employee', 
            password: 'employee123', 
            role: 'Sales Associate', 
            status: 'Active', 
            bio: 'Passionate about solar transitions, customer guidance, and clean energy setups.',
            permissions: ['My Tasks', 'CRM Leads'], 
            capabilities: { canDelete: false, canAssign: false, officialComm: false } 
          }
        ];
        localStorage.setItem('employees', JSON.stringify(initialEmployees));
        storedEmployees = initialEmployees;
      }

      const activeTeam = storedEmployees.filter(emp => emp?.status !== 'Inactive');
      setTeamMembers(activeTeam);
    } catch (e) {
      console.error('Failed to parse employees', e);
      setTeamMembers([]);
    }
  }, []);

  return (
    <>
      <PageBanner 
        title="Meet The Team" 
        imagePath="/images/green_solar_field_1791612498444.png"
        breadcrumb="Team"
      />

      <div style={{ backgroundColor: 'var(--sky-100)', minHeight: '60vh', padding: '4rem 5% 6rem' }}>
        <style>
          {`
            .org-tree-level {
              display: flex;
              justify-content: center;
              gap: 2.5rem;
              flex-wrap: wrap;
              position: relative;
              padding-top: 3rem;
            }
            .org-tree-level::before {
              content: '';
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 2px;
              height: 3rem;
              background: linear-gradient(to bottom, var(--teal-500), transparent);
            }
            .team-card {
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(18, 48, 107, 0.1);
              border-radius: 24px;
              padding: 2.5rem 2rem;
              text-align: center;
              box-shadow: 0 15px 35px rgba(18, 48, 107, 0.08);
              position: relative;
              overflow: hidden;
              width: 300px;
              z-index: 2;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .team-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 20px 45px rgba(18, 48, 107, 0.12);
            }
          `}
        </style>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="section-title" style={{ marginBottom: '1rem', color: 'var(--navy-900)' }}>
              Meet The <span style={{ color: 'var(--teal-500)' }}>Team</span>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto' }}>
              The brilliant minds and passionate engineers driving the future of sustainable energy at NovaSolar.
            </p>
          </motion.div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* TOP LEVEL: Administrators / Leadership */}
          {teamMembers.filter(m => m.role === 'Administrator' || m.role === 'CEO').length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
              {teamMembers.filter(m => m.role === 'Administrator' || m.role === 'CEO').map((member, index) => (
                <motion.div 
                  key={`top-${index}`}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="team-card" style={{ border: '2px solid rgba(20, 163, 168, 0.3)' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, var(--teal-500), var(--green-500))' }}></div>
                  <div style={{ width: '130px', height: '130px', margin: '0 auto 1.5rem auto', borderRadius: '50%', padding: '4px', background: 'linear-gradient(135deg, var(--teal-500) 0%, transparent 100%)', boxShadow: '0 8px 20px rgba(20, 163, 168, 0.2)' }}>
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.username)}&background=random&color=fff&size=140`} alt={member.username} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--white)' }} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-900)', marginBottom: '0.3rem', textTransform: 'capitalize', fontWeight: '700' }}>{member.username}</h3>
                  <div style={{ color: 'var(--teal-600)', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{member.role || 'Administrator'}</div>
                  <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{member.bio || `Leading the NovaSolar mission forward.`}</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem' }}>
                    <a href="#" style={{ color: 'var(--navy-700)', padding: '8px', background: 'var(--sky-100)', borderRadius: '10px', display: 'flex', alignItems: 'center' }}><Globe size={18} /></a>
                    <a href="#" style={{ color: 'var(--navy-700)', padding: '8px', background: 'var(--sky-100)', borderRadius: '10px', display: 'flex', alignItems: 'center' }}><MessageCircle size={18} /></a>
                    <a href="#" style={{ color: 'var(--navy-700)', padding: '8px', background: 'var(--sky-100)', borderRadius: '10px', display: 'flex', alignItems: 'center' }}><Mail size={18} /></a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* BOTTOM LEVEL: Rest of the Team */}
          {teamMembers.filter(m => m.role !== 'Administrator' && m.role !== 'CEO').length > 0 && (
            <div className="org-tree-level">
              {teamMembers.filter(m => m.role !== 'Administrator' && m.role !== 'CEO').map((member, index) => (
                <motion.div 
                  key={`sub-${index}`}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="team-card"
                >
                  <div style={{ width: '115px', height: '115px', margin: '0 auto 1.5rem auto', borderRadius: '50%', padding: '4px', background: 'linear-gradient(135deg, var(--sky-200) 0%, var(--teal-400) 100%)', boxShadow: '0 6px 16px rgba(18, 48, 107, 0.1)' }}>
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.username)}&background=random&color=fff&size=120`} alt={member.username} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--white)' }} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '0.3rem', textTransform: 'capitalize', fontWeight: '700' }}>{member.username}</h3>
                  <div style={{ color: 'var(--teal-600)', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{member.role || 'Team Member'}</div>
                  <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>{member.bio || `Passionate about renewable energy solutions.`}</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem' }}>
                    <a href="#" style={{ color: 'var(--navy-700)', padding: '8px', background: 'var(--sky-100)', borderRadius: '10px', display: 'flex', alignItems: 'center' }}><Globe size={18} /></a>
                    <a href="#" style={{ color: 'var(--navy-700)', padding: '8px', background: 'var(--sky-100)', borderRadius: '10px', display: 'flex', alignItems: 'center' }}><MessageCircle size={18} /></a>
                    <a href="#" style={{ color: 'var(--navy-700)', padding: '8px', background: 'var(--sky-100)', borderRadius: '10px', display: 'flex', alignItems: 'center' }}><Mail size={18} /></a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
