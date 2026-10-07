export const SOLAR_CONFIG = {
  performanceRatio: 0.78,          // system losses (0.75–0.80)
  panelWattage: 540,               // W per panel
  areaPerKwSqFt: 100,              // approx. roof area needed per kW in sq ft
  costPerKw: 60000,                // ₹ per kW (before subsidy), editable
  co2PerUnitKg: 0.82,              // kg CO2 saved per kWh (India grid factor)
  annualDegradation: 0.005,        // 0.5% per year efficiency degradation
  tariffEscalation: 0.03,          // 3% yearly electricity cost increase
  systemLifeYears: 25,             // expected life of system
};
