import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import CrmLeadsManager from '../components/admin/CrmLeadsManager';
import AdminProjectTracker from '../components/admin/AdminProjectTracker';
import AdminWhatsApp from '../components/admin/AdminWhatsApp';
import ContentManager from '../components/admin/ContentManager';

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  const renderContent = () => {
    if (!employee || !employee.permissions.includes(activeTab)) {
      return (
        <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '12px', textAlign: 'center', color: '#ef4444', border: '1px solid var(--sky-200)' }}>
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
          <div style={{ background: 'var(--white)', borderRadius: '16px', padding: 'clamp(1.2rem, 3vw, 2rem)', border: '1px solid var(--sky-200)', boxShadow: '0 8px 25px rgba(18,48,107,0.05)' }}>
             <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif', color: 'var(--navy-900)', fontWeight: 700 }}>Internal Messages</h2>
             <p style={{ color: 'var(--text-body)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>You have 0 unread messages from management.</p>
             <div style={{ padding: '3rem 1.5rem', textAlign: 'center', border: '2px dashed var(--sky-200)', borderRadius: '12px', color: 'var(--text-muted)', background: 'var(--sky-50)' }}>
               No new communications at this time.
             </div>
          </div>
        );
      case 'My Tasks':
      default:
        return (
          <div style={{ background: 'var(--white)', borderRadius: '16px', padding: 'clamp(1.2rem, 3vw, 2rem)', border: '1px solid var(--sky-200)', boxShadow: '0 8px 25px rgba(18, 48, 107, 0.05)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
               <div>
                 <h2 style={{ fontSize: '1.4rem', margin: 0, fontFamily: 'Outfit, sans-serif', color: 'var(--navy-900)', fontWeight: 700 }}>My Assigned Tasks</h2>
                 <p style={{ color: 'var(--text-body)', margin: '0.3rem 0 0 0', fontSize: '0.92rem' }}>Manage your daily operational workflows.</p>
               </div>
               {employee.capabilities?.canAssign && (
                 <button style={{ background: 'var(--teal-500)', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(20, 163, 168, 0.25)', fontSize: '0.88rem' }}>
                    + Delegate New Task
                 </button>
               )}
             </div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'var(--sky-50)', padding: '1.4rem', borderRadius: '12px', border: '1px solid var(--sky-200)', borderLeft: '4px solid var(--teal-500)', boxShadow: '0 2px 8px rgba(18, 48, 107, 0.04)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                     <h4 style={{ margin: 0, color: 'var(--navy-900)', fontSize: '1.05rem', fontWeight: 700 }}>Client Follow Up - L-492</h4>
                     <span style={{ fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 'bold' }}>
                       Priority: High
                     </span>
                   </div>
                   <p style={{ margin: 0, color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: '1.5' }}>Contact Ramesh Kumar regarding residential 5kW panel queries.</p>
                </div>

                <div style={{ background: 'var(--sky-50)', padding: '1.4rem', borderRadius: '12px', border: '1px solid var(--sky-200)', borderLeft: '4px solid #3b82f6', boxShadow: '0 2px 8px rgba(18, 48, 107, 0.04)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                     <h4 style={{ margin: 0, color: 'var(--navy-900)', fontSize: '1.05rem', fontWeight: 700 }}>Site Inspection Review</h4>
                     <span style={{ fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.15)', color: '#2563eb', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 'bold' }}>
                       Routine
                     </span>
                   </div>
                   <p style={{ margin: 0, color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: '1.5' }}>Verify roof structural analysis and shadow calculation report for Gurugram project.</p>
                </div>
             </div>
          </div>
        );
    }
  };

  if (!employee) return null;

  return (
    <div className="admin-dash-container" style={{ 
      background: 'var(--sky-50)', 
      minHeight: '100vh', 
      fontFamily: 'Inter, sans-serif' 
    }}>
      {/* Mobile Sticky Top Header with Hamburger */}
      <header className="admin-mobile-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            id="employeeHamburgerBtn"
            type="button" 
            className="admin-hamburger-btn" 
            onClick={() => setIsMobileSidebarOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
          >
            <Menu size={22} />
          </button>
          <div className="admin-mobile-brand">
            <span>Staff</span><span style={{ color: 'var(--teal-400)' }}>Portal</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div className="admin-mobile-active-pill">
            {activeTab}
          </div>
          <button 
            onClick={handleLogout} 
            title="Sign Out"
            style={{ 
              background: 'rgba(239, 68, 68, 0.12)', 
              border: '1px solid rgba(239, 68, 68, 0.3)', 
              color: '#ef4444', 
              padding: '0.4rem 0.6rem', 
              borderRadius: '8px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="admin-sidebar-backdrop" 
          onClick={() => setIsMobileSidebarOpen(false)} 
        />
      )}

      {/* Sidebar (Desktop Sticky / Mobile Slide-in Drawer) */}
      <aside className={`admin-sidebar hide-scrollbar ${isMobileSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h2 className="admin-sidebar-logo" style={{ margin: 0, fontSize: '1.4rem' }}>
            <span>Staff</span><span style={{ color: 'var(--teal-400)' }}>Portal</span>
          </h2>
          <button 
            id="employeeSidebarCloseBtn"
            type="button" 
            className="admin-sidebar-close-btn"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* User Card */}
        <div style={{ 
          background: 'rgba(20, 163, 168, 0.12)', 
          padding: '1rem', 
          borderRadius: '14px', 
          border: '1px solid rgba(20, 163, 168, 0.25)', 
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--teal-500), var(--sky-400))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            flexShrink: 0
          }}>
            {employee.username ? employee.username.slice(0, 2).toUpperCase() : 'EM'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem', textTransform: 'capitalize' }}>
              {employee.username}
            </div>
            <div style={{ color: 'var(--teal-400)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
              {employee.role || 'Staff Member'}
            </div>
          </div>
        </div>

        {/* Granted Access Nav list */}
        <div className="admin-nav hide-scrollbar">
          <h4 style={{ color: 'var(--sky-200)', opacity: 0.7, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '1px' }}>
            Granted Access
          </h4>
          {employee.permissions.length === 0 && (
            <div style={{ color: 'var(--sky-200)', fontSize: '0.85rem', textAlign: 'center', marginTop: '2rem' }}>No modules mapped.</div>
          )}
          {employee.permissions.map(perm => (
            <button 
              key={perm}
              type="button"
              onClick={() => handleTabSwitch(perm)}
              className={`admin-tab-btn ${activeTab === perm ? 'active' : ''}`}
            >
              <span>{perm}</span>
            </button>
          ))}
        </div>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-terminate-btn">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '1rem', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem' 
        }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', fontFamily: 'Outfit, sans-serif', margin: 0, color: 'var(--navy-900)', fontWeight: 700 }}>
              Welcome back, <span style={{ color: 'var(--teal-600)', textTransform: 'capitalize' }}>{employee.username}</span>
            </h1>
            <p style={{ color: 'var(--text-body)', margin: '0.35rem 0 0 0', fontSize: '0.95rem' }}>
              Signed in as <strong style={{ color: 'var(--navy-800)' }}>{employee.role}</strong>
            </p>
          </div>
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.1)', 
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '0.5rem 1.1rem', 
            borderRadius: '50px', 
            fontSize: '0.88rem',
            color: 'var(--navy-900)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            boxShadow: '0 2px 6px rgba(16, 185, 129, 0.1)'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 6px #10b981' }}></span>
            Portal Access: <span style={{ color: '#059669', fontWeight: 'bold' }}>Active</span>
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
