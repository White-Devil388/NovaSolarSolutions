import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    borderRadius: '12px', 
    cursor: 'pointer', 
    transition: 'all 0.3s',
    background: activeTab === tabName ? 'rgba(245,158,11,0.15)' : 'transparent',
    color: activeTab === tabName ? '#f59e0b' : '#94a3b8',
    fontWeight: activeTab === tabName ? 'bold' : 'normal',
    marginBottom: '0.2rem',
    border: activeTab === tabName ? '1px solid rgba(245,158,11,0.4)' : '1px solid transparent',
    boxShadow: activeTab === tabName ? '0 4px 12px rgba(245,158,11,0.1)' : 'none',
    width: '100%',
    textAlign: 'left'
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
          <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '16px', padding: '2rem', minHeight: '300px', border: '1px solid rgba(255,255,255,0.05)' }}>
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
          <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '16px', padding: '2rem', minHeight: '350px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>My Assigned Tasks</h2>
             <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Manage your daily operational workflows.</p>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                   <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Client Follow Up - L-492</h4>
                   <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.9rem' }}>Contact Ramesh Kumar regarding residential 5kW panel queries.</p>
                </div>
                {employee.capabilities?.canAssign && (
                  <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px dashed #f59e0b', color: '#fcd34d', textAlign: 'center', cursor: 'pointer' }}>
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
    <div className="admin-dash-container" style={{ minHeight: '100vh', display: 'flex', background: `linear-gradient(to right, rgba(2, 6, 23, 0.6), rgba(15, 23, 42, 0.4))`, color: 'white', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div className="admin-sidebar hide-scrollbar">
        <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', marginBottom: '2.5rem', marginTop: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          <span>Staff</span><span style={{ color: '#f59e0b' }}>Portal</span>
        </h2>
        
        <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
          <div style={{ color: '#e2e8f0', fontWeight: 'bold' }}>{employee.username}</div>
          <div style={{ color: '#f59e0b', fontSize: '0.8rem', marginTop: '0.2rem' }}>{employee.role}</div>
        </div>

        <div className="admin-nav" style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '0.3rem' }}>
          <h4 style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>Granted Access</h4>
          {employee.permissions.length === 0 && (
            <div style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', marginTop: '2rem' }}>No modules mapped.</div>
          )}
          {employee.permissions.map(perm => (
            <div key={perm}>
              <div onClick={() => setActiveTab(perm)} style={getTabStyle(perm)}>
                <div style={{ pointerEvents: 'none' }}>{perm}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto' }}>
          <button onClick={handleLogout} style={{ width: '100%', background: 'transparent', border: '1px solid rgba(239,68,68,0.2)', padding: '1rem', color: '#ef4444', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.3s', fontWeight: 'bold' }} onMouseEnter={e => {e.target.style.background='rgba(239,68,68,0.15)'; e.target.style.boxShadow='0 0 15px rgba(239,68,68,0.2)'}} onMouseLeave={e => {e.target.style.background='transparent'; e.target.style.boxShadow='none'}}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
            Welcome back, {employee.username}
          </h1>
          <div style={{ background: '#0f172a', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem' }}>
            Portal Access: <span style={{ color: '#34d399', fontWeight: 'bold' }}>Active</span>
          </div>
        </div>

        <div>
          {activeTab && (
            <div>
              {renderContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
