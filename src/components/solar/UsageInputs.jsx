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
        <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--navy-900)', fontWeight: '600', fontSize: '0.85rem' }}>Property Type</label>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          {['Residential', 'Commercial', 'Industrial'].map(type => (
            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: propertyType === type ? 'var(--blue-50)' : 'var(--white)', padding: '0.5rem 1rem', borderRadius: '6px', border: propertyType === type ? '1px solid var(--blue-500)' : '1px solid #cbd5e1', transition: 'all 0.2s' }}>
              <input 
                type="radio" 
                name="propertyType" 
                value={type} 
                checked={propertyType === type} 
                onChange={() => setPropertyType(type)}
                style={{ appearance: 'none' }}
              />
              <span style={{ color: propertyType === type ? 'var(--blue-600)' : 'var(--text-muted)', fontSize: '0.9rem', fontWeight: propertyType === type ? '600' : '400' }}>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bill vs Units Toggle & Input */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <label style={{ color: 'var(--navy-900)', fontWeight: '600', fontSize: '0.85rem' }}>Electricity Usage *</label>
          <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0', padding: '2px' }}>
            <button 
              type="button" 
              onClick={() => setInputMode('bill')}
              style={{ padding: '0.4rem 0.8rem', background: inputMode === 'bill' ? 'var(--white)' : 'transparent', border: 'none', borderRadius: '4px', color: inputMode === 'bill' ? 'var(--navy-900)' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: inputMode === 'bill' ? '600' : '400', boxShadow: inputMode === 'bill' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', outline: 'none' }}
            >
              Avg Monthly Bill (₹)
            </button>
            <button 
              type="button" 
              onClick={() => setInputMode('units')}
              style={{ padding: '0.4rem 0.8rem', background: inputMode === 'units' ? 'var(--white)' : 'transparent', border: 'none', borderRadius: '4px', color: inputMode === 'units' ? 'var(--navy-900)' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: inputMode === 'units' ? '600' : '400', boxShadow: inputMode === 'units' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', outline: 'none' }}
            >
              Avg Monthly Units (kWh)
            </button>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--navy-900)', fontSize: '0.9rem', fontWeight: 'bold' }}>
            {inputMode === 'bill' ? '₹' : '⚡'}
          </span>
          <input 
            type="number" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={inputMode === 'bill' ? "e.g. 3,500" : "e.g. 500"}
            style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'var(--white)', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none' }}
            required
            min="1"
          />
        </div>
      </div>

      {/* Advanced Inputs Row */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--navy-900)', fontWeight: '600', fontSize: '0.85rem' }}>Current Tariff (₹/unit)</label>
          <input 
            type="number" 
            value={tariff}
            onChange={(e) => setTariff(e.target.value)}
            step="0.1"
            min="1"
            style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'var(--white)', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none' }}
            required
          />
          <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>Estimated based on State avg</small>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--navy-900)', fontWeight: '600', fontSize: '0.85rem' }}>Available Roof Area (sq ft)</label>
          <input 
            type="number" 
            value={availableArea}
            onChange={(e) => setAvailableArea(e.target.value)}
            placeholder="e.g. 500 (Optional)"
            min="0"
            style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'var(--white)', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none' }}
          />
          <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>Leave empty if unsure</small>
        </div>
      </div>

    </div>
  );
};

export default UsageInputs;
