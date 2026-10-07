import React from 'react';

const UsageInputs = ({ 
  propertyType, setPropertyType, 
  inputMode, setInputMode, 
  inputValue, setInputValue, 
  tariff, setTariff, 
  availableArea, setAvailableArea 
}) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
      
      {/* Property Type */}
      <div>
        <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>Property Type</label>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          {['Residential', 'Commercial', 'Industrial'].map(type => (
            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: propertyType === type ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.02)', padding: '0.5rem 1rem', borderRadius: '6px', border: propertyType === type ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s' }}>
              <input 
                type="radio" 
                name="propertyType" 
                value={type} 
                checked={propertyType === type} 
                onChange={() => setPropertyType(type)}
                style={{ appearance: 'none' }}
              />
              <span style={{ color: propertyType === type ? '#f59e0b' : 'var(--text-light)', fontSize: '0.9rem' }}>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bill vs Units Toggle & Input */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <label style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Electricity Usage *</label>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
            <button 
              type="button" 
              onClick={() => setInputMode('bill')}
              style={{ padding: '0.3rem 0.8rem', background: inputMode === 'bill' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: inputMode === 'bill' ? 'white' : 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}
            >
              Avg Monthly Bill (₹)
            </button>
            <button 
              type="button" 
              onClick={() => setInputMode('units')}
              style={{ padding: '0.3rem 0.8rem', background: inputMode === 'units' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: inputMode === 'units' ? 'white' : 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}
            >
              Avg Monthly Units (kWh)
            </button>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {inputMode === 'bill' ? '₹' : '⚡'}
          </span>
          <input 
            type="number" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={inputMode === 'bill' ? "e.g. 3,500" : "e.g. 500"}
            style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: '1rem', outline: 'none' }}
            required
            min="1"
          />
        </div>
      </div>

      {/* Advanced Inputs Row */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>Current Tariff (₹/unit)</label>
          <input 
            type="number" 
            value={tariff}
            onChange={(e) => setTariff(e.target.value)}
            step="0.1"
            min="1"
            style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: '1rem', outline: 'none' }}
            required
          />
          <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>Estimated based on State avg</small>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>Available Roof Area (sq ft)</label>
          <input 
            type="number" 
            value={availableArea}
            onChange={(e) => setAvailableArea(e.target.value)}
            placeholder="e.g. 500 (Optional)"
            min="0"
            style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: '1rem', outline: 'none' }}
          />
          <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>Leave empty if unsure</small>
        </div>
      </div>

    </div>
  );
};

export default UsageInputs;
