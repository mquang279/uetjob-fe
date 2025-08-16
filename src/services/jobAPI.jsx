import { API_BASE_URL } from '../constants/constant';

const getAuthHeaders = () => {
  const token = '';
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const jobAPI = {
  getTotalJobsCount: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/count`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const count = await response.json();
      return count;
    } catch (error) {
      console.error('Error fetching jobs count:', error);
      throw error;
    }
  },

  getAllJobs: async (page = 0, pageSize = 10) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs?page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  getJobById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const job = await response.json();
      return job;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  }
};

export default jobAPI;
