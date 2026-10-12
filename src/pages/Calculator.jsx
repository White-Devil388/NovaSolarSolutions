import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import LocationSelector from '../components/solar/LocationSelector';
import UsageInputs from '../components/solar/UsageInputs';
import ResultCard from '../components/solar/ResultCard';
import PageBanner from '../components/ui/PageBanner';
import useSolarCalculator from '../hooks/useSolarCalculator';

function Calculator() {
  const {
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    propertyType,
    setPropertyType,
    inputMode,
    setInputMode,
    inputValue,
    setInputValue,
    tariff,
    setTariff,
    availableArea,
    setAvailableArea,
    results,
    computeSolar
  } = useSolarCalculator();

  const resultsRef = useRef(null);

  const handleCalculate = useCallback((e) => {
    e.preventDefault();
    const computed = computeSolar();
    if (computed && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [computeSolar]);

  return (
    <>
      <PageBanner 
        title="Solar Calculator" 
        subtitle="Real-time solar requirements and financial ROI based on Indian sunlight data."
        breadcrumb="Calculator"
      />

      <div style={{ padding: 'clamp(2.5rem, 5vw, 6rem) clamp(1rem, 4vw, 5%)', background: 'linear-gradient(180deg, rgba(11,31,75,0.75), rgba(18,48,107,0.55)), url("/images/green_solar_field_1791612498444.png")', backgroundSize: 'cover', backgroundAttachment: 'scroll', minHeight: '80vh', width: '100%', boxSizing: 'border-box' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'flex-start', width: '100%' }}>
          
          {/* Left Col: Inputs */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ flex: '1 1 300px', width: '100%', minWidth: 0, background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.6)', padding: 'clamp(1.2rem, 3vw, 2.5rem)', borderRadius: '14px', boxShadow: '0 8px 30px rgba(18,48,107,0.1)', boxSizing: 'border-box' }}
          >
            <form onSubmit={handleCalculate}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--navy-900)', fontWeight: '700' }}>Enter Details</h3>
              
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
                style={{ width: '100%', fontSize: '1.05rem', marginTop: '1rem', padding: '1rem', background: 'linear-gradient(135deg, var(--teal-600) 0%, var(--blue-600) 100%)' }}
              >
                Calculate System Size & Savings
              </motion.button>
            </form>
          </motion.div>

          {/* Right Col: Results */}
          <motion.div 
            ref={resultsRef}
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            style={{ flex: '1 1 300px', width: '100%', minWidth: 0 }}
          >
            <ResultCard results={results} propertyType={propertyType} />
          </motion.div>
          
        </div>
      </div>
    </>
  );
}

export default Calculator;
