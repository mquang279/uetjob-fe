import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useActiveJobsCount = () => {
    return useQuery({
        queryKey: ['active-jobs-count'],
        queryFn: async () => {
            const { data } = await axiosClient.get(`/jobs/active/count`)
            return data
        },
    })
};

export { useActiveJobsCount }