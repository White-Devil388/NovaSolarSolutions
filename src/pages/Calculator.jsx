import React, { useState } from 'react';

function Calculator() {
  const [bill, setBill] = useState('');
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    if (bill && !isNaN(bill)) {
      const estimatedSystem = (bill / 200).toFixed(1);
      const savings = (bill * 12 * 25).toLocaleString();
      setResult({ system: estimatedSystem, savings });
    }
  };

  return (
    <div className="page-padding">
      <div className="section-header">
        <h2 className="section-title">Solar Calculator</h2>
        <p className="section-subtitle">Estimate your solar requirements and potential savings.</p>
      </div>

      <div className="showcase" style={{ padding: '2rem', borderRadius: '16px', background: 'var(--bg-dark)' }}>
        <form onSubmit={calculate} style={{ flex: 1, width: '100%' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Enter Your Details</h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Average Monthly Electricity Bill ($)</label>
            <input 
              type="number" 
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="e.g. 150"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Calculate Estimate</button>
        </form>

        {result && (
          <div className="calculator-result" style={{ flex: 1, paddingLeft: '2rem', borderLeft: '1px solid var(--glass-border)', width: '100%', boxSizing: 'border-box' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: 'var(--primary)' }}>Your Estimate</h3>
            <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'white' }}>Recommended System Size:</strong> {result.system} kW</p>
            <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'white' }}>Estimated 25-Year Savings:</strong> ${result.savings}</p>
            <div className="hero-badge" style={{ marginTop: '1rem' }}>Get A Detailed Quote</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;
