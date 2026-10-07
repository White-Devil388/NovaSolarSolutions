import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DUMMY_MEETINGS = [
  { id: "MTG-101", client: "Ramesh Kumar", type: "Online (Zoom)", date: "2026-10-08", time: "14:30", employee: "admin", status: "Scheduled" },
  { id: "MTG-102", client: "Priya Sharma", type: "Site Survey", date: "2026-10-05", time: "10:00", employee: "employee", status: "Completed" },
];

export default function AdminMeetings() {
  const [meetings, setMeetings] = useState(() => {
    const saved = localStorage.getItem('solarMeetings');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('solarMeetings', JSON.stringify(DUMMY_MEETINGS));
    return DUMMY_MEETINGS;
  });

  const [availableLeads, setAvailableLeads] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);

  useEffect(() => {
    localStorage.setItem('solarMeetings', JSON.stringify(meetings));
  }, [meetings]);

  useEffect(() => {
    const leads = JSON.parse(localStorage.getItem('solarLeads') || '[]');
    setAvailableLeads(leads.map(l => l.name));
    
    const emps = JSON.parse(localStorage.getItem('employees') || '[]');
    setEmployeesList(emps.map(e => e.username));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [formData, setFormData] = useState({ client: '', type: 'Online (Zoom)', date: '', time: '', employee: '', status: 'Scheduled' });

  const handleOpenEdit = (meet) => {
    setEditingMeeting(meet);
    setFormData({ ...meet });
    setIsModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingMeeting(null);
    setFormData({ client: availableLeads[0] || '', type: 'Online (Zoom)', date: '', time: '', employee: employeesList[0] || '', status: 'Scheduled' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMeeting) {
      setMeetings(meetings.map(m => m.id === editingMeeting.id ? { ...m, ...formData } : m));
    } else {
      const newMeet = {
        id: `MTG-${Math.floor(Math.random() * 900) + 100}`,
        ...formData
      };
      setMeetings([newMeet, ...meetings].sort((a,b) => new Date(b.date) - new Date(a.date)));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setMeetings(meetings.filter(m => m.id !== id));
  };

  const handleInlineStatus = (id, newStatus) => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, status: newStatus } : m));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return { bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' };
      case 'Completed': return { bg: 'rgba(16, 185, 129, 0.2)', color: '#34d399' };
      case 'Cancelled': return { bg: 'rgba(239, 68, 68, 0.2)', color: '#f87171' };
      default: return { bg: 'rgba(255,255,255,0.1)', color: 'white' };
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', color: 'white', margin: 0 }}>Meeting Scheduler</h2>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Schedule and manage client interactions securely.</p>
        </div>
        <button 
          onClick={handleOpenNew}
          style={{ background: '#3b82f6', border: 'none', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          + Schedule Meeting
        </button>
      </div>

      {/* Meetings Table */}
      <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'white' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.3)' }}>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Meeting ID</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Client Lead</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Schedule (Date/Time)</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Assigned Rep</th>
              <th style={{ padding: '1rem 1.5rem', color: '#f59e0b', fontWeight: '500' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {meetings.map(meet => (
                  <motion.tr 
                    key={meet.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#cbd5e1' }}>{meet.id}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>{meet.type}</div>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', fontWeight: 'bold' }}>{meet.client}</td>
                    
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ color: '#e2e8f0' }}>{new Date(meet.date).toLocaleDateString('en-GB')}</div>
                      <div style={{ fontSize: '0.85rem', color: '#38bdf8', marginTop: '0.2rem', fontWeight: 'bold' }}>{meet.time} Hrs</div>
                    </td>

                    <td style={{ padding: '1.2rem 1.5rem', color: '#94a3b8' }}>
                      {meet.employee || 'Unassigned'}
                    </td>
                    
                    {/* Status Dropdown */}
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <select
                        value={meet.status}
                        onChange={(e) => handleInlineStatus(meet.id, e.target.value)}
                        style={{ 
                          padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', outline: 'none',
                          background: getStatusColor(meet.status).bg,
                          color: getStatusColor(meet.status).color
                        }}
                      >
                        <option value="Scheduled" style={{ background: '#1e293b', color: 'white' }}>Scheduled</option>
                        <option value="Completed" style={{ background: '#1e293b', color: 'white' }}>Completed</option>
                        <option value="Cancelled" style={{ background: '#1e293b', color: 'white' }}>Cancelled</option>
                      </select>
                    </td>

                    <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                      <motion.button 
                        onClick={() => handleOpenEdit(meet)} 
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(96, 165, 250, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{ background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.2)', color: '#60a5fa', cursor: 'pointer', marginRight: '0.5rem', fontWeight: '600', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', outline: 'none' }}
                      >
                        Edit
                      </motion.button>
                      <motion.button 
                        onClick={() => handleDelete(meet.id)} 
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(248, 113, 113, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.2)', color: '#f87171', cursor: 'pointer', fontWeight: '600', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', outline: 'none' }}
                      >
                        Del
                      </motion.button>
                    </td>
                  </motion.tr>
              ))}
              {meetings.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No scheduled meetings found.</td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(5px)' }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              style={{ background: '#0f172a', width: '100%', maxWidth: '600px', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
            >
              <h3 style={{ margin: '0 0 1.5rem 0', color: 'white', fontFamily: 'Outfit, sans-serif' }}>
                {editingMeeting ? `Edit Meeting (${editingMeeting.id})` : 'Schedule New Meeting'}
              </h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Client / Lead</label>
                    <select required value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}>
                      <option value="" disabled>Select Client</option>
                      {availableLeads.map(leadName => (
                         <option key={leadName} value={leadName} style={{ background: '#1e293b', color: 'white' }}>{leadName}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Meeting Type</label>
                    <input type="text" required value={formData.type} placeholder="Site Survey, Zoom..." onChange={e => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Date</label>
                    <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none', colorScheme: 'dark' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Time</label>
                    <input type="time" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none', colorScheme: 'dark' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Assigned Employee</label>
                    <select required value={formData.employee} onChange={e => setFormData({...formData, employee: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}>
                       <option value="" disabled>Select Employee</option>
                       {employeesList.map(emp => (
                         <option key={emp} value={emp} style={{ background: '#1e293b', color: 'white' }}>{emp}</option>
                       ))}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: 'white', outline: 'none' }}>
                      <option>Scheduled</option><option>Completed</option><option>Cancelled</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px' }}>Cancel</button>
                  <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>Simulate Schedule</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
