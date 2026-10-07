import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CrmLeadsManager from '../components/admin/CrmLeadsManager';
import AdminProjectTracker from '../components/admin/AdminProjectTracker';
import AdminWhatsApp from '../components/admin/AdminWhatsApp';
import ContentManager from '../components/admin/ContentManager';

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentEmployee'));
    if (!user) {
      navigate('/portal');
      return;
    }

    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const currentRecord = storedEmployees.find(e => e.username === user.username);

    if (!currentRecord || currentRecord.status !== 'Active') {
      localStorage.removeItem('currentEmployee');
      navigate('/portal');
    } else {
      const perms = currentRecord.permissions || ['My Tasks', 'CRM Leads', 'Messages'];
      setEmployee({ ...user, role: currentRecord.role, permissions: perms, capabilities: currentRecord.capabilities });
      if (perms.length > 0) setActiveTab(perms[0]);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentEmployee');
    navigate('/portal');
  };

  const getTabStyle = (tabName) => ({
    padding: '0.8rem 1rem', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    transition: 'all 0.3s',
    background: activeTab === tabName ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
    color: activeTab === tabName ? '#38bdf8' : '#94a3b8',
    fontWeight: activeTab === tabName ? 'bold' : 'normal',
    marginBottom: '0.5rem'
  });

  const renderContent = () => {
    if (!employee.permissions.includes(activeTab)) {
      return (
        <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '12px', textAlign: 'center', color: '#ef4444' }}>
          Restricted access. You do not have permission to view {activeTab}.
        </div>
      );
    }

    switch (activeTab) {
      case 'CRM Leads':
        return <CrmLeadsManager isEmployee={true} currentEmployeeUsername={employee.username} canDelete={employee.capabilities?.canDelete} />;
      case 'Project Tracker':
        return <AdminProjectTracker isEmployee={true} />;
      case 'WhatsApp Auto':
        return <AdminWhatsApp isEmployee={true} />;
      case 'Content Manager':
        return <ContentManager isEmployee={true} />;
      case 'Messages':
        return (
          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>Internal Messages</h2>
             <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>You have 0 unread messages from management.</p>
             <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px', color: '#64748b' }}>
               No new communications at this time.
             </div>
          </div>
        );
      case 'My Tasks':
      default:
        return (
          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>My Assigned Tasks</h2>
             <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Manage your daily operational workflows.</p>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
                   <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Client Follow Up - L-492</h4>
                   <p style={{ margin: 0, color: '# cbd5e1', fontSize: '0.9rem' }}>Contact Ramesh Kumar regarding residential 5kW panel queries.</p>
                </div>
                {employee.capabilities?.canAssign && (
                  <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px dashed #8b5cf6', color: '#c4b5fd', textAlign: 'center', cursor: 'pointer' }}>
                     + Delegate New Task (Manager specific)
                  </div>
                )}
             </div>
          </div>
        );
    }
  };

  if (!employee) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#020617', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '260px', background: '#0f172a', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.6rem', fontFamily: 'Outfit, sans-serif', marginBottom: '3rem' }}>
          Staff<span style={{ color: '#38bdf8' }}>Portal</span>
        </h2>
        
        <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(56,189,248,0.2)', marginBottom: '2rem' }}>
          <div style={{ color: '#e2e8f0', fontWeight: 'bold' }}>{employee.username}</div>
          <div style={{ color: '#38bdf8', fontSize: '0.8rem', marginTop: '0.2rem' }}>{employee.role}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h4 style={{ color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Granted Access</h4>
          {employee.permissions.length === 0 && (
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>No modules mapped to this account.</div>
          )}
          {employee.permissions.map(perm => (
            <div key={perm} onClick={() => setActiveTab(perm)} style={getTabStyle(perm)}>
              {perm}
            </div>
          ))}
        </div>

        <button onClick={handleLogout} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '0.8rem', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => {e.target.style.background='rgba(239,68,68,0.1)';}} onMouseLeave={e => {e.target.style.background='transparent';}}>
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif' }}>Welcome back, {employee.username}</h1>
          <div style={{ background: '#0f172a', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem' }}>
            Portal Access: <span style={{ color: '#34d399', fontWeight: 'bold' }}>Active</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
