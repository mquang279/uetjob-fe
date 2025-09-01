import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useUpdateJob = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ companyId, jobId, jobData }) => {
            const { data } = await axiosClient.put(`/companies/${companyId}/jobs/${jobId}`, jobData)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] })
            queryClient.invalidateQueries({ queryKey: ['active-jobs'] })
            queryClient.invalidateQueries({ queryKey: ['active-jobs-count'] })
        }
    })
};

export { useUpdateJob }
