import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosClient from "../../utils/axiosClient"

const useDeleteCompany = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (companyId) => {
            await axiosClient.delete(`/companies/${companyId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] })
        }
    })
}

export default useDeleteCompany