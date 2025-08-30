import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useUpdateCompany = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ companyId, companyData }) => {
            const { data } = await axiosClient.put(`/companies/${companyId}`, companyData)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] })
        }
    })
};

export { useUpdateCompany }
