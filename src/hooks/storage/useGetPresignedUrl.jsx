import { useMutation } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useGetPresignedUrl = () => {
    return useMutation({
        mutationFn: async (body) => {
            const { data } = await axiosClient.post(`/minio/presigned-url`, body)
            return data.url
        }
    })
};

export default useGetPresignedUrl
