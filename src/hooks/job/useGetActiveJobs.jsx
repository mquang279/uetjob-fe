import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useGetActiveJobs = ({ page = 0, pageSize = 9 }) => {
    return useQuery({
        queryKey: ['active-jobs', page, pageSize],
        queryFn: async () => {
            const { data } = await axiosClient.get(`/jobs/active?page=${page}&pageSize=${pageSize}`)
            return data
        }
    })
};

export { useGetActiveJobs }