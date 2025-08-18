import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { API_BASE_URL } from '../../constants/constant';

const useJobsCount = () => {
  return useQuery({
    queryKey: ['job-count'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/jobs/count`)
      return data
    },
    staleTime: 1000 * 60 * 60
  })
};

export { useJobsCount }