const API_BASE_URL = 'http://localhost:8080/api/v1';

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtcXVhbmcyNzk5MkBnbWFpbC5jb20iLCJleHAiOjE3NTU1MjE4NzMsImlhdCI6MTc1NTE2MTg3MywidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoibXF1YW5nMjc5OTJAZ21haWwuY29tIn19.QOnETs-JUizrZ1fyESbnQ0eCbLmMtAtPfZ2nxo4h_ZH2IJlgrOwjcPst3YfybLmgQ7mzH9CG2WpAfmR7ufki3Q'; // or wherever you store your token
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
