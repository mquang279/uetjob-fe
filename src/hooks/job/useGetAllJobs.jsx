import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../../constants/constant';
import axiosClient from '../../utils/axiosClient';

const useGetAllJobs = ({ page = 0, pageSize = 9 }) => {
    return useQuery({
        queryKey: ['jobs', page, pageSize],
        queryFn: async () => {
            const { data } = await axiosClient.get(`${API_BASE_URL}/jobs?page=${page}&pageSize=${pageSize}`)
            return data
        }
    })
};

export { useGetAllJobs }