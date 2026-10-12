import React, { useState, useEffect } from 'react';

const DUMMY_REMINDERS = [
  { id: "REM-01", message: "Call Vikas Enterprises regarding finalizing the commercial inverter.", date: "2026-10-09", priority: "High", lead: "Vikas Enterprises", status: "Pending" },
  { id: "REM-02", message: "Send quotation to Ramesh", date: "2026-10-07", priority: "Medium", lead: "Ramesh Kumar", status: "Done" },
];

export default function AdminReminders() {
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('solarReminders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed)) return parsed;
      }
    } catch(e) {
      console.error(e);
    }
    localStorage.setItem('solarReminders', JSON.stringify(DUMMY_REMINDERS));
    return DUMMY_REMINDERS;
  });

  const [availableLeads, setAvailableLeads] = useState([]);

  useEffect(() => {
    localStorage.setItem('solarReminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    const leads = JSON.parse(localStorage.getItem('solarLeads') || '[]');
    setAvailableLeads(leads.map(l => l.name));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [formData, setFormData] = useState({ message: '', date: '', priority: 'Medium', lead: '', status: 'Pending' });

  const handleOpenEdit = (rem) => {
    setEditingReminder(rem);
    setFormData({ ...rem });
    setIsModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingReminder(null);
    setFormData({ message: '', date: '', priority: 'Medium', lead: '', status: 'Pending' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingReminder) {
      setReminders(reminders.map(r => r.id === editingReminder.id ? { ...r, ...formData } : r));
    } else {
      const newRem = {
        id: `REM-${Math.floor(Math.random() * 900) + 100}`,
        ...formData
      };
      setReminders([newRem, ...reminders].sort((a,b) => new Date(b.date) - new Date(a.date)));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Done' : 'Pending';
    setReminders(reminders.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High': return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' };
      case 'Medium': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' };
      case 'Low': return { bg: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9' };
      default: return { bg: 'var(--sky-100)', color: 'var(--text-muted)' };
    }
  };

  return (
    <div >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', color: 'var(--navy-900)', margin: 0 }}>Reminders & Follow-Ups</h2>
          <p style={{ color: 'var(--text-body)', margin: '0.5rem 0 0 0' }}>Never miss a follow-up with your leads.</p>
        </div>
        <button 
          onClick={handleOpenNew}
          style={{ background: '#f59e0b', border: 'none', color: '#1e293b', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          + Add Reminder
        </button>
      </div>

      {/* Reminders List */}
      <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--sky-200)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(18,48,107,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'var(--navy-900)' }}>
          <thead>
            <tr style={{ background: 'var(--sky-100)' }}>
              <th style={{ padding: '1rem 1.5rem', width: '5%', color: 'var(--navy-800)', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Task Outline</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Due Date & Time</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Priority</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <React.Fragment>
              {(reminders || []).map(rem => {
                const isDone = rem.status === 'Done';
                return (
                  <tr 
                    key={rem.id}
                    style={{ borderBottom: '1px solid var(--sky-200)', opacity: isDone ? 0.6 : 1 }}
                  >
                    <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={isDone}
                        onChange={() => handleToggleStatus(rem.id, rem.status)}
                        style={{ cursor: 'pointer', width: '20px', height: '20px', accentColor: 'var(--teal-500)' }}
                      />
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem', color: isDone ? 'var(--text-muted)' : 'var(--navy-900)', textDecoration: isDone ? 'line-through' : 'none' }}>{rem.message}</div>
                      {rem.lead && <div style={{ fontSize: '0.85rem', color: 'var(--teal-600)', marginTop: '0.3rem' }}>🔗 Lead: {rem.lead}</div>}
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-800)' }}>
                      {rem.date ? new Date(rem.date).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <span style={{ 
                        padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold',
                        background: getPriorityStyle(rem.priority).bg, color: getPriorityStyle(rem.priority).color
                      }}>
                        {rem.priority}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                      <button onClick={() => handleOpenEdit(rem)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: 'var(--white)', border: '1px solid var(--sky-300)', color: 'var(--navy-800)', cursor: 'pointer', marginRight: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: '6px' }}>Edit</button>
                      <button onClick={() => handleDelete(rem.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer', padding: '0.4rem 0.8rem', borderRadius: '6px' }}>Del</button>
                    </td>
                  </tr>
                );
              })}
              {(!reminders || reminders.length === 0) && (
                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Woohoo! You have no pending tasks.</td></tr>
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
              style={{ background: 'var(--white)', width: '100%', maxWidth: '500px', borderRadius: '16px', padding: '2rem', border: '1px solid var(--sky-200)', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
            >
              <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--navy-900)', fontFamily: 'Outfit, sans-serif' }}>
                {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
              </h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Task Outline / Message</label>
                  <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows="3" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none', resize: 'vertical' }} />
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Due Date & Time</label>
                    <input type="datetime-local" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Priority Level</label>
                    <select required value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: `1px solid ${getPriorityStyle(formData.priority).color}`, background: getPriorityStyle(formData.priority).bg, color: 'var(--navy-900)', outline: 'none', fontWeight: 'bold' }}>
                      <option value="High" style={{ background: 'var(--white)' }}>High</option>
                      <option value="Medium" style={{ background: 'var(--white)' }}>Medium</option>
                      <option value="Low" style={{ background: 'var(--white)' }}>Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--teal-600)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Related CRM Lead (Optional)</label>
                  <select value={formData.lead} onChange={e => setFormData({...formData, lead: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(20, 163, 168, 0.3)', background: 'rgba(20, 163, 168, 0.05)', color: 'var(--navy-900)', outline: 'none' }}>
                    <option value="" style={{ background: 'var(--white)' }}>None - General Task</option>
                    {availableLeads.map(leadName => (
                       <option key={leadName} value={leadName} style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>{leadName}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'var(--white)', color: 'var(--text-body)', border: '1px solid var(--sky-200)', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>Cancel</button>
                  <button type="submit" style={{ background: '#f59e0b', color: '#1e293b', border: 'none', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>Save Reminder</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
}
