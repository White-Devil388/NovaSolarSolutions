import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * A custom hook to implement infinite scrolling dynamically using the Intersection Observer API.
 * 
 * @param {Array} data - The full dataset to paginate
 * @param {number} itemsPerPage - Number of items to load per batch
 * @returns {Object} { displayedData, hasMore, loaderRef }
 */
function useInfiniteScroll(data, itemsPerPage = 6) {
  const [displayedCount, setDisplayedCount] = useState(itemsPerPage);
  const loaderRef = useRef(null);

  // Reset count if data array length drastically changes (e.g., category filter clicked)
  useEffect(() => {
    setDisplayedCount(itemsPerPage);
  }, [data, itemsPerPage]);

  const loadMore = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && displayedCount < data.length) {
      setDisplayedCount((prev) => Math.min(prev + itemsPerPage, data.length));
    }
  }, [displayedCount, data.length, itemsPerPage]);

  useEffect(() => {
    const options = {
      root: null, // Viewport
      rootMargin: '100px', // Load slightly before reaching the element
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(loadMore, options);
    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore, loaderRef]);

  const displayedData = data.slice(0, displayedCount);
  const hasMore = displayedCount < data.length;

  return { displayedData, hasMore, loaderRef };
}

export default useInfiniteScroll;
