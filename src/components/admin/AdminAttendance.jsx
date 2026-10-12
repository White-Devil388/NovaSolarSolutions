import React, { useState, useEffect, useMemo, useCallback } from 'react';

export default function AdminAttendance() {
  const [employees, setEmployees] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('employees') || '[]');
    // Ensure all employees have an attendanceRecord dictionary
    const fixedList = list.map(e => ({ ...e, attendanceRecord: e.attendanceRecord || {} }));
    setEmployees(fixedList);
  }, []);

  const [year, month] = useMemo(() => currentMonth.split('-').map(Number), [currentMonth]);
  
  const { daysInMonth, daysArray } = useMemo(() => {
    const days = new Date(year, month, 0).getDate();
    return {
      daysInMonth: days,
      daysArray: Array.from({ length: days }, (_, i) => i + 1)
    };
  }, [year, month]);

  const getDayOfWeek = useCallback((day) => {
    return new Date(year, month - 1, day).getDay();
  }, [year, month]);

  const getStatus = useCallback((username, day) => {
    const dateStr = `${currentMonth}-${String(day).padStart(2, '0')}`;
    const emp = employees.find(e => e.username === username);
    return emp?.attendanceRecord?.[dateStr] || '';
  }, [currentMonth, employees]);

  const toggleStatus = useCallback((username, day) => {
    const dateStr = `${currentMonth}-${String(day).padStart(2, '0')}`;
    const currentStatus = getStatus(username, day);
    
    // Cycle: '' -> 'P' -> 'A' -> 'H' -> 'L' -> 'O' -> ''
    let newStatus = '';
    if (currentStatus === '') newStatus = 'P';
    else if (currentStatus === 'P') newStatus = 'A';
    else if (currentStatus === 'A') newStatus = 'H';
    else if (currentStatus === 'H') newStatus = 'L';
    else if (currentStatus === 'L') newStatus = 'O';
    else if (currentStatus === 'O') newStatus = '';

    setEmployees(prevEmployees => {
      const updatedEmployees = prevEmployees.map(emp => {
        if (emp.username === username) {
          return {
            ...emp,
            attendanceRecord: {
              ...emp.attendanceRecord,
              [dateStr]: newStatus
            }
          };
        }
        return emp;
      });
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      return updatedEmployees;
    });
  }, [currentMonth, getStatus]);

  const getCellColor = (status) => {
    switch(status) {
      case 'P': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' };
      case 'A': return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' };
      case 'H': return { bg: 'rgba(56, 189, 248, 0.15)', color: 'var(--blue-500)' };
      case 'L': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' };
      case 'O': return { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' };
      default: return { bg: 'transparent', color: 'transparent' };
    }
  };

  const getTotals = (username) => {
    const emp = employees.find(e => e.username === username);
    const recs = emp?.attendanceRecord || {};
    let p=0, a=0, h=0, l=0, o=0;
    
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentMonth}-${String(d).padStart(2, '0')}`;
      const stat = recs[dateStr];
      if(stat==='P') p++;
      else if(stat==='A') a++;
      else if(stat==='H') h++;
      else if(stat==='L') l++;
      else if(stat==='O') o++;
    }
    return {p, a, h, l, o};
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', color: 'var(--navy-900)', margin: 0 }}>Monthly Attendance</h2>
          <p style={{ color: 'var(--text-body)', margin: '0.5rem 0 0 0' }}>Track employee presence, leaves, and absents.</p>
        </div>
        <div>
          <input 
            type="month" 
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--sky-200)', background: 'var(--white)', color: 'var(--navy-900)', outline: 'none', fontFamily: 'inherit', fontWeight: 'bold' }}
          />
        </div>
      </div>

      <div className="table-responsive" style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--sky-200)', overflowX: 'auto', paddingBottom: '1rem', boxShadow: '0 4px 15px rgba(18,48,107,0.05)' }}>
        <table style={{ width: '100%', minWidth: '1200px', borderCollapse: 'collapse', textAlign: 'center', color: 'var(--navy-900)' }}>
          <thead>
            <tr style={{ background: 'var(--sky-100)' }}>
              <th style={{ padding: '1rem', color: 'var(--navy-800)', fontWeight: '600', position: 'sticky', left: 0, background: 'var(--sky-100)', zIndex: 10, textAlign: 'left', minWidth: '150px' }}>Employee</th>
              {daysArray.map(day => {
                const isSunday = getDayOfWeek(day) === 0;
                return (
                  <th key={day} style={{ padding: '0.5rem', color: isSunday ? '#ef4444' : 'var(--navy-800)', fontSize: '0.8rem', minWidth: '35px', background: isSunday ? 'rgba(239,68,68,0.05)' : 'transparent' }}>
                    {day}
                  </th>
                );
              })}
              <th style={{ padding: '1rem', color: '#10b981', fontSize: '0.85rem' }}>P</th>
              <th style={{ padding: '1rem', color: '#ef4444', fontSize: '0.85rem' }}>A</th>
              <th style={{ padding: '1rem', color: 'var(--blue-500)', fontSize: '0.85rem' }}>H</th>
              <th style={{ padding: '1rem', color: '#f59e0b', fontSize: '0.85rem' }}>L</th>
              <th style={{ padding: '1rem', color: '#8b5cf6', fontSize: '0.85rem' }}>O</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => {
              const totals = getTotals(emp.username);
              return (
                <tr key={i} style={{ borderBottom: '1px solid var(--sky-200)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold', position: 'sticky', left: 0, background: 'var(--white)', zIndex: 10, textAlign: 'left', borderRight: '1px solid var(--sky-200)' }}>
                    {emp.username}
                  </td>
                  
                  {daysArray.map(day => {
                    const isSunday = getDayOfWeek(day) === 0;
                    const status = getStatus(emp.username, day);
                    const colors = getCellColor(status);
                    
                    return (
                      <td 
                        key={day} 
                        onClick={() => toggleStatus(emp.username, day)}
                        style={{ 
                          padding: '0.2rem', 
                          cursor: 'pointer', 
                          background: isSunday ? 'rgba(239,68,68,0.02)' : 'transparent',
                          userSelect: 'none'
                        }}
                      >
                        <div style={{
                          width: '24px', height: '24px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: colors.bg, color: colors.color, borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                          border: status !== '' ? 'none' : '1px solid #cbd5e1',
                          backgroundColor: status !== '' ? colors.bg : '#f8fafc'
                        }}>
                          {status}
                        </div>
                      </td>
                    );
                  })}

                  <td style={{ padding: '1rem', color: '#10b981', fontWeight: 'bold' }}>{totals.p}</td>
                  <td style={{ padding: '1rem', color: '#ef4444', fontWeight: 'bold' }}>{totals.a}</td>
                  <td style={{ padding: '1rem', color: 'var(--blue-500)', fontWeight: 'bold' }}>{totals.h}</td>
                  <td style={{ padding: '1rem', color: '#f59e0b', fontWeight: 'bold' }}>{totals.l}</td>
                  <td style={{ padding: '1rem', color: '#8b5cf6', fontWeight: 'bold' }}>{totals.o}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {employees.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-body)' }}>No employees found.</div>
        )}
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--navy-800)', fontWeight: '600' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '12px', height: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '2px' }}></span> Present</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '12px', height: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '2px' }}></span> Absent</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '12px', height: '12px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid var(--blue-500)', borderRadius: '2px' }}></span> Half-Day</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '12px', height: '12px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #f59e0b', borderRadius: '2px' }}></span> Leave</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '12px', height: '12px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid #8b5cf6', borderRadius: '2px' }}></span> Holiday/Off</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>* Sundays highlighted automatically</div>
      </div>
    </div>
  );
}
