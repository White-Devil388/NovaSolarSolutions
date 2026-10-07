import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DUMMY_PROJECTS = [
  { id: "PRJ-801", client: "Ramesh Kumar", spec: "Residential - 5kW", quotation: 290000, deal: 275000, cost: 220000, status: "Installation" },
  { id: "PRJ-855", client: "Vikas Enterprises", spec: "Commercial - 50kW", quotation: 2100000, deal: 1950000, cost: 1600000, status: "Completed" },
  { id: "PRJ-891", client: "Priya Sharma", spec: "Residential - 10kW", quotation: 550000, deal: 490000, cost: 510000, status: "Procurement" } // Intentional Loss example
];

export default function AdminProjectTracker() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('solarProjects');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('solarProjects', JSON.stringify(DUMMY_PROJECTS));
    return DUMMY_PROJECTS;
  });

  useEffect(() => {
    localStorage.setItem('solarProjects', JSON.stringify(projects));
  }, [projects]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ client: '', spec: '', quotation: 0, deal: 0, cost: 0, status: 'Planning' });

  // Calculate Metrics
  const metrics = useMemo(() => {
    let totalRevenue = 0;
    let totalCost = 0;
    
    projects.forEach(p => {
      totalRevenue += Number(p.deal) || 0;
      totalCost += Number(p.cost) || 0;
    });

    const netProfit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0;

    return { totalRevenue, totalCost, netProfit, profitMargin };
  }, [projects]);

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({ ...project });
    setIsModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingProject(null);
    setFormData({ client: '', spec: '', quotation: 0, deal: 0, cost: 0, status: 'Planning' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...formData } : p));
    } else {
      const newProj = {
        id: `PRJ-${Math.floor(Math.random() * 900) + 100}`,
        ...formData
      };
      setProjects([newProj, ...projects]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleInlineStatus = (id, newStatus) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planning': return { bg: 'rgba(96, 165, 250, 0.2)', color: '#60a5fa' };
      case 'Procurement': return { bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' };
      case 'Installation': return { bg: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' };
      case 'Commissioning': return { bg: 'rgba(14, 165, 233, 0.2)', color: '#38bdf8' };
      case 'Completed': return { bg: 'rgba(16, 185, 129, 0.2)', color: '#34d399' };
      default: return { bg: 'rgba(255,255,255,0.1)', color: 'white' };
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', color: 'white', margin: 0 }}>Project Operations & Financials</h2>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Track installation stages and project profitability</p>
        </div>
        <button 
          onClick={handleOpenNew}
          style={{ background: '#10b981', border: 'none', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          + Log New Project
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ 
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.6)), url(/images/project_revenue.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600', textShadow: '0 2px 8px rgba(0,0,0,1)' }}>Gross Revenue (Deals)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', textShadow: '0 4px 12px rgba(0,0,0,1), 0 0 5px rgba(0,0,0,0.5)' }}>{formatCurrency(metrics.totalRevenue)}</div>
        </div>
        <div style={{ 
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.25), rgba(15, 23, 42, 0.65)), url(/images/project_cost.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600', textShadow: '0 2px 8px rgba(0,0,0,1)' }}>Total Execution Cost</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', textShadow: '0 4px 12px rgba(0,0,0,1), 0 0 5px rgba(0,0,0,0.5)' }}>{formatCurrency(metrics.totalCost)}</div>
        </div>
        <div style={{ 
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.6)), url(/images/project_profit.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          padding: '1.5rem', borderRadius: '12px', border: `1px solid rgba(${metrics.netProfit >= 0 ? '16, 185, 129' : '239, 68, 68'}, 0.4)`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600', textShadow: '0 2px 8px rgba(0,0,0,1)' }}>Net Profit / Loss</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: metrics.netProfit >= 0 ? '#4ade80' : '#f87171', textShadow: '0 4px 12px rgba(0,0,0,1), 0 0 5px rgba(0,0,0,0.5)' }}>
            {metrics.netProfit >= 0 ? '+' : ''}{formatCurrency(metrics.netProfit)}
          </div>
        </div>
        <div style={{ 
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.6)), url(/images/project_margin.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600', textShadow: '0 2px 8px rgba(0,0,0,1)' }}>Overall Margin</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', textShadow: '0 4px 12px rgba(0,0,0,1), 0 0 5px rgba(0,0,0,0.5)' }}>
            {metrics.profitMargin}%
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'white' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.3)' }}>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Project & Client</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Installation Status</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Quoted vs Deal</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Est. Cost</th>
              <th style={{ padding: '1rem 1.5rem', color: '#f59e0b', fontWeight: '500' }}>Profit / Loss</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {projects.map(proj => {
                const pnl = Number(proj.deal) - Number(proj.cost);
                const isProfit = pnl >= 0;

                return (
                  <motion.tr 
                    key={proj.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#38bdf8' }}>{proj.id}</div>
                      <div style={{ fontSize: '0.9rem', marginTop: '0.2rem' }}>{proj.client}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>{proj.spec}</div>
                    </td>
                    
                    {/* Status Dropdown */}
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <select
                        value={proj.status}
                        onChange={(e) => handleInlineStatus(proj.id, e.target.value)}
                        style={{ 
                          padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', outline: 'none',
                          background: getStatusColor(proj.status).bg,
                          color: getStatusColor(proj.status).color
                        }}
                      >
                        <option value="Planning" style={{ background: '#1e293b', color: 'white' }}>Planning</option>
                        <option value="Procurement" style={{ background: '#1e293b', color: 'white' }}>Procurement</option>
                        <option value="Installation" style={{ background: '#1e293b', color: 'white' }}>Installation</option>
                        <option value="Commissioning" style={{ background: '#1e293b', color: 'white' }}>Commissioning</option>
                        <option value="Completed" style={{ background: '#1e293b', color: 'white' }}>Completed</option>
                      </select>
                    </td>

                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'line-through' }}>{formatCurrency(proj.quotation)}</div>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'white', marginTop: '0.2rem' }}>{formatCurrency(proj.deal)}</div>
                    </td>
                    
                    <td style={{ padding: '1.2rem 1.5rem', color: '#cbd5e1' }}>
                      {formatCurrency(proj.cost)}
                    </td>

                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <span style={{ 
                        padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold',
                        background: isProfit ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: isProfit ? '#34d399' : '#f87171',
                        border: `1px solid ${isProfit ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                      }}>
                        {isProfit ? '+' : ''}{formatCurrency(pnl)}
                      </span>
                    </td>

                    <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                      <motion.button 
                        onClick={() => handleOpenEdit(proj)} 
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(96, 165, 250, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{ background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.2)', color: '#60a5fa', cursor: 'pointer', marginRight: '0.5rem', fontWeight: '600', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', outline: 'none' }}
                      >
                        Edit
                      </motion.button>
                      <motion.button 
                        onClick={() => handleDelete(proj.id)} 
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(248, 113, 113, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.2)', color: '#f87171', cursor: 'pointer', fontWeight: '600', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', outline: 'none' }}
                      >
                        Del
                      </motion.button>
                    </td>
                  </motion.tr>
                );
              })}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No active projects found.</td>
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
                {editingProject ? `Edit Project Financials (${editingProject.id})` : 'Create New Project'}
              </h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Client Name</label>
                    <input type="text" required value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Project Spec / Size</label>
                    <input type="text" required value={formData.spec} placeholder="e.g. Residential - 5kW" onChange={e => setFormData({...formData, spec: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Quotation Amount (₹)</label>
                    <input type="number" required value={formData.quotation} onChange={e => setFormData({...formData, quotation: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#10b981', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Final Deal Amount (₹)</label>
                    <input type="number" required value={formData.deal} onChange={e => setFormData({...formData, deal: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.05)', color: 'white', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#f87171', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Total Execution Cost (₹)</label>
                    <input type="number" required value={formData.cost} onChange={e => setFormData({...formData, cost: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.05)', color: 'white', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Execution Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: 'white', outline: 'none' }}>
                      <option>Planning</option><option>Procurement</option><option>Installation</option><option>Commissioning</option><option>Completed</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px' }}>Cancel</button>
                  <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>Save Project</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
