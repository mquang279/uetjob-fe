import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient'
import useDebounce from '../custom/useDebounce';

const useSearchJob = ({ page = 0, pageSize = 9, keyword }) => {
    const debouncedSearchKeyword = useDebounce(keyword, 1000)

    return useQuery({
        queryKey: ['searchJobResults', page, pageSize, debouncedSearchKeyword],
        queryFn: async () => {
            const { data } = await axiosClient.get(`/jobs/search?keyword=${debouncedSearchKeyword}&page=${page}&pageSize=${pageSize}`)
            return data
        },
        enabled: !!debouncedSearchKeyword && debouncedSearchKeyword.trim().length > 0
    })
};

export { useSearchJob }