import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminReports() {
  const [leadsData, setLeadsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    // Load from local storage or use basic defaults if empty
    const storedLeads = localStorage.getItem('solarLeads');
    if (storedLeads) setLeadsData(JSON.parse(storedLeads));
    
    const storedProjects = localStorage.getItem('solarProjects');
    if (storedProjects) setProjectsData(JSON.parse(storedProjects));
  }, []);

  // Compute CRM funnel metrics
  const funnelStats = useMemo(() => {
    const total = leadsData.length || 1; // prevent div/0
    let counts = { new: 0, contacted: 0, proposal: 0, won: 0, lost: 0 };
    leadsData.forEach(lead => {
      if (lead.status === 'New') counts.new++;
      else if (lead.status === 'Contacted') counts.contacted++;
      else if (lead.status === 'Proposal Sent') counts.proposal++;
      else if (lead.status === 'Closed Won') counts.won++;
      else if (lead.status === 'Closed Lost') counts.lost++;
    });
    return { ...counts, total };
  }, [leadsData]);

  // Compute Financial Metrics
  const financialStats = useMemo(() => {
    let rev = 0; let cost = 0;
    projectsData.forEach(p => {
      rev += Number(p.deal) || 0;
      cost += Number(p.cost) || 0;
    });
    const profit = rev - cost;
    const maxVal = Math.max(rev, cost, Math.abs(profit), 10000); // dynamic scale max
    return { rev, cost, profit, maxVal };
  }, [projectsData]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const handleDownloadCSV = () => {
    if (projectsData.length === 0) return alert("No financial data available to download.");
    
    const headers = ["Project ID", "Client Name", "Revenue (INR)", "Cost (INR)", "Status"];
    const rows = projectsData.map(p => [
      `"${p.id || ''}"`,
      `"${p.client || 'Unknown'}"`,
      p.deal || 0,
      p.cost || 0,
      `"${p.status || 'Pending'}"`
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "nova_financial_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', color: 'white', margin: 0 }}>Business Analytics</h2>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Real-time overview of CRM conversion and project financials.</p>
        </div>
        <button 
          onClick={handleDownloadCSV}
          style={{ background: '#10b981', border: 'none', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
        >
          <span>📥</span> Export CSV Report
        </button>
      </div>

      {/* Top Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total System Leads</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white' }}>{leadsData.length}</div>
        </div>
        <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Win Rate (Conversion)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#38bdf8' }}>
            {leadsData.length > 0 ? Math.round((funnelStats.won / leadsData.length) * 100) : 0}%
          </div>
        </div>
        <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Active Projects</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white' }}>{projectsData.length}</div>
        </div>
        <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Overall Net Profit</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: financialStats.profit >= 0 ? '#34d399' : '#f87171' }}>
            {financialStats.profit >= 0 ? '+' : ''}{formatCurrency(financialStats.profit)}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* CRM Pipeline Chart (Horizontal CSS Bars) */}
        <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: 'white', fontFamily: 'Outfit, sans-serif' }}>CRM Pipeline Funnel</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* New */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                <span>New Leads</span><span>{funnelStats.new}</span>
              </div>
              <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(funnelStats.new / funnelStats.total) * 100}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: '#60a5fa', borderRadius: '12px' }} />
              </div>
            </div>
            {/* Contacted */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                <span>Contacted</span><span>{funnelStats.contacted}</span>
              </div>
              <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(funnelStats.contacted / funnelStats.total) * 100}%` }} transition={{ duration: 1, delay: 0.2 }} style={{ height: '100%', background: '#f59e0b', borderRadius: '12px' }} />
              </div>
            </div>
            {/* Proposal */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                <span>Proposal Sent</span><span>{funnelStats.proposal}</span>
              </div>
              <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(funnelStats.proposal / funnelStats.total) * 100}%` }} transition={{ duration: 1, delay: 0.4 }} style={{ height: '100%', background: '#a855f7', borderRadius: '12px' }} />
              </div>
            </div>
            {/* Won */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                <span style={{ color: '#34d399', fontWeight: 'bold' }}>Closed Won</span><span style={{ color: '#34d399', fontWeight: 'bold' }}>{funnelStats.won}</span>
              </div>
              <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(funnelStats.won / funnelStats.total) * 100}%` }} transition={{ duration: 1, delay: 0.6 }} style={{ height: '100%', background: '#10b981', borderRadius: '12px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Flow (Vertical Bar Chart) */}
        <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: 'white', fontFamily: 'Outfit, sans-serif' }}>Project Financial Flow</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '250px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '1rem', border: '1px dashed rgba(255,255,255,0.1)' }}>
            
            {/* Revenue Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%' }}>
              <div style={{ color: 'white', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{formatCurrency(financialStats.rev)}</div>
              <motion.div initial={{ height: 0 }} animate={{ height: `${(financialStats.rev / financialStats.maxVal) * 200}px` }} transition={{ duration: 1.2 }} style={{ width: '100%', background: 'linear-gradient(to top, #0ea5e9, #38bdf8)', borderRadius: '6px 6px 0 0', minHeight: '5px' }} />
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.8rem' }}>Revenue</div>
            </div>

            {/* Cost Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%' }}>
              <div style={{ color: 'white', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{formatCurrency(financialStats.cost)}</div>
              <motion.div initial={{ height: 0 }} animate={{ height: `${(financialStats.cost / financialStats.maxVal) * 200}px` }} transition={{ duration: 1.2, delay: 0.3 }} style={{ width: '100%', background: 'linear-gradient(to top, #64748b, #94a3b8)', borderRadius: '6px 6px 0 0', minHeight: '5px' }} />
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.8rem' }}>Total Cost</div>
            </div>

            {/* Profit Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%' }}>
              <div style={{ color: financialStats.profit >= 0 ? '#34d399' : '#f87171', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                 {financialStats.profit >= 0 ? '+' : ''}{formatCurrency(financialStats.profit)}
              </div>
              <motion.div initial={{ height: 0 }} animate={{ height: `${(Math.abs(financialStats.profit) / financialStats.maxVal) * 200}px` }} transition={{ duration: 1.2, delay: 0.6 }} style={{ width: '100%', background: financialStats.profit >= 0 ? 'linear-gradient(to top, #059669, #10b981)' : 'linear-gradient(to top, #b91c1c, #ef4444)', borderRadius: '6px 6px 0 0', minHeight: '5px' }} />
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.8rem' }}>Net Space</div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
