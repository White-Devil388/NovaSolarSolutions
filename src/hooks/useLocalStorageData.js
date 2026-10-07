import { useState, useEffect } from 'react';

/**
 * A custom hook to fetch and parse data from localStorage based on a CMS category key.
 * Used for replacing scattered localStorage logic across components.
 * 
 * @param {string} categoryName - The category name (e.g. 'Projects', 'Products')
 * @returns {Array} - The parsed JSON data from localStorage, or an empty array.
 */
function useLocalStorageData(categoryName) {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const key = `solar_dataset_${categoryName.toLowerCase()}`;
      const savedData = localStorage.getItem(key);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Ensure only 'Published' items are returned for public facing frontend
        const published = parsed.filter(item => item.status === 'Published');
        setData(published);
      }
    } catch (error) {
      console.error(`Failed to load data for ${categoryName}`, error);
    }
  }, [categoryName]);

  return data;
}

export default useLocalStorageData;
