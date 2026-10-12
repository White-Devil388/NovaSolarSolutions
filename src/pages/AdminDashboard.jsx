import React, { useState, lazy, Suspense, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableSkeleton } from '../components/ui/Skeleton';
import { Bell, LogOut, Menu, X } from 'lucide-react';

// Code-split admin submodules with React.lazy
const ContentManager = lazy(() => import('../components/admin/ContentManager'));
const CrmLeadsManager = lazy(() => import('../components/admin/CrmLeadsManager'));
const AdminProjectTracker = lazy(() => import('../components/admin/AdminProjectTracker'));
const AdminMeetings = lazy(() => import('../components/admin/AdminMeetings'));
const AdminReminders = lazy(() => import('../components/admin/AdminReminders'));
const AdminReports = lazy(() => import('../components/admin/AdminReports'));
const AdminWhatsApp = lazy(() => import('../components/admin/AdminWhatsApp'));
const AdminQuotations = lazy(() => import('../components/admin/AdminQuotations'));
const AdminAttendance = lazy(() => import('../components/admin/AdminAttendance'));

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [activeAlert, setActiveAlert] = useState(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, type: 'lead', title: 'New CRM Lead: Ramesh Kumar', desc: 'Residential 5kW inquiry registered', time: '10m ago', tab: 'CRM' },
    { id: 2, type: 'meeting', title: 'Upcoming Meeting', desc: 'Online consultation with Priya Sharma', time: '1h ago', tab: 'Meetings' },
    { id: 3, type: 'system', title: 'System Telemetry Optimal', desc: 'All solar telemetry services running normally', time: '2h ago', tab: 'Overview' },
  ];

  const handleTabSwitch = (tab) => {
    setIsMobileSidebarOpen(false);
    if (tab === activeTab) return;
    setIsTabLoading(true);
    setActiveTab(tab);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 320);
  };

  const [newEmpUsername, setNewEmpUsername] = useState('');
  const [newEmpPassword, setNewEmpPassword] = useState('');
  const [newEmpSalary, setNewEmpSalary] = useState('');
  const [newEmpIncentive, setNewEmpIncentive] = useState('');
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  const [editingUsername, setEditingUsername] = useState(null);
  
  // RBAC Permission States
  const [newEmpPermissions, setNewEmpPermissions] = useState(['My Tasks', 'CRM Leads', 'Messages']); 
  const availablePermissions = ['My Tasks', 'CRM Leads', 'Messages', 'Project Tracker', 'WhatsApp Auto', 'Content Manager', 'Quotations'];

  const togglePermission = (perm) => {
    setNewEmpPermissions(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
  };
  
  const [newEmpCapabilities, setNewEmpCapabilities] = useState({ canDelete: false, canAssign: false, officialComm: false });
  const [newEmpRole, setNewEmpRole] = useState('Sales Associate');

  React.useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const alertedEvents = JSON.parse(localStorage.getItem('alertedEvents') || '[]');
      
      const meetings = JSON.parse(localStorage.getItem('solarMeetings') || '[]');
      const reminders = JSON.parse(localStorage.getItem('solarReminders') || '[]');

      for (const m of meetings) {
        if (m.status !== 'Scheduled') continue;
        if (!m.date || !m.time) continue;
        const mtgTime = new Date(`${m.date}T${m.time}`);
        if (now >= mtgTime && !alertedEvents.includes(m.id)) {
          setActiveAlert({ type: 'Meeting', title: `Meeting Alert: ${m.client}`, desc: `Meeting scheduled at ${m.time} has passed.`, id: m.id });
          return;
        }
      }

      for (const r of reminders) {
        if (r.status === 'Done') continue;
        if (!r.date) continue;
        const rTime = new Date(r.date);
        
        if (rTime.toString() === 'Invalid Date') continue;
        if (now >= rTime && !alertedEvents.includes(r.id)) {
          setActiveAlert({ type: 'Reminder', title: 'Reminder Due', desc: r.message, id: r.id });
          return;
        }
      }
    };
    
    checkAlarms();
    const interval = setInterval(checkAlarms, 10000);
    return () => clearInterval(interval);
  }, []);

  const dismissAlert = () => {
    if (activeAlert) {
      const alertedEvents = JSON.parse(localStorage.getItem('alertedEvents') || '[]');
      localStorage.setItem('alertedEvents', JSON.stringify([...alertedEvents, activeAlert.id]));
      setActiveAlert(null);
    }
  };

  React.useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    if (storedEmployees.length === 0) {
      const initialEmployees = [
        { username: 'admin', password: 'password', role: 'Administrator', status: 'Active', permissions: ['My Tasks', 'CRM Leads', 'Messages', 'Project Tracker', 'WhatsApp Auto', 'Content Manager', 'Quotations'], capabilities: {canDelete: true, canAssign: true, officialComm: true} },
        { username: 'employee', password: 'employee123', role: 'Sales Associate', status: 'Active', permissions: ['My Tasks', 'CRM Leads'], capabilities: {canDelete: false, canAssign: false, officialComm: false} }
      ];
      localStorage.setItem('employees', JSON.stringify(initialEmployees));
      setEmployees(initialEmployees);
    } else {
      setEmployees(storedEmployees);
    }
  }, []);

  const handleAssignStatus = (username, newStatus) => {
    const updated = employees.map(emp => emp.username === username ? { ...emp, status: newStatus } : emp);
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
  };

  const handleAssignRole = (username, newRole) => {
    const updated = employees.map(emp => emp.username === username ? { ...emp, role: newRole } : emp);
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
  };

  const handleUpdateComp = (username, field, value) => {
    const updated = employees.map(emp => emp.username === username ? { ...emp, [field]: value } : emp);
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmpUsername || (!newEmpPassword && !editingUsername)) return;
    
    let updated;
    if (editingUsername) {
      updated = employees.map(emp => {
        if (emp.username === editingUsername) {
          return {
             ...emp,
             username: newEmpUsername,
             password: newEmpPassword || emp.password,
             role: newEmpRole,
             salary: newEmpSalary,
             incentive: newEmpIncentive,
             permissions: newEmpPermissions,
             capabilities: newEmpCapabilities
          }
        }
        return emp;
      });
    } else {
      if (employees.some(emp => emp.username === newEmpUsername)) {
        alert("Username already exists!");
        return;
      }
      const newEmp = { 
        username: newEmpUsername, 
        password: newEmpPassword, 
        role: newEmpRole, 
        status: 'Active',
        salary: newEmpSalary,
        incentive: newEmpIncentive,
        attendanceRecord: {},
        permissions: newEmpPermissions,
        capabilities: newEmpCapabilities
      };
      updated = [...employees, newEmp];
    }

    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
    setNewEmpUsername('');
    setNewEmpPassword('');
    setNewEmpSalary('');
    setNewEmpIncentive('');
    setNewEmpPermissions(['My Tasks', 'CRM Leads', 'Messages']);
    setNewEmpCapabilities({ canDelete: false, canAssign: false, officialComm: false });
    setIsAddEmpModalOpen(false);
    setEditingUsername(null);
  };

  const handleDeleteEmployee = (username) => {
    if (username === 'admin') {
      alert("Cannot delete the main administrator account!");
      return;
    }
    if (window.confirm(`Are you sure you want to permanently delete employee '${username}'?`)) {
      const updated = employees.filter(emp => emp.username !== username);
      setEmployees(updated);
      localStorage.setItem('employees', JSON.stringify(updated));
    }
  };

  const handleOpenAddEmployee = () => {
    setEditingUsername(null);
    setNewEmpUsername('');
    setNewEmpPassword('');
    setNewEmpRole('Sales Associate');
    setNewEmpSalary('');
    setNewEmpIncentive('');
    setNewEmpPermissions(['My Tasks', 'CRM Leads', 'Messages']);
    setNewEmpCapabilities({ canDelete: false, canAssign: false, officialComm: false });
    setIsAddEmpModalOpen(true);
  };

  const handleOpenEditEmployee = (emp) => {
    setEditingUsername(emp.username);
    setNewEmpUsername(emp.username);
    setNewEmpPassword(''); // don't show password natively
    setNewEmpRole(emp.role || 'Sales Associate');
    setNewEmpSalary(emp.salary || '');
    setNewEmpIncentive(emp.incentive || '');
    setNewEmpPermissions(emp.permissions || ['My Tasks', 'CRM Leads', 'Messages']);
    setNewEmpCapabilities(emp.capabilities || { canDelete: false, canAssign: false, officialComm: false });
    setIsAddEmpModalOpen(true);
  };


  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const statCards = [
    { label: "Calculator Leads", value: "342", trend: "+12% this week", image: "/images/proposal_digital.png" },
    { label: "Active Installations", value: "18", trend: "On Schedule", image: "/images/installation_bg.png" },
    { label: "Pending Proposals", value: "45", trend: "-3% this week", image: "/images/commercial.png" },
    { label: "System Revenue", value: "₹ 4.2 Cr", trend: "+2.5% this month", image: "/images/tech_flow.png" }
  ];

  const [recentLeads, setRecentLeads] = useState(() => {
    const saved = localStorage.getItem('solarLeads');
    if (saved) return JSON.parse(saved).slice(0, 3);
    return [
      { id: "L-492", name: "Ramesh Kumar", location: "Delhi", requirement: "Residential - 5kW", status: "New" },
      { id: "L-491", name: "Vikas Enterprises", location: "Pune", requirement: "Commercial - 50kW", status: "Contacted" },
      { id: "L-490", name: "Priya Sharma", location: "Gurugram", requirement: "Residential - 10kW", status: "Proposal Sent" }
    ];
  });

  const handleUpdateDashboardLeadStatus = (id, newStatus) => {
    const updated = recentLeads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    setRecentLeads(updated);
    const savedAll = localStorage.getItem('solarLeads');
    if (savedAll) {
      const fullLeads = JSON.parse(savedAll).map(l => l.id === id ? { ...l, status: newStatus } : l);
      localStorage.setItem('solarLeads', JSON.stringify(fullLeads));
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'New') return { bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' };
    if (status === 'Contacted') return { bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' };
    if (status === 'Proposal Sent') return { bg: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' };
    if (status === 'Closed Won') return { bg: 'rgba(16, 185, 129, 0.2)', color: '#34d399' };
    if (status === 'Closed Lost') return { bg: 'rgba(239, 68, 68, 0.2)', color: '#f87171' };
    return { bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' };
  };

  const renderContent = () => {
    if (isTabLoading) {
      return (
        <div style={{ marginTop: '1rem' }}>
          <TableSkeleton rows={6} cols={6} />
        </div>
      );
    }
    if (activeTab === 'Content Manager') {
      return <ContentManager />;
    }
    if (activeTab === 'CRM') {
      return <CrmLeadsManager />;
    }
    if (activeTab === 'Meetings') {
      return <AdminMeetings />;
    }
    if (activeTab === 'Reminders') {
      return <AdminReminders />;
    }
    if (activeTab === 'Reports') {
      return <AdminReports />;
    }
    if (activeTab === 'WhatsApp') {
      return <AdminWhatsApp />;
    }
    if (activeTab === 'Quotations') {
      return <AdminQuotations />;
    }
    if (activeTab === 'Project Tracker') {
      return <AdminProjectTracker />;
    }
    if (activeTab === 'Attendance') {
      return <AdminAttendance />;
    }
    if (activeTab === 'Employees') {
      return (
        <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '2rem', border: '1px solid var(--sky-200)', boxShadow: '0 4px 15px rgba(18,48,107,0.05)' }}>
           <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif', color: 'var(--navy-900)' }}>Employee Directory</h2>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
             <p style={{ color: 'var(--text-body)', margin: 0 }}>List of all registered employees and staff roles.</p>
             <button onClick={handleOpenAddEmployee} style={{ background: 'var(--teal-500)', color: 'white', fontWeight: 'bold', padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(20, 163, 168, 0.3)' }}>
               + Add New Employee
             </button>
           </div>

           <div className="table-responsive">
             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
             <thead>
               <tr style={{ background: 'var(--sky-100)' }}>
                 <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600' }}>Name</th>
                 <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', textAlign: 'center' }}>Role</th>
                 <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', textAlign: 'center' }}>Base Salary</th>
                 <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', textAlign: 'center' }}>Incentive (%)</th>
                 <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', textAlign: 'center' }}>Profit Gen.</th>
                 <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', textAlign: 'center' }}>Total Payout</th>
                 <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', textAlign: 'center' }}>Account Status</th>
                 <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', textAlign: 'center' }}>Actions</th>
               </tr>
             </thead>
             <tbody>
               {employees.map((emp, i) => (
                 <tr key={i} style={{ borderBottom: '1px solid var(--sky-200)' }}>
                   <td style={{ padding: '1.2rem 1.5rem', fontWeight: 'bold', color: 'var(--navy-900)' }}>{emp.username}</td>
                   <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center' }}>
                     <select
                       value={emp.role}
                       onChange={(e) => handleAssignRole(emp.username, e.target.value)}
                       style={{ 
                         padding: '0.4rem 1.2rem', borderRadius: '4px', fontSize: '0.9rem', border: '1px solid var(--sky-200)', cursor: 'pointer', outline: 'none',
                         backgroundColor: 'var(--white)',
                         backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2312306b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                         backgroundRepeat: 'no-repeat',
                         backgroundPosition: 'right 0.6rem center',
                         backgroundSize: '0.6rem auto',
                         appearance: 'none',
                         WebkitAppearance: 'none',
                         color: 'var(--navy-900)', textAlign: 'center', textAlignLast: 'center', margin: '0 auto', display: 'block'
                       }}
                     >
                       <option value="Applicant">Applicant</option>
                       <option value="Sales Associate">Sales Associate</option>
                       <option value="Manager">Manager</option>
                       <option value="Administrator">Administrator</option>
                     </select>
                   </td>
                   <td style={{ padding: '0.8rem 1.5rem', textAlign: 'center' }}>
                       <input 
                         type="number" 
                         placeholder="Base Salary (₹)" 
                         value={emp.salary || ''} 
                         onChange={(e) => handleUpdateComp(emp.username, 'salary', e.target.value)}
                         style={{ width: '130px', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--sky-200)', background: 'var(--white)', color: '#10b981', fontSize: '0.85rem', outline: 'none', textAlign: 'center', fontWeight: 'bold' }} 
                       />
                   </td>
                   <td style={{ padding: '0.8rem 1.5rem', textAlign: 'center' }}>
                       <input 
                         type="number" 
                         placeholder="Incentive (%)" 
                         value={emp.incentive || ''} 
                         onChange={(e) => handleUpdateComp(emp.username, 'incentive', e.target.value)}
                         style={{ width: '100px', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--sky-200)', background: 'var(--white)', color: 'var(--teal-600)', fontSize: '0.85rem', outline: 'none', textAlign: 'center', fontWeight: 'bold' }} 
                       />
                   </td>
                   <td style={{ padding: '0.8rem 1.5rem', textAlign: 'center' }}>
                       <input 
                         type="number" 
                         placeholder="Profit (₹)" 
                         value={emp.profitGenerated || ''} 
                         onChange={(e) => handleUpdateComp(emp.username, 'profitGenerated', e.target.value)}
                         style={{ width: '120px', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--sky-200)', background: 'var(--white)', color: 'var(--navy-900)', fontSize: '0.85rem', outline: 'none', textAlign: 'center', fontWeight: 'bold' }} 
                       />
                   </td>
                   <td style={{ padding: '1.2rem 1.5rem', fontWeight: 'bold', color: 'var(--navy-900)', fontSize: '1rem', textAlign: 'center' }}>
                       ₹{ (parseFloat(emp.salary) || 0) + ((parseFloat(emp.profitGenerated) || 0) * ((parseFloat(emp.incentive) || 0) / 100)) }
                   </td>
                   <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center' }}>
                     <select
                       value={emp.status}
                       onChange={(e) => handleAssignStatus(emp.username, e.target.value)}
                       style={{ 
                         padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', border: 'none', cursor: 'pointer', outline: 'none',
                         backgroundColor: emp.status === 'Active' ? 'rgba(16,185,129,0.1)' : emp.status === 'Pending HR' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                         backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2312306b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                         backgroundRepeat: 'no-repeat',
                         backgroundPosition: 'right 0.6rem center',
                         backgroundSize: '0.6rem auto',
                         appearance: 'none',
                         WebkitAppearance: 'none',
                         color: emp.status === 'Active' ? '#10b981' : emp.status === 'Pending HR' ? '#f59e0b' : '#ef4444',
                         fontWeight: 'bold', margin: '0 auto', display: 'block', textAlign: 'center', textAlignLast: 'center'
                       }}
                     >
                       <option value="Active">Active</option>
                       <option value="Pending HR">Pending HR</option>
                       <option value="Inactive">Inactive</option>
                     </select>
                   </td>
                   <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center' }}>
                     <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                       <button 
                         onClick={() => handleOpenEditEmployee(emp)} 
                         title="Edit Employee"
                         style={{ background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.2)', color: '#60a5fa', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                       </button>
                       <button 
                         onClick={() => handleDeleteEmployee(emp.username)} 
                         title="Delete Employee"
                         style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.2)', color: '#f87171', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                       </button>
                     </div>
                   </td>
                 </tr>
               ))}
               </tbody>
             </table>
           </div>
         </div>
       );
     }
    
    // Default Overview
    return (
      <>
        <div className="admin-header-row">
          <h1 className="admin-page-title">
            <span>Operations Dashboard</span>
          </h1>

          {/* Top Right Actions: System Status, Notification Bell, Logout Button */}
          <div className="admin-header-actions">
            {/* System Status Indicator */}
            <div className="admin-status-pill">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 6px #10b981', flexShrink: 0 }}></span>
              <span className="admin-status-text-full">System Status: <span style={{ color: '#10b981', fontWeight: 'bold' }}>Optimal</span></span>
              <span className="admin-status-text-short"><span style={{ color: '#10b981', fontWeight: 'bold' }}>Optimal</span></span>
            </div>

            {/* Notification Bell with Badge & Dropdown */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsNotifOpen(prev => !prev)}
                title="Notifications"
                aria-label="View notifications"
                className="admin-notif-btn"
                style={{
                  border: isNotifOpen ? '1px solid var(--teal-500)' : '1px solid var(--sky-200)',
                  color: isNotifOpen ? 'var(--teal-600)' : 'var(--navy-800)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--teal-400)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(20, 163, 168, 0.18)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  if (!isNotifOpen) {
                    e.currentTarget.style.borderColor = 'var(--sky-200)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(18,48,107,0.05)';
                  }
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.68rem',
                    fontWeight: 'bold',
                    minWidth: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--white)',
                    boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {isNotifOpen && (
                <div className="admin-notif-dropdown">
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.9rem 1.2rem',
                    borderBottom: '1px solid var(--sky-100)',
                    background: 'var(--sky-50)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--navy-900)' }}>Notifications</span>
                      {unreadCount > 0 && (
                        <span style={{ background: 'rgba(20, 163, 168, 0.15)', color: 'var(--teal-600)', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => setUnreadCount(0)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--teal-600)',
                          fontSize: '0.78rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (item.tab) handleTabSwitch(item.tab);
                          setIsNotifOpen(false);
                        }}
                        style={{
                          padding: '0.85rem 1.2rem',
                          borderBottom: '1px solid var(--sky-100)',
                          display: 'flex',
                          gap: '0.8rem',
                          alignItems: 'flex-start',
                          cursor: 'pointer',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--sky-50)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{
                          marginTop: '2px',
                          width: '30px',
                          height: '30px',
                          borderRadius: '8px',
                          background: item.type === 'lead' ? 'rgba(59, 130, 246, 0.12)' : item.type === 'meeting' ? 'rgba(20, 163, 168, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                          color: item.type === 'lead' ? '#3b82f6' : item.type === 'meeting' ? 'var(--teal-600)' : '#10b981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: '0.9rem'
                        }}>
                          {item.type === 'lead' ? '👤' : item.type === 'meeting' ? '📅' : '⚡'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.86rem', fontWeight: '600', color: 'var(--navy-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-body)', marginTop: '2px', lineHeight: '1.3' }}>
                            {item.desc}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            {item.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    padding: '0.65rem',
                    textAlign: 'center',
                    background: 'var(--sky-50)',
                    borderTop: '1px solid var(--sky-100)'
                  }}>
                    <button
                      onClick={() => {
                        handleTabSwitch('CRM');
                        setIsNotifOpen(false);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--teal-600)',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      View all leads &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              title="Log out of session"
              className="admin-logout-btn"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.16)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.45)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.06)';
              }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Top Metrics Grid */}
        <div className="admin-metrics-grid">
          {statCards.map((stat, idx) => (
             <div key={idx} >
                <div className="h-full" style={{ height: '100%' }}>
                  <div 
                    style={{ 
                      background: 'var(--white)',
                      border: '1px solid var(--sky-200)',
                      borderRadius: '16px',
                      padding: '1.5rem', 
                      height: '100%',
                      minHeight: '200px',
                      boxShadow: '0 10px 25px rgba(18,48,107,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: 0, 
                      width: '125px', 
                      height: '125px', 
                      backgroundImage: `url(${stat.image})`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center', 
                      opacity: 0.85, 
                      zIndex: 0, 
                      borderBottomLeftRadius: '90px',
                      borderLeft: '1px solid rgba(18, 48, 107, 0.08)',
                      borderBottom: '1px solid rgba(18, 48, 107, 0.08)',
                      boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.3)',
                      transition: 'opacity 0.3s ease'
                    }}></div>
                    
                    <div style={{ color: 'var(--navy-800)', fontSize: '1rem', marginBottom: '0.8rem', fontWeight: '600', zIndex: 1, maxWidth: 'calc(100% - 100px)' }}>{stat.label}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'Outfit', color: 'var(--navy-900)', zIndex: 1 }}>{stat.value}</div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: stat.trend.startsWith('+') ? '#10b981' : stat.trend.startsWith('-') ? '#ef4444' : '#f59e0b', 
                      marginTop: '0.5rem', 
                      fontWeight: '700',
                      zIndex: 1
                    }}>
                      {stat.trend}
                    </div>
                  </div>
                </div>
             </div>
          ))}
        </div>

        {/* Complex Data Table */}
        <div 
          style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--sky-200)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(18,48,107,0.05)' }}
        >
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--sky-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--navy-900)' }}>Recent CRM Inquiries</h3>
            <button onClick={() => handleTabSwitch('CRM')} style={{ background: 'transparent', border: 'none', color: 'var(--teal-600)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>View All Leads &rarr;</button>
          </div>
          
          <div className="table-responsive">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--sky-100)' }}>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', fontSize: '0.9rem' }}>ID</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', fontSize: '0.9rem' }}>Client Name</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--teal-600)', fontWeight: '600', fontSize: '0.9rem' }}>Notes/Comments</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', fontSize: '0.9rem' }}>Location</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', fontSize: '0.9rem' }}>Requirement</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', fontSize: '0.9rem' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--navy-800)', fontWeight: '600', fontSize: '0.9rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--sky-100)' }}>
                  <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.95rem', color: 'var(--navy-900)' }}>{lead.id}</td>
                  <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--navy-900)' }}>{lead.name}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    {lead.comments ? (
                      <div style={{ fontSize: '0.85rem', color: 'var(--teal-600)', fontStyle: 'italic', padding: '0.5rem', background: 'rgba(20,163,168,0.1)', borderRadius: '6px' }}>
                        💬 {lead.comments}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>No notes</span>
                    )}
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.95rem', color: 'var(--text-body)' }}>{lead.location}</td>
                  <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.95rem', color: 'var(--text-body)' }}>{lead.requirement}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateDashboardLeadStatus(lead.id, e.target.value)}
                      style={{ 
                        padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', outline: 'none',
                        background: getStatusStyle(lead.status).bg,
                        color: getStatusStyle(lead.status).color
                      }}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Closed Won">Closed Won</option>
                      <option value="Closed Lost">Closed Lost</option>
                    </select>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <button 
                      onClick={() => setActiveTab('CRM')}
                      style={{ background: 'transparent', border: '1px solid var(--sky-200)', color: 'var(--teal-600)', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
                    >
                      Full Edit &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
    );
  };

  const getTabStyle = (tabName) => ({
    padding: '0.8rem 1rem', 
    borderRadius: '12px', 
    cursor: 'pointer', 
    transition: 'all 0.3s',
    background: activeTab === tabName ? 'rgba(20, 163, 168, 0.15)' : 'transparent',
    color: activeTab === tabName ? 'var(--teal-400)' : 'var(--sky-200)',
    fontWeight: activeTab === tabName ? 'bold' : 'normal',
    marginBottom: '0.2rem',
    border: activeTab === tabName ? '1px solid rgba(20, 163, 168, 0.4)' : '1px solid transparent',
    boxShadow: activeTab === tabName ? '0 4px 12px rgba(20, 163, 168, 0.2)' : 'none',
    width: '100%',
    textAlign: 'left'
  });

  const tabs = ['Overview', 'Content Manager', 'CRM', 'Quotations', 'Meetings', 'Reminders', 'WhatsApp', 'Employees', 'Attendance', 'Project Tracker', 'Reports', 'Settings'];

  return (
    <div className="admin-dash-container" style={{ 
      background: 'var(--sky-50)',
      minHeight: '100vh'
    }}>
      {/* Mobile Sticky Top Header with Hamburger */}
      <header className="admin-mobile-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            type="button" 
            className="admin-hamburger-btn" 
            onClick={() => setIsMobileSidebarOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
          >
            <Menu size={22} />
          </button>
          <div className="admin-mobile-brand">
            <span>Nova</span><span style={{ color: 'var(--teal-400)' }}>Admin</span>
          </div>
        </div>
        <div className="admin-mobile-active-pill">
          {activeTab}
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="admin-sidebar-backdrop" 
          onClick={() => setIsMobileSidebarOpen(false)} 
        />
      )}

      {/* Sidebar (Desktop Sticky / Mobile Drawer) */}
      <aside className={`admin-sidebar hide-scrollbar ${isMobileSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h2 className="admin-sidebar-logo">
            <span>Nova</span><span style={{ color: 'var(--teal-400)' }}>Admin</span>
          </h2>
          <button 
            type="button" 
            className="admin-sidebar-close-btn"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="admin-nav hide-scrollbar">
          {tabs.map(tab => (
            <div key={tab}>
              <button 
                type="button"
                onClick={() => handleTabSwitch(tab)} 
                className={`admin-tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                <span>
                  {tab === 'Overview' ? 'Dashboard Overview' : tab === 'WhatsApp' ? 'WhatsApp Auto' : tab === 'Reports' ? 'Reports & Analytics' : tab}
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-terminate-btn">
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <React.Fragment>
          <div 
            key={activeTab}
            >
            <Suspense fallback={<TableSkeleton rows={6} cols={6} />}>
              {renderContent()}
            </Suspense>
          </div>
        </React.Fragment>
        
        {/* Alarm Popup */}
        <React.Fragment>
          {activeAlert && (
            <div 
              style={{ position: 'fixed', bottom: 'clamp(1rem, 3vw, 2rem)', right: 'clamp(1rem, 3vw, 2rem)', maxWidth: 'calc(100vw - 2rem)', background: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.45) 0%, transparent 40%), linear-gradient(135deg, rgba(6, 182, 212, 0.65), rgba(8, 145, 178, 0.9))', backdropFilter: 'blur(16px) saturate(150%)', border: '1px solid rgba(255, 255, 255, 0.3)', borderTop: '2px solid rgba(255, 255, 255, 0.8)', borderLeft: '2px solid rgba(255, 255, 255, 0.6)', padding: '1.2rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 -10px 20px rgba(0, 0, 0, 0.3), inset 0 10px 25px rgba(255, 255, 255, 0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', gap: '1rem', boxSizing: 'border-box' }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>{activeAlert.type === 'Meeting' ? '📅' : '⏰'}</span>
                  <h4 style={{ margin: 0, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)', fontSize: '1.1rem' }}>{activeAlert.title}</h4>
                </div>
                <p style={{ margin: 0, color: '#cffafe', fontSize: '0.9rem', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{activeAlert.desc}</p>
              </div>
              <button 
                onClick={dismissAlert} 
                style={{ background: 'transparent', border: 'none', color: '#cffafe', cursor: 'pointer', fontSize: '1.4rem', textShadow: '0 1px 2px rgba(0,0,0,0.2)', padding: '0 0.2rem' }}
              >
                &times;
              </button>
            </div>
          )}
        </React.Fragment>

        {/* Enhanced Add Employee Role Modal */}
        <React.Fragment>
          {isAddEmpModalOpen && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
              <div 
                style={{ background: `linear-gradient(to bottom, rgba(11, 15, 25, 0.60), rgba(11, 15, 25, 0.65))`, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', width: '100%', maxWidth: '550px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'Outfit, sans-serif', fontWeight: '600' }}>{editingUsername ? 'Edit User Credentials' : 'Create New User'}</h3>
                  <button onClick={() => setIsAddEmpModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                </div>
                
                {/* Scrollable Body */}
                <div className="modal-responsive hide-scrollbar" style={{ padding: '2rem', overflowY: 'auto' }}>
                  <form id="newUserForm" onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Basic Info */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 500 }}>Name / Employee ID</label>
                      <input type="text" placeholder="Full name" value={newEmpUsername} onChange={e => setNewEmpUsername(e.target.value)} required disabled={editingUsername !== null} style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: editingUsername ? 'rgba(0,0,0,0.3)' : '#111827', color: editingUsername ? '#64748b' : 'white', outline: 'none' }} />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 500 }}>{editingUsername ? 'Reset Password (optional)' : 'Password'}</label>
                      <input type="password" placeholder="••••••••" value={newEmpPassword} onChange={e => setNewEmpPassword(e.target.value)} {...(!editingUsername ? { required: true } : {})} style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: '#111827', color: 'white', outline: 'none' }} />
                    </div>

                    {/* Role Selection Dropdown */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 500 }}>Job Role</label>
                      <select value={newEmpRole} onChange={e => setNewEmpRole(e.target.value)} style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: '#111827', color: 'white', outline: 'none', cursor: 'pointer' }}>
                        <option value="Applicant">Applicant</option>
                        <option value="Sales Associate">Sales Associate</option>
                        <option value="Manager">Manager</option>
                        <option value="Administrator">Administrator</option>
                      </select>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem', lineHeight: '1.4' }}>The assigned role is shown under the employee's name on their dashboard.</p>
                    </div>

                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0.5rem 0' }}></div>

                    {/* Visible Sections Grid */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <label style={{ fontSize: '0.95rem', color: 'white', fontWeight: 600, margin: 0 }}>Visible sections</label>
                        <button type="button" onClick={() => setNewEmpPermissions([])} style={{ background: 'none', border: 'none', color: '#8b5cf6', fontSize: '0.8rem', cursor: 'pointer' }}>Clear all</button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                        {availablePermissions.map(perm => (
                          <label key={perm} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', background: '#111827', border: '1px solid', borderColor: newEmpPermissions.includes(perm) ? '#8b5cf6' : 'rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                            <input 
                              type="checkbox"
                              checked={newEmpPermissions.includes(perm)}
                              onChange={() => togglePermission(perm)}
                              style={{ accentColor: '#8b5cf6', width: '16px', height: '16px', cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '0.85rem', color: newEmpPermissions.includes(perm) ? 'white' : '#cbd5e1' }}>{perm}</span>
                          </label>
                        ))}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.8rem', lineHeight: '1.4' }}>Unchecked sections stay hidden from this account's sidebar until you enable them here later.</p>
                    </div>
                    
                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0.5rem 0' }}></div>

                    {/* Capabilities Switches */}
                    <div>
                      <label style={{ fontSize: '0.95rem', color: 'white', fontWeight: 600, marginBottom: '1rem', display: 'block' }}>Platform privileges</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        
                        {/* Custom Switch Style Wrapper */}
                        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.2rem', background: '#111827', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', margin: 0 }}>
                          <div>
                            <div style={{ fontWeight: 600, color: 'white', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Delete Records</div>
                            <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>Allow this user to delete CRM leads</div>
                          </div>
                          <div style={{ width: '40px', height: '24px', background: newEmpCapabilities.canDelete ? '#8b5cf6' : '#374151', borderRadius: '50px', position: 'relative', transition: 'all 0.3s' }}>
                            <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: newEmpCapabilities.canDelete ? '19px' : '3px', transition: 'all 0.3s' }} />
                          </div>
                          <input type="checkbox" checked={newEmpCapabilities.canDelete} onChange={() => setNewEmpCapabilities(p => ({...p, canDelete: !p.canDelete}))} style={{ display: 'none' }} />
                        </label>

                        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.2rem', background: '#111827', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', margin: 0 }}>
                          <div>
                            <div style={{ fontWeight: 600, color: 'white', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Assign Tasks</div>
                            <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>Delegate workflow to other agents</div>
                          </div>
                          <div style={{ width: '40px', height: '24px', background: newEmpCapabilities.canAssign ? '#8b5cf6' : '#374151', borderRadius: '50px', position: 'relative', transition: 'all 0.3s' }}>
                            <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: newEmpCapabilities.canAssign ? '19px' : '3px', transition: 'all 0.3s' }} />
                          </div>
                          <input type="checkbox" checked={newEmpCapabilities.canAssign} onChange={() => setNewEmpCapabilities(p => ({...p, canAssign: !p.canAssign}))} style={{ display: 'none' }} />
                        </label>
                        
                      </div>
                    </div>

                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0.5rem 0' }}></div>

                    {/* Financial Data */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Base Salary (₹)</label>
                        <input type="number" placeholder="Eg. 25000" value={newEmpSalary} onChange={e => setNewEmpSalary(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#111827', color: 'white', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Incentive Rate</label>
                        <input type="text" placeholder="Eg. 5000 / kW" value={newEmpIncentive} onChange={e => setNewEmpIncentive(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#111827', color: 'white', outline: 'none' }} />
                      </div>
                    </div>

                  </form>
                </div>

                {/* Footer Controls */}
                <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem', justifyContent: 'flex-end', background: '#0b0f19', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                  <button type="button" onClick={() => setIsAddEmpModalOpen(false)} style={{ padding: '0.8rem 1.5rem', background: '#1f2937', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, transition: 'background 0.2s' }}>Cancel</button>
                  <button type="submit" form="newUserForm" style={{ padding: '0.8rem 2.5rem', background: '#8b5cf6', border: 'none', color: 'white', fontWeight: 600, borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>{editingUsername ? 'Save Changes' : 'Create User'}</button>
                </div>

              </div>
            </div>
          )}
        </React.Fragment>
      </div>
    </div>
  );
}

export default AdminDashboard;
