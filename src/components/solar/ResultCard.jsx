import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return "₹0";
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

const ResultCard = ({ results, propertyType }) => {
  if (!results) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', background: '#0a0f1c', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', height: '100%', minHeight: '520px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
        <img src="/images/Solar Calculator Waiting Screen.png" alt="Waiting for calculation" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
    );
  }

  const {
    requiredKw,
    monthlyGeneration,
    yearlyGeneration,
    yearlySavings,
    paybackYears,
    co2SavedPerYear,
    treesEquivalent,
  } = results;

  // Chart Data Math (Mocked visually as requested)
  // E.g. Showing current bill scaling down to a minimum connection fee.
  const chartBars = [80, 100, 70, 40, 60, 50, 90, 100]; // Pre solar heights
  const chartBarsPost = [10, 15, 10, 10, 10, 15, 10, 12]; // Post solar heights

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={requiredKw + propertyType}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', height: '100%' }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', height: '100%', boxSizing: 'border-box', background: '#0a0f1c', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', overflow: 'hidden', position: 'relative' }}>
          
          <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'white', fontWeight: '600' }}>Your Solar Estimate</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem 1.5rem', flex: 1 }}>
            
            {/* Top Left: System Size */}
            <div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Estimated System Size</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                <span style={{ fontSize: '2rem', opacity: 0.8 }}>🪟</span>
                <span style={{ fontSize: '2.5rem', fontWeight: '600', letterSpacing: '-1px' }}>{requiredKw.toFixed(0)} kW</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>{requiredKw.toFixed(0)} kWp Grid-tied System</div>
            </div>

            {/* Top Right: Annual Generation (Alternative to duplicate savings) */}
            <div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Estimated Annual Generation</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '600', color: 'white', letterSpacing: '-1px' }}>{yearlyGeneration.toLocaleString()} <span style={{ fontSize: '1.5rem' }}>kWh</span></div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Avg {monthlyGeneration.toLocaleString()} units / month generation</div>
            </div>

            {/* Mid Left: Annual Savings */}
            <div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Estimated Annual Savings</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '600', letterSpacing: '-1px' }}>{formatCurrency(yearlySavings)}</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Avg {formatCurrency(yearlySavings / 12)} / month based on tariff and usage</div>
            </div>

            {/* Mid Right: ROI */}
            <div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Projected Financial ROI</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '600', color: 'white', letterSpacing: '-1px' }}>{paybackYears} Years</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Payback Period</div>
            </div>

            {/* Bottom Left: Environmental Impact */}
            <div style={{ alignSelf: 'end' }}>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Environmental Impact</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '500', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                CO2 Reduction: {co2SavedPerYear.toLocaleString()} kg / year
              </div>
              <div style={{ color: '#10b981', fontSize: '0.85rem', marginTop: '0.3rem', fontWeight: '500' }}>Equivalent to planting {treesEquivalent} trees</div>
            </div>

            {/* Bottom Right: Bar Chart Mock */}
            <div style={{ alignSelf: 'end' }}>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.8rem' }}>Monthly Bill Before vs After Solar</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px', opacity: 0.9 }}>
                {chartBars.map((height, i) => (
                  <div key={`pre-${i}`} style={{ flex: 1, position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                    {/* Pre-solar bar */}
                    <div style={{ width: '100%', height: `${height}%`, background: 'rgba(255,255,255,0.15)', borderRadius: '2px 2px 0 0', position: 'absolute', bottom: 0 }} />
                    {/* Post-solar bar overlaid */}
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${chartBarsPost[i]}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + (i * 0.05) }}
                      style={{ width: '100%', background: '#475569', borderRadius: '2px 2px 0 0', position: 'absolute', bottom: 0, zIndex: 1 }} 
                    />
                  </div>
                ))}
                {/* Decoration Sparkle from mock */}
                <div style={{ position: 'absolute', bottom: '10px', right: '20px', fontSize: '2rem', opacity: 0.8, textShadow: '0 0 10px white' }}>✨</div>
                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.2)', position: 'absolute', bottom: 0 }} />
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResultCard;
