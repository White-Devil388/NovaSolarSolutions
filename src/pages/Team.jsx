import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageCircle, Mail, User } from 'lucide-react';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    try {
      const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      const activeTeam = Array.isArray(storedEmployees) ? storedEmployees.filter(emp => emp?.status !== 'Inactive') : [];
      setTeamMembers(activeTeam);
    } catch (e) {
      console.error('Failed to parse employees', e);
      setTeamMembers([]);
    }
  }, []);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <style>
        {`
          .org-tree-level {
            display: flex;
            justify-content: center;
            gap: 3rem;
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
            background: linear-gradient(to bottom, var(--primary), rgba(245, 158, 11, 0));
          }
          .team-card {
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 24px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            position: relative;
            overflow: hidden;
            width: 280px;
            z-index: 2;
          }
        `}
      </style>
      
      <div style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '2rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', fontFamily: 'Outfit, sans-serif', marginBottom: '1rem' }}>
            Meet The <span style={{ color: 'var(--primary)' }}>Team</span>
          </h1>
          <p style={{ color: 'var(--text-light)', opacity: 0.8, maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            The brilliant minds and passionate engineers driving the future of sustainable energy at NovaSolar.
          </p>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* TOP LEVEL: Administrators / Leadership */}
        {teamMembers.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
            {teamMembers.filter(m => m.role === 'Administrator' || m.role === 'CEO').map((member, index) => (
              <motion.div 
                key={`top-${index}`}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="team-card" style={{ border: '2px solid rgba(245, 158, 11, 0.3)' }}
              >
                <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: 'var(--primary)', filter: 'blur(80px)', opacity: 0.15 }}></div>
                <div style={{ width: '140px', height: '140px', margin: '0 auto 1.5rem auto', borderRadius: '50%', padding: '4px', background: 'linear-gradient(135deg, var(--primary) 0%, transparent 100%)' }}>
                  <img src={`https://ui-avatars.com/api/?name=${member.username}&background=random&color=fff&size=140`} alt={member.username} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '4px solid #0f172a' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.3rem', textTransform: 'capitalize' }}>{member.username}</h3>
                <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{member.role || 'Administrator'}</div>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{member.bio || `Leading the NovaSolar mission forward.`}</p>
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
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="team-card"
              >
                <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: '#38bdf8', filter: 'blur(80px)', opacity: 0.1 }}></div>
                <div style={{ width: '120px', height: '120px', margin: '0 auto 1.5rem auto', borderRadius: '50%', padding: '4px', background: 'linear-gradient(135deg, #38bdf8 0%, transparent 100%)' }}>
                  <img src={`https://ui-avatars.com/api/?name=${member.username}&background=random&color=fff&size=120`} alt={member.username} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '4px solid #0f172a' }} />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'white', marginBottom: '0.3rem', textTransform: 'capitalize' }}>{member.username}</h3>
                <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{member.role || 'Team Member'}</div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>{member.bio || `Passionate about renewable energy solutions.`}</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s' }}><Globe size={18} /></a>
                  <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s' }}><MessageCircle size={18} /></a>
                  <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s' }}><Mail size={18} /></a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
