import { useState, useMemo, useCallback } from 'react';
import useDebounce from './useDebounce';

/**
 * Custom hook for fast table and list filtering, search, and sorting.
 * Encapsulates debouncing, memoization, and status filtering.
 * 
 * @param {Array} data - Raw dataset
 * @param {Array<string>} searchFields - Object keys to perform text search on
 * @param {string} statusKey - Object key to perform status filtering on (default: 'status')
 * @returns {Object} { searchQuery, setSearchQuery, statusFilter, setStatusFilter, filteredData, sortBy, setSortBy, sortOrder, toggleSortOrder, stats }
 */
export function useTableFilter(data = [], searchFields = ['name', 'title'], statusKey = 'status') {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  const debouncedSearch = useDebounce(searchQuery, 250);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleSort = useCallback((field) => {
    if (sortBy === field) {
      toggleSortOrder();
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  }, [sortBy, toggleSortOrder]);

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.filter(item => {
      // 1. Status Filter
      if (statusFilter !== 'All' && statusKey) {
        if (item[statusKey] !== statusFilter) return false;
      }

      // 2. Search Query Filter
      if (!debouncedSearch.trim()) return true;

      const lowerQuery = debouncedSearch.toLowerCase().trim();
      return searchFields.some(field => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerQuery);
      });
    }).sort((a, b) => {
      if (!sortBy) return 0;
      const valA = a[sortBy] ?? '';
      const valB = b[sortBy] ?? '';

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, debouncedSearch, statusFilter, searchFields, statusKey, sortBy, sortOrder]);

  // Memoized stats
  const stats = useMemo(() => {
    return {
      total: data.length,
      filtered: filteredData.length,
      hasActiveFilter: statusFilter !== 'All' || debouncedSearch.trim().length > 0
    };
  }, [data.length, filteredData.length, statusFilter, debouncedSearch]);

  return {
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    statusFilter,
    setStatusFilter,
    filteredData,
    sortBy,
    handleSort,
    sortOrder,
    toggleSortOrder,
    stats
  };
}

export default useTableFilter;
