import { useQuery } from "@tanstack/react-query";

import { getAgents } from "@/services/agents/client-functions";
import { FetcherResponse } from "@/libs/fetcher";

type Parameters = PaginationPartial;

export default function useGetAgents({ page, limit }: Parameters) {
    const query = useQuery({
        queryFn: () => getAgents({ page, limit }),
        queryKey: ["getAgents", { page, limit }]
    });

    const isError = !query.isPending && query.isError;
    const { data, ...res } = query.data ?? {};

    const agents = data?.agents || [];
    const pagination = data?.pagination as Pagination;
    const response = res as Omit<FetcherResponse<unknown>, "data">;

    return {
        agents,
        isError,
        response,
        pagination,
        error: query.error,
        isPending: query.isPending
    }
}