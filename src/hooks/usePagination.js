import { useState, useMemo } from 'react';

/**
 * A custom hook to handle numbered pagination for arrays of data.
 * Useful for tables or rigid grid layouts where scrolling isn't desirable.
 * 
 * @param {Array} data - The full dataset to paginate
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Object} 
 */
function usePagination(data, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Derive the sliced data for the current page
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // Reset to page 1 if data length completely changes significantly
  useMemo(() => {
    setCurrentPage(1);
  }, [data.length]);
  
  return { 
    currentData, 
    currentPage, 
    totalPages, 
    goToPage, 
    nextPage, 
    prevPage 
  };
}

export default usePagination;
