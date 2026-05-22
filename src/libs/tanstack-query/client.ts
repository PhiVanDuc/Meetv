import { toast } from "@pheralb/toast"
import { HttpError } from "@/libs/http/classes"
import { HttpResponse } from "@/libs/http/types"
import { removeAuthTokens } from "@/services/auth/server"
import { HandleUnauthorizedParameters } from "@/libs/tanstack-query/types"
import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const handleUnauthorized = async ({ router, query, queryClient }: HandleUnauthorizedParameters) => {
    if (query && queryClient) queryClient.invalidateQueries({refetchType: "none"})
    await removeAuthTokens()
    router.push("/sign-in")
}

export default (router: AppRouterInstance) => {
    const client: QueryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                retry: false
            }
        },
        queryCache: new QueryCache({
            onError: async (error, query) => {
                console.log(error)

                toast.error({ text: "Thất bại", description: error.message })
                if (error instanceof HttpError && error.status === 401) await handleUnauthorized({ router, query, queryClient: client })
            }
        }),
        mutationCache: new MutationCache({
            onSuccess: (result) => {
                const { message } = result as HttpResponse<unknown>
                if (message) toast.success({ text: "Thành công", description: message })
            },
            onError: async (error) => {
                console.log(error)

                toast.error({ text: "Thất bại", description: error.message })
                if (error instanceof HttpError && error.status === 401) await handleUnauthorized({ router })
            }
        })
    })

    return client
}