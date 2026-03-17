import { toast } from "@pheralb/toast";
import { FetcherResponse, FetcherError } from "@/libs/fetcher";
import { clearSession } from "@/services/session/server-actions";
import { Query, QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const handle401 = async ({ router, query, queryClient }: { router: AppRouterInstance, query?: Query<unknown, unknown>, queryClient?: QueryClient }) => {
    await clearSession();

    if (query && queryClient) {
        queryClient.invalidateQueries({
            queryKey: query.queryKey,
            refetchType: "none"
        });
    }

    router.push("/sign-in");
}

export default (router: AppRouterInstance) => {
    const client: QueryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                retry: 0
            }
        },
        queryCache: new QueryCache({
            onError: async (error, query) => {
                console.log(error);

                if (error instanceof FetcherError && error.status === 401) {
                    await handle401({ router, query, queryClient: client });
                }

                toast.error({ text: "Thất bại", description: error.message });
            }
        }),
        mutationCache: new MutationCache({
            onSuccess: (data) => {
                const { message } = data as FetcherResponse<unknown>;
                toast.success({ text: "Thành công", description: message });
            },
            onError: async (error) => {
                console.log(error);

                if (error instanceof FetcherError && error.status === 401) {
                    await handle401({ router });
                }

                toast.error({ text: "Thất bại", description: error.message });
            }
        })
    });

    return client;
}