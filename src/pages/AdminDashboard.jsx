import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ContentManager from '../components/admin/ContentManager';
import CrmLeadsManager from '../components/admin/CrmLeadsManager';
import AdminProjectTracker from '../components/admin/AdminProjectTracker';
import AdminMeetings from '../components/admin/AdminMeetings';
import AdminReminders from '../components/admin/AdminReminders';
import AdminReports from '../components/admin/AdminReports';
import AdminWhatsApp from '../components/admin/AdminWhatsApp';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [employees, setEmployees] = useState([]);
  const [activeAlert, setActiveAlert] = useState(null);

  const [newEmpUsername, setNewEmpUsername] = useState('');
  const [newEmpPassword, setNewEmpPassword] = useState('');
  const [newEmpSalary, setNewEmpSalary] = useState('');
  const [newEmpIncentive, setNewEmpIncentive] = useState('');
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  
  // RBAC Permission States
  const [newEmpPermissions, setNewEmpPermissions] = useState(['My Tasks', 'CRM Leads', 'Messages']); 
  const availablePermissions = ['My Tasks', 'CRM Leads', 'Messages', 'Project Tracker', 'WhatsApp Auto', 'Content Manager'];

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
        { username: 'admin', password: 'password', role: 'Administrator', status: 'Active', permissions: ['My Tasks', 'CRM Leads', 'Messages', 'Project Tracker', 'WhatsApp Auto', 'Content Manager'], capabilities: {canDelete: true, canAssign: true, officialComm: true} },
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
    if (!newEmpUsername || !newEmpPassword) return;
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
      permissions: newEmpPermissions,
      capabilities: newEmpCapabilities
    };
    const updated = [...employees, newEmp];
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
    setNewEmpUsername('');
    setNewEmpPassword('');
    setNewEmpSalary('');
    setNewEmpIncentive('');
    setNewEmpPermissions(['My Tasks', 'CRM Leads', 'Messages']);
    setNewEmpCapabilities({ canDelete: false, canAssign: false, officialComm: false });
    setIsAddEmpModalOpen(false);
    alert("Employee added successfully!");
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
    if (activeTab === 'Project Tracker') {
      return <AdminProjectTracker />;
    }
    if (activeTab === 'Employees') {
      return (
        <div style={{ background: '#0f172a', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
           <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>Employee Directory</h2>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <p style={{ color: '#94a3b8', margin: 0 }}>List of all registered employees and staff roles.</p>
             <button onClick={() => setIsAddEmpModalOpen(true)} style={{ background: '#f59e0b', color: 'black', fontWeight: 'bold', padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(245,158,11,0.3)' }}>
               + Add New Employee
             </button>
           </div>

           <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
             <thead>
               <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                 <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Name</th>
                 <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Role</th>
                 <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Base Salary</th>
                 <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Incentive (%)</th>
                 <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Profit Gen.</th>
                 <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Total Payout</th>
                 <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500' }}>Status</th>
               </tr>
             </thead>
             <tbody>
               {employees.map((emp, i) => (
                 <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                   <td style={{ padding: '1.2rem 1.5rem', fontWeight: 'bold' }}>{emp.username}</td>
                   <td style={{ padding: '1.2rem 1.5rem' }}>
                     <select
                       value={emp.role}
                       onChange={(e) => handleAssignRole(emp.username, e.target.value)}
                       style={{ 
                         padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', outline: 'none',
                         background: '#0f172a',
                         color: 'white'
                       }}
                     >
                       <option value="Applicant" style={{ background: '#1e293b', color: 'white' }}>Applicant</option>
                       <option value="Sales Associate" style={{ background: '#1e293b', color: 'white' }}>Sales Associate</option>
                       <option value="Manager" style={{ background: '#1e293b', color: 'white' }}>Manager</option>
                       <option value="Administrator" style={{ background: '#1e293b', color: 'white' }}>Administrator</option>
                     </select>
                   </td>
                   <td style={{ padding: '0.8rem 1.5rem' }}>
                       <input 
                         type="number" 
                         placeholder="Base Salary (₹)" 
                         value={emp.salary || ''} 
                         onChange={(e) => handleUpdateComp(emp.username, 'salary', e.target.value)}
                         style={{ width: '130px', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: '#4ade80', fontSize: '0.85rem', outline: 'none', textAlign: 'center' }} 
                       />
                   </td>
                   <td style={{ padding: '0.8rem 1.5rem' }}>
                       <input 
                         type="number" 
                         placeholder="Incentive (%)" 
                         value={emp.incentive || ''} 
                         onChange={(e) => handleUpdateComp(emp.username, 'incentive', e.target.value)}
                         style={{ width: '100px', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: '#f59e0b', fontSize: '0.85rem', outline: 'none', textAlign: 'center' }} 
                       />
                   </td>
                   <td style={{ padding: '0.8rem 1.5rem' }}>
                       <input 
                         type="number" 
                         placeholder="Profit (₹)" 
                         value={emp.profitGenerated || ''} 
                         onChange={(e) => handleUpdateComp(emp.username, 'profitGenerated', e.target.value)}
                         style={{ width: '120px', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: '#38bdf8', fontSize: '0.85rem', outline: 'none', textAlign: 'center' }} 
                       />
                   </td>
                   <td style={{ padding: '1.2rem 1.5rem', fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>
                       ₹{ (parseFloat(emp.salary) || 0) + ((parseFloat(emp.profitGenerated) || 0) * ((parseFloat(emp.incentive) || 0) / 100)) }
                   </td>
                   <td style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <select
                       value={emp.status}
                       onChange={(e) => handleAssignStatus(emp.username, e.target.value)}
                       style={{ 
                         padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', border: 'none', cursor: 'pointer', outline: 'none',
                         background: emp.status === 'Active' ? 'rgba(16,185,129,0.1)' : emp.status === 'Pending HR' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                         color: emp.status === 'Active' ? '#34d399' : emp.status === 'Pending HR' ? '#fbbf24' : '#f87171',
                         fontWeight: 'bold'
                       }}
                     >
                       <option value="Active" style={{ background: '#1e293b', color: 'white' }}>Active</option>
                       <option value="Pending HR" style={{ background: '#1e293b', color: 'white' }}>Pending HR</option>
                       <option value="Inactive" style={{ background: '#1e293b', color: 'white' }}>Inactive</option>
                     </select>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      );
    }
    
    // Default Overview
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif' }}>Operations Dashboard</h1>
          <div style={{ background: '#0f172a', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem' }}>
            System Status: <span style={{ color: '#10b981', fontWeight: 'bold' }}>Optimal</span>
          </div>
        </div>

        {/* Top Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {statCards.map((stat, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               style={{ 
                 backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.55)), url(${stat.image})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 padding: '1.5rem', 
                 borderRadius: '12px', 
                 border: '1px solid rgba(255,255,255,0.05)',
                 boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
               }}
             >
               <div style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '0.8rem', fontWeight: '600', textShadow: '0 2px 12px rgba(0,0,0,1), 0 0 5px rgba(0,0,0,0.8)' }}>{stat.label}</div>
               <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'Outfit', color: '#ffffff', textShadow: '0 4px 15px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.8)' }}>{stat.value}</div>
               <div style={{ 
                 fontSize: '0.9rem', 
                 color: stat.trend.startsWith('+') ? '#4ade80' : stat.trend.startsWith('-') ? '#f87171' : '#fbbf24', 
                 marginTop: '0.5rem', 
                 fontWeight: '700',
                 textShadow: '0 2px 8px rgba(0,0,0,1)' 
               }}>
                 {stat.trend}
               </div>
             </motion.div>
          ))}
        </div>

        {/* Complex Data Table */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}
        >
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Recent CRM Inquiries</h3>
            <button onClick={() => setActiveTab('CRM')} style={{ background: 'transparent', border: 'none', color: '#f59e0b', cursor: 'pointer', fontSize: '0.9rem' }}>View All Leads &rarr;</button>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>ID</th>
                <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Client Name</th>
                <th style={{ padding: '1rem 1.5rem', color: '#f59e0b', fontWeight: '500', fontSize: '0.9rem' }}>Notes/Comments</th>
                <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Location</th>
                <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Requirement</th>
                <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.95rem' }}>{lead.id}</td>
                  <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.95rem', fontWeight: 'bold' }}>{lead.name}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    {lead.comments ? (
                      <div style={{ fontSize: '0.85rem', color: '#f59e0b', fontStyle: 'italic', padding: '0.5rem', background: 'rgba(245,158,11,0.1)', borderRadius: '6px' }}>
                        💬 {lead.comments}
                      </div>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '0.85rem', fontStyle: 'italic' }}>No notes</span>
                    )}
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.95rem', color: '#cbd5e1' }}>{lead.location}</td>
                  <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.95rem' }}>{lead.requirement}</td>
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
                      <option value="New" style={{ background: '#1e293b', color: 'white' }}>New</option>
                      <option value="Contacted" style={{ background: '#1e293b', color: 'white' }}>Contacted</option>
                      <option value="Proposal Sent" style={{ background: '#1e293b', color: 'white' }}>Proposal Sent</option>
                      <option value="Closed Won" style={{ background: '#1e293b', color: 'white' }}>Closed Won</option>
                      <option value="Closed Lost" style={{ background: '#1e293b', color: 'white' }}>Closed Lost</option>
                    </select>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <button 
                      onClick={() => setActiveTab('CRM')}
                      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Full Edit &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </>
    );
  };

  const getTabStyle = (tabName) => ({
    padding: '0.8rem 1rem', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    transition: 'all 0.3s',
    background: activeTab === tabName ? 'rgba(245,158,11,0.1)' : 'transparent',
    color: activeTab === tabName ? '#f59e0b' : '#94a3b8',
    fontWeight: activeTab === tabName ? 'bold' : 'normal',
    marginBottom: '0.5rem'
  });

  return (
    <div className="admin-dash-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2 style={{ fontSize: '1.6rem', fontFamily: 'Outfit, sans-serif', marginBottom: '3rem' }}>
          Nova<span style={{ color: '#f59e0b' }}>Admin</span>
        </h2>
        
        <div className="admin-nav">
          <div onClick={() => setActiveTab('Overview')} style={getTabStyle('Overview')}>Dashboard Overview</div>
          <div onClick={() => setActiveTab('Content Manager')} style={getTabStyle('Content Manager')}>Content Manager</div>
          <div onClick={() => setActiveTab('CRM')} style={getTabStyle('CRM')}>CRM</div>
          <div onClick={() => setActiveTab('Meetings')} style={getTabStyle('Meetings')}>Meetings</div>
          <div onClick={() => setActiveTab('Reminders')} style={getTabStyle('Reminders')}>Reminders</div>
          <div onClick={() => setActiveTab('Reports')} style={getTabStyle('Reports')}>Reports & Analytics</div>
          <div onClick={() => setActiveTab('WhatsApp')} style={getTabStyle('WhatsApp')}>WhatsApp Auto</div>
          <div onClick={() => setActiveTab('Employees')} style={getTabStyle('Employees')}>Employees</div>
          <div onClick={() => setActiveTab('Project Tracker')} style={getTabStyle('Project Tracker')}>Project Tracker</div>
          <div onClick={() => setActiveTab('Settings')} style={getTabStyle('Settings')}>Settings</div>
        </div>

        <button onClick={handleLogout} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '0.8rem', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => {e.target.style.background='rgba(239,68,68,0.1)';}} onMouseLeave={e => {e.target.style.background='transparent';}}>
          Terminate Session
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
        
        {/* Alarm Popup */}
        <AnimatePresence>
          {activeAlert && (
            <motion.div 
              initial={{ opacity: 0, y: 80, scale: 0.3, rotate: 5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 30, scale: 0.6, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 1 }}
              style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.45) 0%, transparent 40%), linear-gradient(135deg, rgba(6, 182, 212, 0.65), rgba(8, 145, 178, 0.9))', backdropFilter: 'blur(16px) saturate(150%)', border: '1px solid rgba(255, 255, 255, 0.3)', borderTop: '2px solid rgba(255, 255, 255, 0.8)', borderLeft: '2px solid rgba(255, 255, 255, 0.6)', padding: '1.5rem', borderRadius: '40px 40px 0px 40px', boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 -10px 20px rgba(0, 0, 0, 0.3), inset 0 10px 25px rgba(255, 255, 255, 0.5)', zIndex: 1000, minWidth: '350px', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>{activeAlert.type === 'Meeting' ? '📅' : '⏰'}</span>
                  <h4 style={{ margin: 0, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{activeAlert.title}</h4>
                </div>
                <p style={{ margin: 0, color: '#cffafe', fontSize: '0.95rem', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{activeAlert.desc}</p>
              </div>
              <button 
                onClick={dismissAlert} 
                style={{ background: 'transparent', border: 'none', color: '#cffafe', cursor: 'pointer', fontSize: '1.2rem', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >
                &times;
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Add Employee Role Modal */}
        <AnimatePresence>
          {isAddEmpModalOpen && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                style={{ background: `linear-gradient(to bottom, rgba(11, 15, 25, 0.60), rgba(11, 15, 25, 0.65)), url('/images/tech_flow.png') no-repeat center center / cover`, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', width: '100%', maxWidth: '550px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'Outfit, sans-serif', fontWeight: '600' }}>Create New User</h3>
                  <button onClick={() => setIsAddEmpModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                </div>
                
                {/* Scrollable Body */}
                <div className="hide-scrollbar" style={{ padding: '2rem', overflowY: 'auto' }}>
                  <form id="newUserForm" onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Basic Info */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 500 }}>Name / Employee ID</label>
                      <input type="text" placeholder="Full name" value={newEmpUsername} onChange={e => setNewEmpUsername(e.target.value)} required style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: '#111827', color: 'white', outline: 'none' }} />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
                      <input type="password" placeholder="••••••••" value={newEmpPassword} onChange={e => setNewEmpPassword(e.target.value)} required style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: '#111827', color: 'white', outline: 'none' }} />
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
                  <button type="submit" form="newUserForm" style={{ padding: '0.8rem 2.5rem', background: '#8b5cf6', border: 'none', color: 'white', fontWeight: 600, borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>Create User</button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AdminDashboard;
