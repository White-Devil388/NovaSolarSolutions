import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, IndianRupee, Sun } from 'lucide-react';

const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return "₹0";
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

const ResultCard = ({ results, propertyType }) => {
  if (!results) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', background: 'var(--white)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.6)', height: '100%', minHeight: '520px', boxShadow: '0 8px 30px rgba(18,48,107,0.1)', overflow: 'hidden', padding: '1rem' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
          <img src="/images/green_solar_panels_1791614319680.png" alt="Green Solar Power" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,31,75,0.9) 0%, rgba(14,138,155,0.3) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '3rem 2rem' }}>
            <h3 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem', fontWeight: '800' }}>Discover Your Solar Potential</h3>
            <p style={{ color: 'var(--sky-100)', fontSize: '1.1rem', lineHeight: '1.6', margin: 0, fontWeight: '500' }}>Enter your property details in the form to get a real-time estimate of your ideal system size, projected financial savings, and positive environmental impact.</p>
          </div>
        </div>
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', height: '100%', boxSizing: 'border-box', background: 'var(--white)', borderRadius: '14px', border: '1px solid rgba(18,48,107,0.1)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 8px 30px rgba(18,48,107,0.1)', overflow: 'hidden', position: 'relative' }}>
          
          <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem', color: 'var(--navy-900)', fontWeight: '700' }}>Your Solar Estimate</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem 1.5rem', flex: 1 }}>
            
            {/* Top Left: System Size */}
            <div>
              <div style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>Estimated System Size</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy-900)' }}>
                <span style={{ color: 'var(--teal-600)' }}><Sun size={32} /></span>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px' }}>{requiredKw.toFixed(0)} kW</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>{requiredKw.toFixed(0)} kWp Grid-tied System</div>
            </div>

            {/* Top Right: Annual Generation (Alternative to duplicate savings) */}
            <div>
              <div style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>Estimated Annual Generation</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--teal-600)', letterSpacing: '-1px' }}>{yearlyGeneration.toLocaleString()} <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>kWh</span></div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Avg {monthlyGeneration.toLocaleString()} units / month</div>
            </div>

            {/* Mid Left: Annual Savings */}
            <div>
              <div style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>Estimated Annual Savings</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy-900)' }}>
                <span style={{ color: 'var(--green-500)' }}><IndianRupee size={28} /></span>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px' }}>{formatCurrency(yearlySavings).replace('₹', '')}</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Avg {formatCurrency(yearlySavings / 12)} / month savings</div>
            </div>

            {/* Mid Right: ROI */}
            <div>
              <div style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>Projected Financial ROI</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--navy-900)', letterSpacing: '-1px' }}>{paybackYears} Years</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Payback Period</div>
            </div>

            {/* Bottom Left: Environmental Impact */}
            <div style={{ alignSelf: 'end' }}>
              <div style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>Environmental Impact</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Leaf size={24} color="var(--green-500)" />
                {co2SavedPerYear.toLocaleString()} kg CO₂
              </div>
              <div style={{ color: 'var(--teal-600)', fontSize: '0.85rem', marginTop: '0.3rem', fontWeight: '600' }}>Equivalent to planting {treesEquivalent} trees</div>
            </div>

            {/* Bottom Right: Bar Chart Mock */}
            <div style={{ alignSelf: 'end' }}>
              <div style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginBottom: '0.8rem', fontWeight: '600' }}>Monthly Bill Before vs After Solar</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px', opacity: 0.9 }}>
                {chartBars.map((height, i) => (
                  <div key={`pre-${i}`} style={{ flex: 1, position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                    {/* Pre-solar bar */}
                    <div style={{ width: '100%', height: `${height}%`, background: 'var(--sky-200)', borderRadius: '2px 2px 0 0', position: 'absolute', bottom: 0 }} />
                    {/* Post-solar bar overlaid */}
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${chartBarsPost[i]}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + (i * 0.05) }}
                      style={{ width: '100%', background: 'var(--green-400)', borderRadius: '2px 2px 0 0', position: 'absolute', bottom: 0, zIndex: 1 }} 
                    />
                  </div>
                ))}
                <div style={{ width: '100%', height: '1px', background: 'var(--sky-200)', position: 'absolute', bottom: 0 }} />
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResultCard;
