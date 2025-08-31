import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../../constants/constant';
import axiosClient from '../../utils/axiosClient';

const useCompaniesCount = () => {
    return useQuery({
        queryKey: ['companies-count'],
        queryFn: async () => {
            const { data } = await axiosClient.get(`${API_BASE_URL}/companies/total`)
            return data
        },
        staleTime: 10 * 60 * 60
    })
};

export { useCompaniesCount }