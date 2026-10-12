import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import useDebounce from '../../hooks/useDebounce';
import usePagination from '../../hooks/usePagination';

const DUMMY_LEADS = [
  { id: "L-492", name: "Ramesh Kumar", phone: "+91 98765 43210", location: "Delhi", requirement: "Residential", systemSize: "5kW", followUpDate: "2026-10-15", electricityBill: "2500", quotation: "2.5L", status: "New", source: "Website" },
  { id: "L-491", name: "Vikas Enterprises", phone: "+91 91234 56789", location: "Pune", requirement: "Commercial", systemSize: "50kW", followUpDate: "2026-10-12", electricityBill: "15000", quotation: "Pending", status: "Contacted", source: "Facebook Ads" },
  { id: "L-490", name: "Priya Sharma", phone: "+91 99887 76655", location: "Gurugram", requirement: "Residential - 10kW", status: "Proposal Sent", source: "Referral" }
];

export default function CrmLeadsManager({ isEmployee = false, currentEmployeeUsername = '', canDelete = false }) {
  const [employeesList, setEmployeesList] = useState([]);
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('solarLeads');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('solarLeads', JSON.stringify(DUMMY_LEADS));
    return DUMMY_LEADS;
  });

  const searchInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('solarLeads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('employees') || '[]');
    setEmployeesList(list.filter(e => e.status === 'Active'));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', location: '', requirement: '', systemSize: '', followUpDate: '', electricityBill: '', quotation: '', status: 'New', source: 'Website', assignedTo: '', comments: '' });

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 250);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);

  // Memoized lead filtering with debounced query
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const isAssignedToMe = isEmployee ? lead.assignedTo === currentEmployeeUsername : true;
      const lowerQuery = debouncedSearch.toLowerCase().trim();
      const matchesSearch = !lowerQuery || 
                            lead.name.toLowerCase().includes(lowerQuery) || 
                            (lead.location && lead.location.toLowerCase().includes(lowerQuery)) ||
                            lead.id.toLowerCase().includes(lowerQuery);
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      return isAssignedToMe && matchesSearch && matchesStatus;
    });
  }, [leads, isEmployee, currentEmployeeUsername, debouncedSearch, statusFilter]);

  // Numbered pagination hook
  const { 
    currentData: paginatedLeads, 
    currentPage, 
    totalPages, 
    nextPage, 
    prevPage, 
    goToPage, 
    itemsRangeText, 
    pagesList 
  } = usePagination(filteredLeads, 10);

  const toggleSelectAll = useCallback(() => {
    if (selectedLeadIds.length === paginatedLeads.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(paginatedLeads.map(l => l.id));
    }
  }, [selectedLeadIds.length, paginatedLeads]);

  const toggleSelectLead = useCallback((id) => {
    setSelectedLeadIds(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  }, []);

  const handleBulkAssign = useCallback((username) => {
    if (!username) return;
    setLeads(prev => prev.map(lead => 
      selectedLeadIds.includes(lead.id) ? { ...lead, assignedTo: username } : lead
    ));
    setSelectedLeadIds([]);
    alert(`Successfully assigned ${selectedLeadIds.length} leads to ${username}.`);
  }, [selectedLeadIds]);

  const handleOpenNew = () => {
    setEditingLead(null);
    setFormData({ name: '', phone: '', location: '', requirement: '', systemSize: '', followUpDate: '', electricityBill: '', quotation: '', status: 'New', source: 'Website', assignedTo: '', comments: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (lead) => {
    setEditingLead(lead);
    setFormData({ name: lead.name, phone: lead.phone || '', location: lead.location, requirement: lead.requirement, systemSize: lead.systemSize || '', followUpDate: lead.followUpDate || '', electricityBill: lead.electricityBill || '', quotation: lead.quotation || '', status: lead.status, source: lead.source || 'Website', assignedTo: lead.assignedTo || '', comments: lead.comments || '' });
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
    if (status === 'New') return { bg: 'rgba(14, 165, 233, 0.15)', color: 'var(--blue-500)' };
    if (status === 'Contacted') return { bg: 'rgba(245, 158, 11, 0.15)', color: '#d97706' };
    if (status === 'Proposal Sent') return { bg: 'rgba(16, 185, 129, 0.15)', color: 'var(--teal-600)' };
    if (status === 'Closed Won') return { bg: 'rgba(16, 185, 129, 0.25)', color: '#047857' };
    if (status === 'Closed Lost') return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' };
    return { bg: 'var(--sky-100)', color: 'var(--text-muted)' };
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return alert("No leads to export.");
    const headers = ["Lead ID", "Name", "Phone", "Location", "Requirement", "Status", "Source", "Assigned To"];
    const rows = leads.map(l => [
      `"${l.id || ''}"`, `"${l.name || ''}"`, `"${l.phone || ''}"`, `"${l.location || ''}"`,
      `"${l.requirement || ''}"`, `"${l.status || ''}"`, `"${l.source || ''}"`, `"${l.assignedTo || ''}"`
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
            source: cols[6] || 'Website',
            assignedTo: cols[7] || '',
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
    <div >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', color: 'var(--navy-900)', margin: 0 }}>CRM Leads Engine</h2>
          <p style={{ color: 'var(--text-body)', margin: '0.5rem 0 0 0' }}>Manage customer inquiries, callbacks, and sales pipeline</p>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ background: 'var(--white)', border: '1px solid var(--sky-300)', color: 'var(--navy-800)', padding: '0.8rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}>
            ⬆️ Import
            <input type="file" accept=".csv" onChange={handleImportCSV} style={{ display: 'none' }} />
          </label>
          <button 
            onClick={handleExportCSV}
            style={{ background: 'var(--white)', border: '1px solid var(--sky-300)', color: 'var(--navy-800)', padding: '0.8rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
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
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid var(--sky-300)', padding: '1rem', borderRadius: '12px', alignItems: 'center' }}>
          <div style={{ color: 'var(--blue-500)', fontWeight: 'bold' }}>{selectedLeadIds.length} Leads Selected</div>
          <select 
            onChange={(e) => handleBulkAssign(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--sky-300)', background: 'var(--white)', color: 'var(--navy-900)', outline: 'none', cursor: 'pointer', marginLeft: 'auto' }}
          >
            <option value="">Bulk Assign To...</option>
            {employeesList.map(emp => (
              <option key={emp.username} value={emp.username}>{emp.username}</option>
            ))}
          </select>
          <button onClick={() => setSelectedLeadIds([])} style={{ background: 'transparent', border: 'none', color: 'var(--text-body)', cursor: 'pointer' }}>Cancel</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', justifyContent: 'center', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="🔍 Search by Name, Location, or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: '1 1 250px', padding: '0.8rem 1.5rem', borderRadius: '50px', border: '1px solid var(--sky-200)', background: 'var(--white)', color: 'var(--navy-900)', outline: 'none', boxShadow: '0 4px 6px rgba(18,48,107,0.05)' }}
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.8rem 1.5rem', borderRadius: '50px', border: '1px solid var(--sky-200)', background: 'var(--white)', color: 'var(--navy-900)', outline: 'none', cursor: 'pointer', boxShadow: '0 4px 6px rgba(18,48,107,0.05)', flex: '0 1 auto' }}
          >
            <option value="All" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>All Statuses</option>
            <option value="New" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>New</option>
            <option value="Contacted" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Contacted</option>
            <option value="Proposal Sent" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Proposal Sent</option>
            <option value="Closed Won" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Closed Won</option>
            <option value="Closed Lost" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Closed Lost</option>
          </select>
        </div>
      )}

      <div className="table-responsive" style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--sky-200)', overflowX: 'auto', overflowY: 'hidden', boxShadow: '0 4px 15px rgba(18,48,107,0.05)' }}>
        <table style={{ width: '100%', minWidth: '1400px', whiteSpace: 'nowrap', borderCollapse: 'collapse', textAlign: 'left', color: 'var(--navy-900)' }}>
          <thead>
            <tr style={{ background: 'var(--sky-100)' }}>
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
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Lead ID</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Client Info</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Source</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Notes/Comments</th>
              {!isEmployee && <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Assigned To</th>}
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Requirement</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>System Size</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Electricity Bill</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Quotation</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Follow-up Date</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <React.Fragment>
              {paginatedLeads.map(lead => (
                <tr 
                  key={lead.id}
                  style={{ borderBottom: '1px solid var(--sky-200)', background: selectedLeadIds.includes(lead.id) ? 'rgba(14, 165, 233, 0.05)' : 'transparent' }}
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
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-900)', fontSize: '0.9rem', fontWeight: 'bold' }}>{lead.id}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--navy-900)' }}>{lead.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-body)', marginTop: '0.3rem' }}>{lead.location} • {lead.phone}</div>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-900)' }}>
                    <select
                      value={lead.source || 'Manual'}
                      onChange={(e) => handleInlineUpdate(lead.id, 'source', e.target.value)}
                      style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', background: 'var(--sky-50)', fontSize: '0.8rem', border: '1px solid var(--sky-200)', color: 'var(--navy-900)', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="Website" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Website</option>
                      <option value="Referral" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Referral</option>
                      <option value="Facebook Ads" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Facebook Ads</option>
                      <option value="Google Ads" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Google Ads</option>
                      <option value="Manual" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Manual</option>
                    </select>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    {lead.comments ? (
                      <div style={{ fontSize: '0.85rem', color: '#d97706', fontStyle: 'italic', padding: '0.5rem', background: 'rgba(245,158,11,0.1)', borderRadius: '6px' }}>
                        💬 {lead.comments}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>No notes</span>
                    )}
                  </td>
                  {!isEmployee && (
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <select 
                        value={lead.assignedTo || ''}
                        onChange={(e) => handleInlineUpdate(lead.id, 'assignedTo', e.target.value)}
                        style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)', color: lead.assignedTo ? 'var(--blue-500)' : '#d97706', outline: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                      >
                        <option value="" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>-- Unassigned --</option>
                        {employeesList.map(emp => (
                          <option key={emp.username} value={emp.username} style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>{emp.username}</option>
                        ))}
                      </select>
                    </td>
                  )}
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-900)' }}>{lead.requirement}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-900)' }}>
                    <input 
                      type="text"
                      value={lead.systemSize || ''}
                      placeholder="-"
                      onChange={(e) => handleInlineUpdate(lead.id, 'systemSize', e.target.value)}
                      style={{ width: '80px', padding: '0.4rem 0.6rem', borderRadius: '4px', background: 'var(--sky-50)', border: '1px solid var(--sky-200)', color: 'var(--navy-900)', outline: 'none' }}
                    />
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-900)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span style={{ color: 'var(--navy-800)' }}>₹</span>
                      <input 
                        type="number"
                        value={lead.electricityBill || ''}
                        placeholder="-"
                        onChange={(e) => handleInlineUpdate(lead.id, 'electricityBill', e.target.value)}
                        style={{ width: '80px', padding: '0.4rem 0.6rem', borderRadius: '4px', background: 'var(--sky-50)', border: '1px solid var(--sky-200)', color: 'var(--navy-900)', outline: 'none' }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-900)' }}>
                    <input 
                      type="text"
                      value={lead.quotation || ''}
                      placeholder="-"
                      onChange={(e) => handleInlineUpdate(lead.id, 'quotation', e.target.value)}
                      style={{ width: '100px', padding: '0.4rem 0.6rem', borderRadius: '4px', background: 'var(--sky-50)', border: '1px solid var(--sky-200)', color: 'var(--navy-900)', outline: 'none' }}
                    />
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-900)' }}>
                    <input 
                      type="date"
                      value={lead.followUpDate || ''}
                      onChange={(e) => handleInlineUpdate(lead.id, 'followUpDate', e.target.value)}
                      style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', background: 'var(--sky-50)', border: '1px solid var(--sky-200)', color: 'var(--navy-900)', outline: 'none' }}
                    />
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <select
                      value={lead.status}
                      onChange={(e) => handleInlineUpdate(lead.id, 'status', e.target.value)}
                      style={{ 
                        padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', outline: 'none',
                        backgroundColor: getStatusStyle(lead.status).bg,
                        backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.6rem center',
                        backgroundSize: '0.6rem auto',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        color: getStatusStyle(lead.status).color,
                        textAlign: 'center', textAlignLast: 'center', margin: '0 auto', display: 'block'
                      }}
                    >
                      <option value="New" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>New</option>
                      <option value="Contacted" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Contacted</option>
                      <option value="Proposal Sent" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Proposal Sent</option>
                      <option value="Closed Won" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Closed Won</option>
                      <option value="Closed Lost" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Closed Lost</option>
                    </select>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleOpenEdit(lead)} 
                        title="Edit Lead"
                        style={{ background: 'var(--white)', border: '1px solid var(--sky-300)', color: 'var(--navy-800)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      {(!isEmployee || canDelete) && (
                        <button 
                          onClick={() => handleDelete(lead.id)} 
                          title="Delete Lead"
                          style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={isEmployee ? 7 : 9} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No active leads found matching your criteria.</td>
                </tr>
              )}
            </React.Fragment>
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', padding: '0.8rem 1.2rem', background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--sky-200)', boxShadow: '0 2px 8px rgba(18,48,107,0.04)' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--navy-800)', fontWeight: '500' }}>
            {itemsRangeText}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              style={{ padding: '0.4rem 0.9rem', borderRadius: '6px', border: '1px solid var(--sky-300)', background: currentPage === 1 ? 'var(--sky-100)' : 'var(--white)', color: 'var(--navy-900)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
            >
              &larr; Prev
            </button>
            {pagesList.map(pg => (
              <button 
                key={pg}
                onClick={() => goToPage(pg)}
                style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: currentPage === pg ? '1px solid var(--teal-500)' : '1px solid var(--sky-200)', background: currentPage === pg ? 'var(--teal-500)' : 'var(--white)', color: currentPage === pg ? 'white' : 'var(--navy-900)', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
              >
                {pg}
              </button>
            ))}
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              style={{ padding: '0.4rem 0.9rem', borderRadius: '6px', border: '1px solid var(--sky-300)', background: currentPage === totalPages ? 'var(--sky-100)' : 'var(--white)', color: 'var(--navy-900)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      )}

      {/* CRM Lead Modal */}
      <React.Fragment>
        {isModalOpen && (
          <div className="modal-wrapper" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(5px)' }}>
            <div 
              className="modal-responsive"
              style={{ background: 'var(--white)', width: '100%', maxWidth: '600px', borderRadius: '16px', padding: '2rem', border: '1px solid var(--sky-200)', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
            >
              <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--navy-900)', fontFamily: 'Outfit, sans-serif' }}>{editingLead ? 'Edit Lead Data' : 'Log New Lead'}</h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div className="crm-header-controls" style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Client Name</label>
                    <input 
                      type="text" required value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Phone Number</label>
                    <input 
                      type="text" required value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} 
                    />
                  </div>
                </div>
                
                <div className="crm-header-controls" style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Location / City</label>
                    <input 
                      type="text" required value={formData.location} 
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Lead Status</label>
                    <select 
                      value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }}
                    >
                      <option value="New" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>New</option>
                      <option value="Contacted" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Contacted</option>
                      <option value="Proposal Sent" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Proposal Sent</option>
                      <option value="Closed Won" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Closed Won</option>
                      <option value="Closed Lost" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Closed Lost</option>
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Lead Source</label>
                    <select 
                      value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }}
                    >
                      <option value="Website" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Website</option>
                      <option value="Referral" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Referral</option>
                      <option value="Facebook Ads" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Facebook Ads</option>
                      <option value="Google Ads" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Google Ads</option>
                      <option value="Manual" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>Manual</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Requirements</label>
                  <input 
                    type="text" required value={formData.requirement} 
                    placeholder="e.g. Residential"
                    onChange={e => setFormData({...formData, requirement: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} 
                  />
                </div>

                <div className="crm-header-controls" style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>System Size</label>
                    <input 
                      type="text" value={formData.systemSize} 
                      placeholder="e.g. 5kW"
                      onChange={e => setFormData({...formData, systemSize: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Electricity Bill (Monthly)</label>
                    <input 
                      type="number" value={formData.electricityBill} 
                      placeholder="e.g. 3000"
                      onChange={e => setFormData({...formData, electricityBill: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} 
                    />
                  </div>
                </div>

                <div className="crm-header-controls" style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Quotation Issued</label>
                    <input 
                      type="text" value={formData.quotation} 
                      placeholder="e.g. 2.5L or Pending"
                      onChange={e => setFormData({...formData, quotation: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Follow-up Date</label>
                    <input 
                      type="date" value={formData.followUpDate} 
                      onChange={e => setFormData({...formData, followUpDate: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none' }} 
                    />
                  </div>
                </div>

                {!isEmployee && (
                  <div>
                    <label style={{ display: 'block', color: '#f59e0b', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Assign To Employee (Optional)</label>
                    <select 
                      value={formData.assignedTo} onChange={e => setFormData({...formData, assignedTo: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.3)', background: 'var(--yellow-100)', color: 'var(--navy-900)', outline: 'none' }}
                    >
                      <option value="" style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>-- Leave Unassigned --</option>
                      {employeesList.map(emp => (
                        <option key={emp.username} value={emp.username} style={{ background: 'var(--white)', color: 'var(--navy-900)' }}>{emp.username} - {emp.role}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', color: 'var(--navy-800)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Additional Comments / Notes</label>
                  <textarea 
                    value={formData.comments} 
                    placeholder="Enter any follow-up notes, special requirements, or remarks..."
                    onChange={e => setFormData({...formData, comments: e.target.value})}
                    rows={3}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none', resize: 'vertical' }} 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'var(--white)', color: 'var(--text-body)', border: '1px solid var(--sky-200)', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>Cancel</button>
                  <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>Save Lead</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
}
