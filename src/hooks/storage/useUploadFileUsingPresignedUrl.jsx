import { useMutation } from '@tanstack/react-query'
import axios from 'axios';

const useUploadFileUsingPresignedUrl = () => {
    return useMutation({
        mutationFn: async ({ url, file }) => {
            const response = await axios.put(url, file, {
                headers: {
                    'Content-Type': file.type || 'application/octet-stream',
                },
            })
            return response.data
        }
    })
};

export default useUploadFileUsingPresignedUrl
