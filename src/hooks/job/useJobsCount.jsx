import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../../constants/constant';
import axiosClient from '../../utils/axiosClient';

const useJobsCount = () => {
  return useQuery({
    queryKey: ['job-count'],
    queryFn: async () => {
      const { data } = await axiosClient.get(`${API_BASE_URL}/jobs/count`)
      return data
    },
    staleTime: 10 * 60 * 60
  })
};

export { useJobsCount }