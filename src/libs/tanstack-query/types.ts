import { Query, QueryClient } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export interface HandleUnauthorizedParameters {
    router: AppRouterInstance; 
    queryClient?: QueryClient;
    query?: Query<unknown, unknown>;
}