import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useCreateSkill = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (skillData) => {
            const { data } = await axiosClient.post(`/skills`, skillData)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] })
        }
    })
};

export { useCreateSkill }
