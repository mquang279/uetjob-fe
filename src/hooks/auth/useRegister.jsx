import { useMutation } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useRegister = () => {
    return useMutation({
        mutationFn: async (userInfo) => {
            userInfo = {
                ...userInfo,
                role: { id: 1 }
            }
            const { data } = await axiosClient.post(`/auth/register`, userInfo)
            return data
        }
    })
};

export { useRegister }
