import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageCircle, Mail, Phone } from 'lucide-react';
import PageBanner from '../components/ui/PageBanner';
import TiltCard from '../components/reactbits/LegacyTiltCard';

const DEFAULT_TEAM = [
  {
    id: 1,
    username: 'Vikramaditya Sharma',
    role: 'CEO & Founder',
    category: 'Leadership',
    bio: '15+ years pioneering solar tech innovation across India. Passionate about affordable clean energy for every household.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    email: 'vikram@novasolar.com',
    phone: '+91 98765 43210'
  },
  {
    id: 2,
    username: 'Dr. Ananya Roy',
    role: 'Chief Technology Officer',
    category: 'Leadership',
    bio: 'PhD in Photovoltaics from IIT Delhi. Oversees R&D, smart inverter optimization, and high-efficiency bifacial panel systems.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    email: 'ananya@novasolar.com',
    phone: '+91 98765 43211'
  },
  {
    id: 3,
    username: 'Rajesh Nair',
    role: 'Head of Solar Engineering',
    category: 'Engineering',
    bio: 'Senior electrical engineer specializing in grid-tie architecture, net-metering compliance, and commercial installations.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    email: 'rajesh@novasolar.com',
    phone: '+91 98765 43212'
  },
  {
    id: 4,
    username: 'Pooja Kulkarni',
    role: 'Lead Solar Architect',
    category: 'Engineering',
    bio: 'Designs customized rooftop layouts ensuring optimal tilt angles, maximum solar irradiance, and zero structural damage.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    email: 'pooja@novasolar.com',
    phone: '+91 98765 43213'
  },
  {
    id: 5,
    username: 'Arjun Mehta',
    role: 'Senior Operations Manager',
    category: 'Operations',
    bio: 'Leads PM Surya Ghar subsidy processing, DISCOM liaisoning, and streamlined on-site installation timelines.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    email: 'arjun@novasolar.com',
    phone: '+91 98765 43214'
  },
  {
    id: 6,
    username: 'Meera Sen',
    role: 'Quality & Safety Lead',
    category: 'Operations',
    bio: 'MNRE-certified safety inspector ensuring Tier-1 PV standards, wind-load durability, and 25-year reliability.',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    email: 'meera@novasolar.com',
    phone: '+91 98765 43215'
  }
];

