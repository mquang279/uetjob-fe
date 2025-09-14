import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../utils/axiosClient';

const useListAllFiles = (folder) => {
    return useQuery({
        queryKey: ['files', folder],
        queryFn: async () => {
            const { data } = await axiosClient.get(`/minio/files/${folder}`)
            return data
        }
    })
};

export default useListAllFiles
