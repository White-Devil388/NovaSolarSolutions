import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';

const DUMMY_LEADS = [
  { id: "L-492", name: "Ramesh Kumar", phone: "+91 98765 43210", location: "Delhi", requirement: "Residential - 5kW", status: "New" },
  { id: "L-491", name: "Vikas Enterprises", phone: "+91 91234 56789", location: "Pune", requirement: "Commercial - 50kW", status: "Contacted" },
  { id: "L-490", name: "Priya Sharma", phone: "+91 99887 76655", location: "Gurugram", requirement: "Residential - 10kW", status: "Proposal Sent" }
];

export default function CrmLeadsManager({ isEmployee = false, currentEmployeeUsername = '' }) {
  const [employeesList, setEmployeesList] = useState([]);
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('solarLeads');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('solarLeads', JSON.stringify(DUMMY_LEADS));
    return DUMMY_LEADS;
  });

  React.useEffect(() => {
    localStorage.setItem('solarLeads', JSON.stringify(leads));
  }, [leads]);

  React.useEffect(() => {
    const list = JSON.parse(localStorage.getItem('employees') || '[]');
    setEmployeesList(list.filter(e => e.status === 'Active'));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', location: '', requirement: '', status: 'New', assignedTo: '', comments: '' });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);

  const filteredLeads = leads.filter(lead => {
    const isAssignedToMe = isEmployee ? lead.assignedTo === currentEmployeeUsername : true;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (lead.location && lead.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          lead.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return isAssignedToMe && matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedLeadIds.length === filteredLeads.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(filteredLeads.map(l => l.id));
    }
  };

  const toggleSelectLead = (id) => {
    if (selectedLeadIds.includes(id)) {
      setSelectedLeadIds(selectedLeadIds.filter(itemId => itemId !== id));
    } else {
      setSelectedLeadIds([...selectedLeadIds, id]);
    }
  };

  const handleBulkAssign = (username) => {
    if (!username) return;
    setLeads(leads.map(lead => 
      selectedLeadIds.includes(lead.id) ? { ...lead, assignedTo: username } : lead
    ));
    setSelectedLeadIds([]);
    alert(`Successfully assigned ${selectedLeadIds.length} leads to ${username}.`);
  };

  const handleOpenNew = () => {
    setEditingLead(null);
    setFormData({ name: '', phone: '', location: '', requirement: '', status: 'New', assignedTo: '', comments: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (lead) => {
    setEditingLead(lead);
    setFormData({ name: lead.name, phone: lead.phone || '', location: lead.location, requirement: lead.requirement, status: lead.status, assignedTo: lead.assignedTo || '', comments: lead.comments || '' });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLead) {
      setLeads(leads.map(lead => lead.id === editingLead.id ? { ...lead, ...formData } : lead));
    } else {
      const newLead = {
        id: `L-${Math.floor(Math.random() * 900) + 100}`,
        ...formData
      };
      setLeads([newLead, ...leads]);
    }
    setIsModalOpen(false);
  };

  const handleInlineUpdate = (id, field, value) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, [field]: value } : lead));
  };

  const getStatusStyle = (status) => {
    if (status === 'New') return { bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' };
    if (status === 'Contacted') return { bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' };
    if (status === 'Proposal Sent') return { bg: 'rgba(16, 185, 129, 0.2)', color: '#34d399' };
    if (status === 'Closed Won') return { bg: 'rgba(52, 211, 153, 0.2)', color: '#10b981' };
    if (status === 'Closed Lost') return { bg: 'rgba(239, 68, 68, 0.2)', color: '#f87171' };
    return { bg: 'rgba(255,255,255,0.1)', color: 'white' };
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return alert("No leads to export.");
    const headers = ["Lead ID", "Name", "Phone", "Location", "Requirement", "Status", "Assigned To"];
    const rows = leads.map(l => [
      `"${l.id || ''}"`, `"${l.name || ''}"`, `"${l.phone || ''}"`, `"${l.location || ''}"`,
      `"${l.requirement || ''}"`, `"${l.status || ''}"`, `"${l.assignedTo || ''}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(r => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "crm_leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const rows = text.split("\n").map(r => r.trim()).filter(r => r);
        if (rows.length < 2) return alert("File is empty or invalid.");
        
        const newLeads = rows.slice(1).map(rowString => {
          // simple comma splitter (naively ignoring commas inside quotes)
          const cols = rowString.split(",").map(c => c.replace(/^"|"$/g, '').trim());
          return {
            id: cols[0] && cols[0].startsWith('L-') ? cols[0] : `L-${Math.floor(Math.random() * 900) + 100}`,
            name: cols[1] || 'Unknown',
            phone: cols[2] || '',
            location: cols[3] || '',
            requirement: cols[4] || '',
            status: cols[5] || 'New',
            assignedTo: cols[6] || '',
            comments: ''
          };
        });
        
        // Merge without duplicating IDs if they exist
        const existingIds = new Set(leads.map(l => l.id));
        const filteredNewLeads = newLeads.filter(l => !existingIds.has(l.id));
        setLeads([...filteredNewLeads, ...leads]);
        alert(`Successfully imported ${filteredNewLeads.length} new leads!`);
      } catch (err) {
        alert("Error parsing CSV file.");
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset input
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', color: 'white', margin: 0 }}>CRM Leads Engine</h2>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Manage customer inquiries, callbacks, and sales pipeline</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.8rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}>
            ⬆️ Import
            <input type="file" accept=".csv" onChange={handleImportCSV} style={{ display: 'none' }} />
          </label>
          <button 
            onClick={handleExportCSV}
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.8rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            ⬇️ Export
          </button>
          <button 
            onClick={handleOpenNew}
            style={{ background: '#3b82f6', border: 'none', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            + Add New Lead
          </button>
        </div>
      </div>

      {/* Filter or Bulk Toolbar */}
      {selectedLeadIds.length > 0 && !isEmployee ? (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', padding: '1rem', borderRadius: '12px', alignItems: 'center' }}>
          <div style={{ color: '#60a5fa', fontWeight: 'bold' }}>{selectedLeadIds.length} Leads Selected</div>
          <select 
            onChange={(e) => handleBulkAssign(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid rgba(59,130,246,0.4)', background: '#1e293b', color: 'white', outline: 'none', cursor: 'pointer', marginLeft: 'auto' }}
          >
            <option value="">Bulk Assign To...</option>
            {employeesList.map(emp => (
              <option key={emp.username} value={emp.username}>{emp.username}</option>
            ))}
          </select>
          <button onClick={() => setSelectedLeadIds([])} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Cancel</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <input 
            type="text" 
            placeholder="🔍 Search by Name, Location, or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none' }}
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none', cursor: 'pointer' }}
          >
            <option value="All" style={{ background: '#1e293b', color: 'white' }}>All Statuses</option>
            <option value="New" style={{ background: '#1e293b', color: 'white' }}>New</option>
            <option value="Contacted" style={{ background: '#1e293b', color: 'white' }}>Contacted</option>
            <option value="Proposal Sent" style={{ background: '#1e293b', color: 'white' }}>Proposal Sent</option>
            <option value="Closed Won" style={{ background: '#1e293b', color: 'white' }}>Closed Won</option>
            <option value="Closed Lost" style={{ background: '#1e293b', color: 'white' }}>Closed Lost</option>
          </select>
        </div>
      )}

      <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'white' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.3)' }}>
              {!isEmployee && (
                <th style={{ padding: '1rem', paddingLeft: '1.5rem', width: '40px' }}>
                  <input 
                    type="checkbox" 
                    onChange={toggleSelectAll} 
                    checked={selectedLeadIds.length > 0 && selectedLeadIds.length === filteredLeads.length}
                    style={{ cursor: 'pointer' }}
                  />
                </th>
              )}
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Lead ID</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Client Info</th>
              <th style={{ padding: '1rem 1.5rem', color: '#f59e0b', fontWeight: '500' }}>Notes/Comments</th>
              {!isEmployee && <th style={{ padding: '1rem 1.5rem', color: '#f59e0b', fontWeight: '500' }}>Assigned To</th>}
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Requirement</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredLeads.map(lead => (
                <motion.tr 
                  key={lead.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: selectedLeadIds.includes(lead.id) ? 'rgba(59,130,246,0.05)' : 'transparent' }}
                >
                  {!isEmployee && (
                    <td style={{ padding: '1.2rem', paddingLeft: '1.5rem' }}>
                      <input 
                        type="checkbox" 
                        onChange={() => toggleSelectLead(lead.id)} 
                        checked={selectedLeadIds.includes(lead.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                  )}
                  <td style={{ padding: '1.2rem 1.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>{lead.id}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{lead.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.3rem' }}>{lead.location} • {lead.phone}</div>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    {lead.comments ? (
                      <div style={{ fontSize: '0.85rem', color: '#f59e0b', fontStyle: 'italic', padding: '0.5rem', background: 'rgba(245,158,11,0.1)', borderRadius: '6px' }}>
                        💬 {lead.comments}
                      </div>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '0.85rem', fontStyle: 'italic' }}>No notes</span>
                    )}
                  </td>
                  {!isEmployee && (
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <select 
                        value={lead.assignedTo || ''}
                        onChange={(e) => handleInlineUpdate(lead.id, 'assignedTo', e.target.value)}
                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)', color: lead.assignedTo ? '#38bdf8' : '#fbbf24', outline: 'none', cursor: 'pointer', fontWeight: '500', fontSize: '0.85rem' }}
                      >
                        <option value="" style={{ background: '#1e293b', color: 'white' }}>-- Unassigned --</option>
                        {employeesList.map(emp => (
                          <option key={emp.username} value={emp.username} style={{ background: '#1e293b', color: 'white' }}>{emp.username}</option>
                        ))}
                      </select>
                    </td>
                  )}
                  <td style={{ padding: '1.2rem 1.5rem', color: '#cbd5e1' }}>{lead.requirement}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <select
                      value={lead.status}
                      onChange={(e) => handleInlineUpdate(lead.id, 'status', e.target.value)}
                      style={{ 
                        padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', outline: 'none',
                        background: getStatusStyle(lead.status).bg,
                        color: getStatusStyle(lead.status).color
                      }}
                    >
                      <option value="New" style={{ background: '#1e293b', color: 'white' }}>New</option>
                      <option value="Contacted" style={{ background: '#1e293b', color: 'white' }}>Contacted</option>
                      <option value="Proposal Sent" style={{ background: '#1e293b', color: 'white' }}>Proposal Sent</option>
                      <option value="Closed Won" style={{ background: '#1e293b', color: 'white' }}>Closed Won</option>
                      <option value="Closed Lost" style={{ background: '#1e293b', color: 'white' }}>Closed Lost</option>
                    </select>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <motion.button 
                        onClick={() => handleOpenEdit(lead)} 
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(96, 165, 250, 0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        title="Edit Lead"
                        style={{ background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.2)', color: '#60a5fa', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button 
                        onClick={() => handleDelete(lead.id)} 
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(248, 113, 113, 0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        title="Delete Lead"
                        style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.2)', color: '#f87171', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={isEmployee ? 6 : 7} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No active leads found matching your criteria.</td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* CRM Lead Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(5px)' }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              style={{ background: '#0f172a', width: '100%', maxWidth: '600px', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
            >
              <h3 style={{ margin: '0 0 1.5rem 0', color: 'white', fontFamily: 'Outfit, sans-serif' }}>{editingLead ? 'Edit Lead Data' : 'Log New Lead'}</h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Client Name</label>
                    <input 
                      type="text" required value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Phone Number</label>
                    <input 
                      type="text" required value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} 
                    />
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Location / City</label>
                    <input 
                      type="text" required value={formData.location} 
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Lead Status</label>
                    <select 
                      value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: 'white', outline: 'none' }}
                    >
                      <option>New</option><option>Contacted</option><option>Proposal Sent</option><option>Closed Won</option><option>Closed Lost</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Requirements</label>
                  <input 
                    type="text" required value={formData.requirement} 
                    placeholder="e.g. Residential - 5kW"
                    onChange={e => setFormData({...formData, requirement: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} 
                  />
                </div>

                {!isEmployee && (
                  <div>
                    <label style={{ display: 'block', color: '#f59e0b', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Assign To Employee (Optional)</label>
                    <select 
                      value={formData.assignedTo} onChange={e => setFormData({...formData, assignedTo: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)', color: 'white', outline: 'none' }}
                    >
                      <option value="">-- Leave Unassigned --</option>
                      {employeesList.map(emp => (
                        <option key={emp.username} value={emp.username}>{emp.username} - {emp.role}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Additional Comments / Notes</label>
                  <textarea 
                    value={formData.comments} 
                    placeholder="Enter any follow-up notes, special requirements, or remarks..."
                    onChange={e => setFormData({...formData, comments: e.target.value})}
                    rows={3}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none', resize: 'vertical' }} 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px' }}>Cancel</button>
                  <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>Save Lead</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
