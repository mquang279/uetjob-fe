import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useUploadFile = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (form) => {
            const { data } = await axiosClient({
                method: 'post',
                url: '/files',
                data: form,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                },
            })
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] })
        }
    })
};

export { useUploadFile }
