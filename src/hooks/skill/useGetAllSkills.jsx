import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useGetAllSkills = () => {
    return useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const { data } = await axiosClient.get(`/skills`)
            return data
        }
    })
};

export { useGetAllSkills }