import { useState, useEffect, useMemo, useCallback } from 'react';
import { SOLAR_DATA } from '../data/solarData';
import { calculateSolarSystem } from '../utils/solarCalculations';

/**
 * Custom hook to manage solar calculation state, tariff resolutions,
 * input validation, and results calculation with useMemo and useCallback.
 */
export function useSolarCalculator() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [propertyType, setPropertyType] = useState('Residential');
  const [inputMode, setInputMode] = useState('bill');
  const [inputValue, setInputValue] = useState('');
  const [tariff, setTariff] = useState('');
  const [availableArea, setAvailableArea] = useState('');
  const [results, setResults] = useState(null);

  // Auto-fill tariff when state changes
  useEffect(() => {
    if (selectedState && SOLAR_DATA[selectedState]) {
      setTariff(String(SOLAR_DATA[selectedState].defaultTariff));
    }
  }, [selectedState]);

  // Memoized available cities for the selected state
  const availableCities = useMemo(() => {
    if (!selectedState || !SOLAR_DATA[selectedState]) return [];
    return Object.keys(SOLAR_DATA[selectedState].cities || {});
  }, [selectedState]);

  // Memoized Peak Sun Hours (PSH)
  const peakSunHours = useMemo(() => {
    if (!selectedState || !SOLAR_DATA[selectedState]) return 4.5;
    const stateData = SOLAR_DATA[selectedState];
    if (selectedCity && stateData.cities && stateData.cities[selectedCity]) {
      return stateData.cities[selectedCity];
    }
    return stateData.stateAvgPSH || 4.5;
  }, [selectedState, selectedCity]);

  // Memoized calculation trigger
  const computeSolar = useCallback(() => {
    if (!selectedState || !selectedCity || !inputValue) return null;

    const computed = calculateSolarSystem({
      propertyType,
      inputMode,
      inputValue: parseFloat(inputValue),
      tariff: parseFloat(tariff),
      peakSunHours,
      availableArea: availableArea ? parseFloat(availableArea) : null
    });

    setResults(computed);
    return computed;
  }, [selectedState, selectedCity, inputValue, propertyType, inputMode, tariff, peakSunHours, availableArea]);

  const resetCalculator = useCallback(() => {
    setSelectedState('');
    setSelectedCity('');
    setInputValue('');
    setAvailableArea('');
    setResults(null);
  }, []);

  return {
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
    availableCities,
    peakSunHours,
    computeSolar,
    resetCalculator
  };
}

export default useSolarCalculator;
