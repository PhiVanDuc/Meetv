import { toast } from "@pheralb/toast";
import { FetcherError } from "@/libs/fetcher";
import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';

import type { FetcherResponse } from "@/libs/fetcher";
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default (router: AppRouterInstance) => {
    let client: QueryClient;

    client = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                retry: 0
            }
        },
        queryCache: new QueryCache({
            onError: async (error, query) => {
                console.log(error);

                if (error instanceof FetcherError) {
                    switch(error.status) {
                        case 401:
                            break;
                    }
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

                if (error instanceof FetcherError) {
                    switch(error.status) {
                        case 401:
                            break;
                    }
                }

                toast.error({ text: "Thất bại", description: error.message });
            }
        })
    });

    return client;
}