export default function Team() {
  const [teamMembers, setTeamMembers] = useState(DEFAULT_TEAM);

  useEffect(() => {
    try {
      const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      const activeEmployees = Array.isArray(storedEmployees) ? storedEmployees.filter(emp => emp?.status !== 'Inactive') : [];
      if (activeEmployees.length > 0) {
        // Map stored employees format if present
        const formattedStored = activeEmployees.map((emp, index) => ({
          id: emp.id || `emp-${index}`,
          username: emp.name || emp.username || `Team Member ${index + 1}`,
          role: emp.role || emp.designation || 'Solar Specialist',
          category: emp.role === 'Administrator' || emp.role === 'CEO' ? 'Leadership' : 'Engineering',
          bio: emp.bio || 'Dedicated solar energy professional helping households transition to sustainable power.',
          avatar: emp.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name || emp.username)}&background=0b1f4b&color=fff&size=160`,
          email: emp.email || 'info@novasolar.com',
          phone: emp.phone || '+91 98765 43210'
        }));
        setTeamMembers(formattedStored);
      } else {
        setTeamMembers(DEFAULT_TEAM);
      }
    } catch (e) {
      console.error('Failed to parse employees', e);
      setTeamMembers(DEFAULT_TEAM);
    }
  }, []);

  const leadership = teamMembers.filter(m => m.category === 'Leadership' || m.role?.toLowerCase().includes('ceo') || m.role?.toLowerCase().includes('founder') || m.role?.toLowerCase().includes('cto') || m.role === 'Administrator');
  const engineersAndOps = teamMembers.filter(m => !leadership.includes(m));

  return (
    <>
      <PageBanner 
        title="Meet Our Team" 
        subtitle="The brilliant minds and passionate engineers driving the future of sustainable energy at NovaSolar."
        imagePath="/images/green_solar_field_1791612498444.png"
        breadcrumb="Team"
      />

      <div style={{ backgroundColor: 'var(--sky-100)', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          {/* Leadership Spotlight */}
          {leadership.length > 0 && (
            <div style={{ marginBottom: '5rem' }}>
              <div className="section-header" style={{ marginBottom: '3rem' }}>
                <h2 className="section-title">Leadership & Founders</h2>
                <p className="section-subtitle">Guiding NovaSolar towards engineering excellence and clean energy accessibility.</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
                {leadership.map((member, index) => (
                  <TiltCard key={`lead-${member.id || index}`} style={{ flex: '1 1 320px', maxWidth: '420px' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '24px',
                        padding: '2.5rem 2rem',
                        textAlign: 'center',
                        border: '1px solid rgba(18, 48, 107, 0.1)',
                        boxShadow: '0 16px 36px rgba(18, 48, 107, 0.08)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        background: 'linear-gradient(90deg, var(--teal-500) 0%, var(--green-500) 100%)'
                      }} />

                      <div style={{
                        width: '130px',
                        height: '130px',
                        borderRadius: '50%',
                        padding: '4px',
                        background: 'linear-gradient(135deg, var(--teal-500) 0%, var(--green-400) 100%)',
                        marginBottom: '1.25rem',
                        boxShadow: '0 8px 20px rgba(20, 163, 168, 0.25)'
                      }}>
                        <img 
                          src={member.avatar} 
                          alt={member.username} 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            background: '#e2e8f0'
                          }} 
                        />
                      </div>

                      <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-900)', marginBottom: '0.35rem', fontWeight: '700' }}>
                        {member.username}
                      </h3>

                      <div style={{
                        display: 'inline-block',
                        padding: '0.3rem 0.85rem',
                        background: 'rgba(20, 163, 168, 0.12)',
                        color: 'var(--teal-600)',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        borderRadius: '50px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        marginBottom: '1rem'
                      }}>
                        {member.role}
                      </div>

                      <p style={{
                        color: 'var(--text-body)',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem',
                        flex: '1 1 auto'
                      }}>
                        {member.bio}
                      </p>

                      <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center' }}>
                        {member.email && (
                          <a href={`mailto:${member.email}`} style={{ color: 'var(--navy-700)', padding: '8px', background: 'var(--sky-100)', borderRadius: '10px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}>
                            <Mail size={18} />
                          </a>
                        )}
                        {member.phone && (
                          <a href={`tel:${member.phone}`} style={{ color: 'var(--navy-700)', padding: '8px', background: 'var(--sky-100)', borderRadius: '10px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}>
                            <Phone size={18} />
                          </a>
                        )}
                        <a href="#" style={{ color: 'var(--navy-700)', padding: '8px', background: 'var(--sky-100)', borderRadius: '10px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}>
                          <Globe size={18} />
                        </a>
                      </div>
                    </motion.div>
                  </TiltCard>
                ))}
              </div>
            </div>
          )}

          {/* Engineering & Operations Grid */}
          <div>
            <div className="section-header" style={{ marginBottom: '3rem' }}>
              <h2 className="section-title">Engineering & Operations Specialists</h2>
              <p className="section-subtitle">Dedicated engineers, architects, and compliance officers ensuring flaw-free installations.</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {(engineersAndOps.length > 0 ? engineersAndOps : DEFAULT_TEAM.slice(2)).map((member, index) => (
                <TiltCard key={`eng-${member.id || index}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '20px',
                      padding: '2rem 1.5rem',
                      textAlign: 'center',
                      border: '1px solid rgba(18, 48, 107, 0.08)',
                      boxShadow: '0 10px 25px rgba(18, 48, 107, 0.05)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      padding: '3px',
                      background: 'linear-gradient(135deg, var(--sky-200) 0%, var(--teal-400) 100%)',
                      marginBottom: '1rem'
                    }}>
                      <img 
                        src={member.avatar} 
                        alt={member.username} 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%',
                          background: '#e2e8f0'
                        }} 
                      />
                    </div>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)', marginBottom: '0.25rem', fontWeight: '700' }}>
                      {member.username}
                    </h3>

                    <div style={{
                      color: 'var(--teal-600)',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      marginBottom: '0.85rem'
                    }}>
                      {member.role}
                    </div>

                    <p style={{
                      color: 'var(--text-body)',
                      fontSize: '0.88rem',
                      lineHeight: '1.5',
                      marginBottom: '1.25rem',
                      flex: '1 1 auto'
                    }}>
                      {member.bio}
                    </p>

                    <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center' }}>
                      {member.email && (
                        <a href={`mailto:${member.email}`} style={{ color: 'var(--navy-700)', padding: '6px', background: 'var(--sky-100)', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <Mail size={16} />
                        </a>
                      )}
                      {member.phone && (
                        <a href={`tel:${member.phone}`} style={{ color: 'var(--navy-700)', padding: '6px', background: 'var(--sky-100)', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <Phone size={16} />
                        </a>
                      )}
                      <a href="#" style={{ color: 'var(--navy-700)', padding: '6px', background: 'var(--sky-100)', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                        <Globe size={16} />
                      </a>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
