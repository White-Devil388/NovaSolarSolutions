import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Send, Target, TrendingUp } from 'lucide-react';

export default function AdminWhatsApp() {
  const [totalContacts, setTotalContacts] = useState(0);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const leads = JSON.parse(localStorage.getItem('solarLeads') || '[]');
    setTotalContacts(leads.length);
  }, []);

  const navItems = ['Dashboard', 'Campaign Sender', 'Templates', 'Live Templates', 'Bulk Messaging', 'Drip Campaign', 'Bookings', 'Contact Summary', 'Site Visits'];
  const actionBtns = ['View Summary', 'Manage Bookings', 'Site Visits', 'Analytics', 'View Chats'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'white' }}>
      
      {/* 1. Header Area Setup */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#25D366', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.8rem', color: 'white' }}>
            💬
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontFamily: 'Outfit, sans-serif', color: 'white', margin: 0 }}>WhatsApp Automation</h2>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.3rem', display: 'flex', gap: '0.5rem' }}>
              <span>Chats • Campaigns • Templates • Drip • Bookings • Summary</span>
            </div>
          </div>
        </div>
        <div style={{ padding: '0.5rem 1rem', borderRadius: '50px', background: 'rgba(37, 211, 102, 0.1)', border: '1px solid rgba(37, 211, 102, 0.3)', color: '#4ade80', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }}></div>
          Meta Cloud API Ready
        </div>
      </div>

      {/* 2. Top Navigation Tabs */}
      <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '2px solid rgba(255,255,255,0.05)', paddingBottom: '0', overflowX: 'auto', marginBottom: '2rem' }}>
        {navItems.map(item => (
          <div 
            key={item}
            onClick={() => setActiveTab(item)}
            style={{ 
              padding: '0.8rem 1rem', 
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              color: activeTab === item ? '#3b82f6' : '#94a3b8',
              borderBottom: activeTab === item ? '2px solid #3b82f6' : '2px solid transparent',
              marginBottom: '-2px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {item === 'Dashboard' && <span style={{ marginRight: '0.4rem' }}>📊</span>}
            {item}
          </div>
        ))}
      </div>

      {/* 3. Five KPI Indicator Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: '#cbd5e1', display: 'flex' }}>
            <MessageSquare size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>2,347</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '0.5px' }}>TOTAL MESSAGES</div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: '#93c5fd', display: 'flex' }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>{totalContacts || 195}</div>
            <div style={{ fontSize: '0.7rem', color: '#93c5fd', fontWeight: 'bold', letterSpacing: '0.5px' }}>TOTAL CONTACTS</div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: '#6ee7b7', display: 'flex' }}>
            <Send size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>0</div>
            <div style={{ fontSize: '0.7rem', color: '#6ee7b7', fontWeight: 'bold', letterSpacing: '0.5px' }}>TODAY'S MESSAGES</div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #581c87 0%, #3b0764 100%)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: '#d8b4fe', display: 'flex' }}>
            <Target size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>0</div>
            <div style={{ fontSize: '0.7rem', color: '#d8b4fe', fontWeight: 'bold', letterSpacing: '0.5px' }}>TODAY'S NEW LEADS</div>
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: '#cbd5e1', display: 'flex' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>2,347</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '0.5px' }}>MONTH MESSAGES</div>
          </div>
        </div>

      </div>

      {/* 4. Action Buttons Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {actionBtns.map(btn => (
            <button key={btn} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '0.6rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.target.style.background='rgba(255,255,255,0.05)'} onMouseLeave={e => e.target.style.background='transparent'}>
              {btn}
            </button>
          ))}
        </div>
        <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🔄 Refresh
        </button>
      </div>

      {/* 5. Main Filter Container */}
      <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white', fontWeight: 'bold' }}>Recent Contacts ({totalContacts || 195})</h3>
          <input 
            type="text" 
            placeholder="🔍 Search contacts..." 
            style={{ padding: '0.8rem 1rem', flex: 1, maxWidth: '400px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px', marginBottom: '2rem' }}>
           <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <input type="text" placeholder="dd/mm/yyyy" style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', flex: 1 }} />
             <span>📅</span>
           </div>
           
           <div style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.5rem' }}>to</div>

           <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <input type="text" placeholder="dd/mm/yyyy" style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', flex: 1 }} />
             <span>📅</span>
           </div>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem' }}>
          {['All', 'Today', 'Week', 'Month'].map(f => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)}
              style={{ 
                background: activeFilter === f ? 'white' : 'rgba(255,255,255,0.05)', 
                color: activeFilter === f ? 'black' : '#94a3b8', 
                border: 'none', padding: '0.5rem 1.2rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' 
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Functional Dummy Contacts Table */}
        <div style={{ flex: 1, marginTop: '2rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'white' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ padding: '1rem', color: '#94a3b8', width: '40px' }}><input type="checkbox" /></th>
                <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Contact Name</th>
                <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Mobile Number</th>
                <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Status / Tags</th>
                <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Last Message</th>
                <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Ramesh Kumar', phone: '+91 98765 43210', status: 'Active', lastMsg: 'Yesterday' },
                { name: 'Priya Sharma', phone: '+91 87654 32109', status: 'Replied', lastMsg: '2 hours ago' },
                { name: 'Vikas Enterprises', phone: '+91 76543 21098', status: 'Unread', lastMsg: 'Today, 10:30 AM' }
              ].map((contact, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }}><input type="checkbox" /></td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(59,130,246,0.2)', color: '#3b82f6', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}>
                        {contact.name.charAt(0)}
                      </div>
                      {contact.name}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#cbd5e1' }}>{contact.phone}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                      background: contact.status === 'Unread' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)',
                      color: contact.status === 'Unread' ? '#fbbf24' : '#34d399'
                    }}>
                      {contact.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>{contact.lastMsg}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button style={{ background: '#25D366', border: 'none', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'bold' }}>
                      💬 Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </motion.div>
  );
}
