import { useState, useMemo, useEffect, useCallback } from 'react';

/**
 * A custom hook to handle numbered pagination for arrays of data.
 * Useful for tables or rigid grid layouts where scrolling isn't desirable.
 * 
 * @param {Array} data - The full dataset to paginate
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Object} 
 */
function usePagination(data = [], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  // Reset to page 1 if data length completely changes significantly
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  // Derive the sliced data for the current page
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = useCallback((pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, data.length);
  const itemsRangeText = data.length > 0 ? `Showing ${startIndex}-${endIndex} of ${data.length}` : 'No items';

  const pagesList = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);
  
  return { 
    currentData, 
    currentPage, 
    totalPages, 
    goToPage, 
    nextPage, 
    prevPage,
    itemsRangeText,
    pagesList
  };
}

export default usePagination;
