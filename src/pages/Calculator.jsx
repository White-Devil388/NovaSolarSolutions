import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LocationSelector from '../components/solar/LocationSelector';
import UsageInputs from '../components/solar/UsageInputs';
import ResultCard from '../components/solar/ResultCard';
import { SOLAR_DATA } from '../data/solarData';
import { calculateSolarSystem } from '../utils/solarCalculations';

function Calculator() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  const [propertyType, setPropertyType] = useState('Residential');
  const [inputMode, setInputMode] = useState('bill');
  const [inputValue, setInputValue] = useState('');
  const [tariff, setTariff] = useState('');
  const [availableArea, setAvailableArea] = useState('');

  const [results, setResults] = useState(null);

  // Auto-fill tariff when state/city changes
  useEffect(() => {
    if (selectedState && SOLAR_DATA[selectedState]) {
      // By default use state default, but in real scenarios we might pull city specific discoms if available
      setTariff(String(SOLAR_DATA[selectedState].defaultTariff));
    }
  }, [selectedState]);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!selectedState || !selectedCity || !inputValue) return;

    // Resolve PSH (Peak Sun Hours)
    const stateData = SOLAR_DATA[selectedState];
    let psh = stateData.stateAvgPSH;
    if (stateData.cities && stateData.cities[selectedCity]) {
      psh = stateData.cities[selectedCity];
    }

    const computed = calculateSolarSystem({
      propertyType,
      inputMode,
      inputValue: parseFloat(inputValue),
      tariff: parseFloat(tariff),
      peakSunHours: psh,
      availableArea: availableArea ? parseFloat(availableArea) : null
    });

    setResults(computed);
  };

  return (
    <div className="page-padding">
      <div className="section-header">
        <div className="hero-badge" style={{ marginBottom: '1rem', color: '#10b981', borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>Smart Estimator</div>
        <h2 className="section-title">Solar Calculator</h2>
        <p className="section-subtitle">Real-time solar requirements and financial ROI based on Indian sunlight data.</p>
      </div>

      <div className="showcase" style={{ padding: '0', borderRadius: '24px', background: 'transparent', gap: '3rem', alignItems: 'flex-start' }}>
        
        {/* Left Col: Inputs */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ flex: '1 1 auto', width: '100%', background: '#0a0f1c', border: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', overflow: 'hidden' }}
        >
          <form onSubmit={handleCalculate}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'white', fontWeight: '600' }}>Solar Estimate</h3>
            
            <LocationSelector 
              selectedState={selectedState} 
              setSelectedState={setSelectedState} 
              selectedCity={selectedCity} 
              setSelectedCity={setSelectedCity} 
            />
            
            <UsageInputs 
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              inputMode={inputMode}
              setInputMode={setInputMode}
              inputValue={inputValue}
              setInputValue={setInputValue}
              tariff={tariff}
              setTariff={setTariff}
              availableArea={availableArea}
              setAvailableArea={setAvailableArea}
            />

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', fontSize: '1.05rem', fontWeight: '600', marginTop: '1rem', padding: '1rem', borderRadius: '8px', border: 'none', background: '#f59e0b', color: 'black' }}
            >
              Generate Estimate
            </motion.button>
          </form>
        </motion.div>

        {/* Right Col: Results */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{ flex: '1 1 auto', width: '100%' }}
        >
          <ResultCard results={results} propertyType={propertyType} />
        </motion.div>
        
      </div>
    </div>
  );
}

export default Calculator;
