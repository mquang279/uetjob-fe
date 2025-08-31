import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../../constants/constant';
import axiosClient from '../../utils/axiosClient';

const useGetAllCompanies = ({ page = 0, pageSize = 9 }) => {
    return useQuery({
        queryKey: ['companies', page, pageSize],
        queryFn: async () => {
            const { data } = await axiosClient.get(`${API_BASE_URL}/companies?page=${page}&pageSize=${pageSize}`)
            return data
        }
    })
};

export { useGetAllCompanies }
