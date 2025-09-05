import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useGetCompanyById = (companyId) => {
    return useQuery({
        queryKey: ['company', companyId],
        queryFn: async () => {
            const { data } = await axiosClient.get(`/companies/${companyId}`)
            return data
        },
        enabled: !!companyId,
    })
};

export { useGetCompanyById }
