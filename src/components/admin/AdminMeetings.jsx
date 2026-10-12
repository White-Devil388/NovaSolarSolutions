import React, { useState, useEffect } from 'react';

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
      case 'Scheduled': return { bg: 'rgba(14, 165, 233, 0.15)', color: 'var(--blue-500)' };
      case 'Completed': return { bg: 'rgba(16, 185, 129, 0.15)', color: 'var(--teal-600)' };
      case 'Cancelled': return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' };
      default: return { bg: 'var(--sky-100)', color: 'var(--text-muted)' };
    }
  };

  return (
    <div >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', color: 'var(--navy-900)', margin: 0 }}>Meeting Scheduler</h2>
          <p style={{ color: 'var(--text-body)', margin: '0.5rem 0 0 0' }}>Schedule and manage client interactions securely.</p>
        </div>
        <button 
          onClick={handleOpenNew}
          style={{ background: '#3b82f6', border: 'none', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          + Schedule Meeting
        </button>
      </div>

      {/* Meetings Table */}
      <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--sky-200)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(18,48,107,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'var(--navy-900)' }}>
          <thead>
            <tr style={{ background: 'var(--sky-100)' }}>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Meeting ID</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Client Lead</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Schedule (Date/Time)</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Assigned Rep</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <React.Fragment>
              {meetings.map(meet => (
                  <tr 
                    key={meet.id}
                    style={{ borderBottom: '1px solid var(--sky-200)' }}
                  >
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--navy-900)' }}>{meet.id}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-body)', marginTop: '0.2rem' }}>{meet.type}</div>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', fontWeight: 'bold' }}>{meet.client}</td>
                    
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ color: 'var(--navy-800)' }}>{new Date(meet.date).toLocaleDateString('en-GB')}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--teal-600)', marginTop: '0.2rem', fontWeight: 'bold' }}>{meet.time} Hrs</div>
                    </td>

                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-800)' }}>
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
                        <option value="Scheduled" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Scheduled</option>
                        <option value="Completed" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Completed</option>
                        <option value="Cancelled" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Cancelled</option>
                      </select>
                    </td>

                    <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleOpenEdit(meet)} 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ background: 'var(--white)', border: '1px solid var(--sky-300)', color: 'var(--navy-800)', cursor: 'pointer', marginRight: '0.5rem', fontWeight: '600', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', outline: 'none' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(meet.id)} 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer', fontWeight: '600', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', outline: 'none' }}
                      >
                        Del
                      </button>
                    </td>
                  </tr>
              ))}
              {meetings.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No scheduled meetings found.</td>
                </tr>
              )}
            </React.Fragment>
          </tbody>
        </table>
      </div>

      {/* Editor Modal */}
      <React.Fragment>
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(5px)' }}>
            <div 
              style={{ background: 'var(--white)', width: '100%', maxWidth: '600px', borderRadius: '16px', padding: '2rem', border: '1px solid var(--sky-200)', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
            >
              <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--navy-900)', fontFamily: 'Outfit, sans-serif' }}>
                {editingMeeting ? `Edit Meeting (${editingMeeting.id})` : 'Schedule New Meeting'}
              </h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Client / Lead</label>
                    <select required value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }}>
                      <option value="" disabled>Select Client</option>
                      {availableLeads.map(leadName => (
                         <option key={leadName} value={leadName} style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>{leadName}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Meeting Type</label>
                    <input type="text" required value={formData.type} placeholder="Site Survey, Zoom..." onChange={e => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Date</label>
                    <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Time</label>
                    <input type="time" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Assigned Employee</label>
                    <select required value={formData.employee} onChange={e => setFormData({...formData, employee: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }}>
                       <option value="" disabled>Select Employee</option>
                       {employeesList.map(emp => (
                         <option key={emp} value={emp} style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>{emp}</option>
                       ))}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }}>
                      <option value="Scheduled" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Scheduled</option>
                      <option value="Completed" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Completed</option>
                      <option value="Cancelled" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Cancelled</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'var(--white)', color: 'var(--text-body)', border: '1px solid var(--sky-200)', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>Cancel</button>
                  <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>Simulate Schedule</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
}
