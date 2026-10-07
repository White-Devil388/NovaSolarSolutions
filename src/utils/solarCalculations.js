import { SOLAR_CONFIG } from '../constants/solarConfig';

/**
 * Calculate the PM Surya Ghar Subsidy (for residential only).
 * Rules:
 * Up to 2 kW: ₹30,000 per kW
 * For 3rd kW: ₹18,000
 * > 3 kW: Maximum cap at ₹78,000 total
 */
export const calculateSubsidy = (requiredKw, propertyType) => {
  if (propertyType !== 'Residential') return 0;

  let totalSubsidy = 0;
  
  if (requiredKw <= 2) {
    totalSubsidy = requiredKw * 30000;
  } else if (requiredKw > 2 && requiredKw <= 3) {
    totalSubsidy = (2 * 30000) + ((requiredKw - 2) * 18000);
  } else {
    // Capped at 3kW value = 60000 + 18000 = 78000
    totalSubsidy = 78000;
  }
  
  return totalSubsidy;
};

/**
 * Core function to evaluate the solar setup based on inputs.
 */
export const calculateSolarSystem = ({
  propertyType,
  inputMode,       // 'bill' or 'units'
  inputValue,      // numeric amount
  tariff,          // ₹/unit
  peakSunHours,    // from solarData mapping
  availableArea    // optional user limit
}) => {
  // Ensure valid numerical baseline
  if (!inputValue || inputValue <= 0) return null;
  if (!tariff || tariff <= 0) return null;

  // 1. Resolve Monthly Units
  let monthlyUnits = inputMode === 'bill' ? (inputValue / tariff) : inputValue;
  let dailyUnits = monthlyUnits / 30;

  // 2. Capacity computations
  let unitsPerKwPerDay = peakSunHours * SOLAR_CONFIG.performanceRatio;
  let requiredKwRaw = dailyUnits / unitsPerKwPerDay;
  
  // Round up to nearest 0.5 kW (standard inverter sizing rules)
  let requiredKw = Math.ceil(requiredKwRaw * 2) / 2;

  // If user entered a roof area, check if it fits. If it doesn't, cap it. (Optional behavior)
  let maxKwSpace = null;
  if (availableArea && availableArea > 0) {
    maxKwSpace = Math.floor((availableArea / SOLAR_CONFIG.areaPerKwSqFt) * 2) / 2;
    if (requiredKw > maxKwSpace && maxKwSpace > 0) {
       requiredKw = maxKwSpace; // Limit suggestion to roof space
    }
  }

  // Minimum realistic install is usually 1kW
  if (requiredKw < 1) requiredKw = 1;

  // 3. Technical Requirements
  const numberOfPanels = Math.ceil((requiredKw * 1000) / SOLAR_CONFIG.panelWattage);
  const roofAreaNeeded = requiredKw * SOLAR_CONFIG.areaPerKwSqFt;
  
  // 4. Generation Profiles
  const monthlyGeneration = requiredKw * unitsPerKwPerDay * 30;
  const yearlyGeneration = monthlyGeneration * 12;

  // 5. Costing & Subsidy
  const costPerKwAdjusted = propertyType === 'Residential' ? SOLAR_CONFIG.costPerKw : SOLAR_CONFIG.costPerKw * 0.9; // Wholesale pricing scaling for commercial
  const grossCost = requiredKw * costPerKwAdjusted;
  const subsidy = calculateSubsidy(requiredKw, propertyType);
  const netCost = grossCost - subsidy;

  // 6. Savings & ROI
  const yearlySavings = yearlyGeneration * tariff;
  const paybackYears = Number((netCost / yearlySavings).toFixed(1));

  // Compute 25-Year Lifetime Savings (handling degradation & tariff escalation)
  let cumulativeSavings = 0;
  let currentGeneration = yearlyGeneration;
  let currentTariff = tariff;

  for (let year = 1; year <= SOLAR_CONFIG.systemLifeYears; year++) {
    cumulativeSavings += (currentGeneration * currentTariff);
    currentGeneration -= (currentGeneration * SOLAR_CONFIG.annualDegradation);
    currentTariff += (currentTariff * SOLAR_CONFIG.tariffEscalation);
  }
  
  const lifetimeSavings = cumulativeSavings - netCost;

  // 7. Environment
  const co2SavedPerYear = yearlyGeneration * SOLAR_CONFIG.co2PerUnitKg;
  const treesEquivalent = co2SavedPerYear / 21; // ~21kg Co2 absorbed per typical hardwood tree per year

  return {
    requiredKw,
    numberOfPanels,
    roofAreaNeeded,
    maxKwSpace, // to check if roof area capped the calc
    monthlyGeneration: Math.round(monthlyGeneration),
    yearlyGeneration: Math.round(yearlyGeneration),
    grossCost: Math.round(grossCost),
    subsidy: Math.round(subsidy),
    netCost: Math.round(netCost),
    monthlySavings: Math.round(yearlySavings / 12),
    yearlySavings: Math.round(yearlySavings),
    paybackYears,
    lifetimeSavings: Math.round(lifetimeSavings),
    co2SavedPerYear: Math.round(co2SavedPerYear),
    treesEquivalent: Math.round(treesEquivalent),
  };
};
