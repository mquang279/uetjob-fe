import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_BASE_URL } from '../../constants/constant';
import axiosClient from '../../utils/axiosClient';

const useCreateJob = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ companyId, jobData }) => {
            const { data } = await axiosClient.post(`/companies/${companyId}/jobs`, jobData)
            return data
        },
        onSuccess: () => {
            // Invalidate and refetch jobs data
            queryClient.invalidateQueries({ queryKey: ['jobs'] })
            queryClient.invalidateQueries({ queryKey: ['job-count'] })
        }
    })
};

export { useCreateJob }
