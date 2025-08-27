import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosClient from "../../utils/axiosClient"

const useDeleteJob = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ companyId, jobId }) => {
            await axiosClient.delete(`/companies/${companyId}/job/${jobId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] })
            queryClient.invalidateQueries({ queryKey: ['job-count'] })
        }
    })
}

export default useDeleteJob