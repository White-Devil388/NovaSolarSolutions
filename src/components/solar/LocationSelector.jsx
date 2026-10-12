import React from 'react';
import { STATES_CITIES } from '../../data/statesCities';

const LocationSelector = ({ selectedState, setSelectedState, selectedCity, setSelectedCity }) => {
  const states = Object.keys(STATES_CITIES);
  const cities = selectedState && STATES_CITIES[selectedState] ? STATES_CITIES[selectedState] : [];

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      <div style={{ flex: '1 1 200px' }}>
        <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--navy-900)', fontWeight: '600', fontSize: '0.85rem' }}>Location (State) *</label>
        <select 
          value={selectedState} 
          onChange={handleStateChange}
          style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'var(--white)', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none' }}
          required
        >
          <option value="" disabled style={{ color: 'var(--text-muted)' }}>Select State</option>
          {states.map(state => (
            <option key={state} value={state} style={{ color: 'var(--navy-900)' }}>{state}</option>
          ))}
        </select>
      </div>

      <div style={{ flex: '1 1 200px' }}>
        <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--navy-900)', fontWeight: '600', fontSize: '0.85rem' }}>Nearest City *</label>
        <select 
          value={selectedCity} 
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: selectedState ? 'var(--white)' : '#f1f5f9', color: selectedState ? 'var(--navy-900)' : 'var(--text-muted)', fontSize: '1rem', outline: 'none', cursor: selectedState ? 'pointer' : 'not-allowed' }}
          required
        >
          <option value="" disabled style={{ color: 'var(--text-muted)' }}>Select City</option>
          {cities.map(city => (
            <option key={city} value={city} style={{ color: 'var(--navy-900)' }}>{city}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;
