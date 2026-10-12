import React, { useState, useEffect, useMemo, useCallback } from 'react';
import usePagination from '../../hooks/usePagination';

export default function AdminQuotations() {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'form'
  const [searchQuery, setSearchQuery] = useState('');
  
  const [quotations, setQuotations] = useState([
    { id: 'Q-001', client: 'Ramesh Kumar', system: '5kW On-Grid', amount: '₹ 2,50,000', status: 'Pending', date: '2023-10-15' },
    { id: 'Q-002', client: 'Vikas Enterprises', system: '50kW Hybrid', amount: '₹ 22,00,000', status: 'Approved', date: '2023-10-12' },
    { id: 'Q-003', client: 'Priya Sharma', system: '10kW On-Grid', amount: '₹ 4,50,000', status: 'Rejected', date: '2023-10-10' }
  ]);

  const defaultForm = {
    clientName: '', clientPhone: '', clientEmail: '', clientAddress: '',
    systemCapacity: '5', systemType: 'On-Grid', panelBrand: 'Waaree', 
    panelWattage: '540', panelQty: '10', inverterBrand: 'Growatt', 
    inverterCapacity: '5', baseCost: '', subsidy: '', tax: '13.8', totalAmount: '', validity: '15', notes: ''
  };

  const [formData, setFormData] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    const base = parseFloat(formData.baseCost) || 0;
    const sub = parseFloat(formData.subsidy) || 0;
    const taxes = parseFloat(formData.tax) || 0;
    const taxableAmount = base - sub;
    const finalAmount = taxableAmount + (taxableAmount * (taxes / 100));
    setFormData(prev => ({ ...prev, totalAmount: finalAmount.toFixed(0) }));
  }, [formData.baseCost, formData.subsidy, formData.tax]);

  // Memoized filtered quotations
  const filteredQuotations = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return quotations;
    return quotations.filter(q => 
      q.client.toLowerCase().includes(query) ||
      q.id.toLowerCase().includes(query) ||
      q.system.toLowerCase().includes(query) ||
      q.status.toLowerCase().includes(query)
    );
  }, [quotations, searchQuery]);

  // Memoized pipeline statistics
  const pipelineStats = useMemo(() => {
    const approved = quotations.filter(q => q.status === 'Approved').length;
    const pending = quotations.filter(q => q.status === 'Pending').length;
    return { total: quotations.length, approved, pending };
  }, [quotations]);

  // Pagination hook
  const {
    currentData: paginatedQuotations,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    itemsRangeText,
    pagesList
  } = usePagination(filteredQuotations, 5);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const newQuotation = {
      id: editingId || `Q-00${Math.floor(Math.random() * 900) + 100}`,
      client: formData.clientName,
      system: `${formData.systemCapacity}kW ${formData.systemType}`,
      amount: `₹ ${new Intl.NumberFormat('en-IN').format(formData.totalAmount)}`,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    if (editingId) {
      setQuotations(prev => prev.map(q => q.id === editingId ? { ...q, ...newQuotation } : q));
      alert('Quotation updated successfully!');
    } else {
      setQuotations(prev => [newQuotation, ...prev]);
      alert('Quotation generated successfully!');
    }
    
    setEditingId(null);
    setViewMode('list');
    setFormData(defaultForm);
  }, [editingId, formData, defaultForm]);

  const handleEdit = (q) => {
    setFormData({
      ...defaultForm,
      clientName: q.client,
      totalAmount: q.amount.replace(/[^0-9]/g, '')
    });
    setEditingId(q.id);
    setViewMode('form');
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quotation?")) {
      setQuotations(quotations.filter(q => q.id !== id));
    }
  };

  const handleDownload = (q, type) => {
    const content = `Quotation ID: ${q.id}\nClient: ${q.client}\nSystem Config: ${q.system}\nTotal Amount: ${q.amount}\nStatus: ${q.status}\nDate: ${q.date}`;
    const mimeType = type === 'word' ? 'application/msword' : 'application/pdf';
    const extension = type === 'word' ? 'doc' : 'pdf';
    
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Quotation_${q.id}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const inputStyle = {
    width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--sky-200)', 
    background: 'var(--sky-50)', color: 'var(--navy-900)', outline: 'none', fontSize: '0.9rem'
  };
  const labelStyle = { display: 'block', fontSize: '0.85rem', color: 'var(--navy-800)', marginBottom: '0.4rem', fontWeight: 600 };
  const sectionTitleStyle = { fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '1rem', borderBottom: '1px solid var(--sky-200)', paddingBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' };

  return (
    <div >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', color: 'var(--navy-900)', margin: 0 }}>Quotations & Proposals</h2>
          <p style={{ color: 'var(--text-body)', margin: '0.5rem 0 0 0' }}>Manage client quotations and technical solar proposals.</p>
        </div>
        {viewMode === 'list' ? (
          <button onClick={() => { setEditingId(null); setFormData(defaultForm); setViewMode('form'); }} style={{ background: '#3b82f6', color: 'white', fontWeight: 'bold', padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
            + Create Quotation
          </button>
        ) : (
          <button onClick={() => { setViewMode('list'); setEditingId(null); setFormData(defaultForm); }} style={{ background: 'var(--white)', color: 'var(--navy-800)', fontWeight: 'bold', padding: '0.6rem 1.2rem', borderRadius: '6px', border: '1px solid var(--sky-300)', cursor: 'pointer' }}>
            &larr; Back to List
          </button>
        )}
      </div>

      <React.Fragment>
        {viewMode === 'list' && (
          <div key="list" >
            {/* Search and Summary */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
              <input 
                type="text"
                placeholder="🔍 Search Quotation by Client, ID, or System..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: '1 1 300px', maxWidth: '500px', padding: '0.7rem 1.2rem', borderRadius: '50px', border: '1px solid var(--sky-200)', background: 'var(--white)', color: 'var(--navy-900)', outline: 'none', boxShadow: '0 2px 6px rgba(18,48,107,0.04)' }}
              />
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                <span style={{ color: 'var(--navy-800)' }}>Total: {pipelineStats.total}</span>
                <span style={{ color: 'var(--teal-600)' }}>Approved: {pipelineStats.approved}</span>
                <span style={{ color: '#d97706' }}>Pending: {pipelineStats.pending}</span>
              </div>
            </div>

            <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--sky-200)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(18,48,107,0.05)' }}>
              <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '750px' }}>
                <thead>
                  <tr style={{ background: 'var(--sky-100)' }}>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Quot ID</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Client</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>System Config</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Amount</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Date</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Status</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedQuotations.map((q, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--sky-200)' }}>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-900)' }}>{q.id}</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-900)', fontWeight: 'bold' }}>{q.client}</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-body)' }}>{q.system}</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'var(--teal-600)', fontWeight: 'bold' }}>{q.amount}</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'var(--navy-800)' }}>{q.date}</td>
                      <td style={{ padding: '1.2rem 1.5rem' }}>
                        <span style={{ 
                          padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold',
                          background: q.status === 'Approved' ? 'rgba(16,185,129,0.15)' : q.status === 'Pending' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                          color: q.status === 'Approved' ? 'var(--teal-600)' : q.status === 'Pending' ? '#d97706' : '#ef4444'
                        }}>
                          {q.status}
                        </span>
                      </td>
                      <td style={{ padding: '1.2rem 1.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <button onClick={() => handleEdit(q)} style={{ background: 'var(--white)', border: '1px solid var(--sky-300)', color: 'var(--navy-800)', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>Edit</button>
                          <button onClick={() => handleDelete(q.id)} style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>Del</button>
                          <button onClick={() => handleDownload(q, 'pdf')} style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--teal-600)', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>PDF</button>
                          <button onClick={() => handleDownload(q, 'word')} style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.3)', color: '#d97706', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>Word</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredQuotations.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No quotations match your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1.2rem', padding: '0.8rem 1.2rem', background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--sky-200)', boxShadow: '0 2px 8px rgba(18,48,107,0.04)' }}>
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
          </div>
        )}

        {viewMode === 'form' && (
          <div key="form" >
            <form onSubmit={handleSubmit} style={{ background: 'var(--white)', padding: 'clamp(1.5rem, 3vw, 2rem)', borderRadius: '12px', border: '1px solid var(--sky-200)', boxShadow: '0 4px 15px rgba(18,48,107,0.05)', boxSizing: 'border-box' }}>
              
              {/* Client Details Section */}
              <h3 style={sectionTitleStyle}>1. Client Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={labelStyle}>Client / Company Name</label>
                  <input type="text" name="clientName" value={formData.clientName} onChange={handleInputChange} style={inputStyle} required placeholder="E.g., Ramesh Surya Ltd" />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input type="tel" name="clientPhone" value={formData.clientPhone} onChange={handleInputChange} style={inputStyle} required placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleInputChange} style={inputStyle} placeholder="client@email.com" />
                </div>
                <div>
                  <label style={labelStyle}>Installation Address</label>
                  <input type="text" name="clientAddress" value={formData.clientAddress} onChange={handleInputChange} style={inputStyle} required placeholder="Full site address" />
                </div>
              </div>

              {/* Technical Specifications */}
              <h3 style={sectionTitleStyle}>2. Technical Specifications</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={labelStyle}>System Capacity (kW)</label>
                  <input type="number" name="systemCapacity" value={formData.systemCapacity} onChange={handleInputChange} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>System Type</label>
                  <select name="systemType" value={formData.systemType} onChange={handleInputChange} style={inputStyle}>
                    <option value="On-Grid">On-Grid (Net Metering)</option>
                    <option value="Off-Grid">Off-Grid (Battery Sync)</option>
                    <option value="Hybrid">Hybrid System</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Panel Brand</label>
                  <select name="panelBrand" value={formData.panelBrand} onChange={handleInputChange} style={inputStyle}>
                    <option value="Waaree">Waaree</option>
                    <option value="Vikram Solar">Vikram Solar</option>
                    <option value="Tata Power">Tata Power</option>
                    <option value="Adani Solar">Adani Solar</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Panel Wattage (Wp)</label>
                  <input type="number" name="panelWattage" value={formData.panelWattage} onChange={handleInputChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>No. of Panels</label>
                  <input type="number" name="panelQty" value={formData.panelQty} onChange={handleInputChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Inverter Capacity (kW)</label>
                  <input type="number" name="inverterCapacity" value={formData.inverterCapacity} onChange={handleInputChange} style={inputStyle} />
                </div>
              </div>

              {/* Financials & Commercials */}
              <h3 style={sectionTitleStyle}>3. Commercials</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={labelStyle}>Base System Cost (₹)</label>
                  <input type="number" name="baseCost" value={formData.baseCost} onChange={handleInputChange} style={inputStyle} required placeholder="Total component cost" />
                </div>
                <div>
                  <label style={labelStyle}>Less: Govt. Subsidy (₹)</label>
                  <input type="number" name="subsidy" value={formData.subsidy} onChange={handleInputChange} style={inputStyle} placeholder="If applicable" />
                </div>
                <div>
                  <label style={labelStyle}>GST (%)</label>
                  <input type="number" name="tax" value={formData.tax} onChange={handleInputChange} style={inputStyle} step="0.1" />
                </div>
                <div>
                  <label style={labelStyle}>Final Amount (₹)</label>
                  <input type="text" value={`₹ ${new Intl.NumberFormat('en-IN').format(formData.totalAmount || 0)}`} readOnly style={{ ...inputStyle, background: 'rgba(16, 185, 129, 0.05)', color: 'var(--teal-600)', fontWeight: 'bold' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Validity (Days)</label>
                  <input type="number" name="validity" value={formData.validity} onChange={handleInputChange} style={inputStyle} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Special Notes / Exceptions</label>
                  <input type="text" name="notes" value={formData.notes} onChange={handleInputChange} style={inputStyle} placeholder="E.g. Extra structural cost included" />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', borderTop: '1px solid var(--sky-200)', paddingTop: '1.5rem' }}>
                <button type="button" onClick={() => { setViewMode('list'); setEditingId(null); setFormData(defaultForm); }} style={{ background: 'var(--white)', border: '1px solid var(--sky-200)', color: 'var(--text-body)', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                <button type="submit" style={{ background: '#3b82f6', border: 'none', color: 'white', fontWeight: 'bold', padding: '0.8rem 2rem', borderRadius: '8px', cursor: 'pointer' }}>{editingId ? 'Save Edits' : 'Generate Proposal'}</button>
              </div>
            </form>
          </div>
        )}
      </React.Fragment>
    </div>
  );
}
