import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useGetJobById = (jobId) => {
    return useQuery({
        queryKey: ['job', jobId],
        queryFn: async () => {
            const { data } = await axiosClient.get(`/jobs/${jobId}`)
            return data
        },
        enabled: !!jobId,
    })
};

export { useGetJobById }
