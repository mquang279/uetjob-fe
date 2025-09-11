import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useCreateCompany = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values) => {
            const { data } = await axiosClient.post(`/companies`, values)
            console.log(data)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] })
        }
    })
};

export { useCreateCompany }
