import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useCreateJob = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ companyId, jobData }) => {
            const { data } = await axiosClient.post(`/companies/${companyId}/jobs`, jobData)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] })
            queryClient.invalidateQueries({ queryKey: ['job-count'] })
        }
    })
};

export { useCreateJob }
