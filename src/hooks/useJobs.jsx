import { useState, useEffect } from 'react';
import { jobAPI } from '../services/jobAPI';

const useJobsCount = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobsCount = async () => {
      try {
        const totalCount = await jobAPI.getTotalJobsCount();
        setCount(totalCount);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCount(0);
      }
    };

    fetchJobsCount();
  }, []);

  return { count, error };
};

export { useJobsCount }