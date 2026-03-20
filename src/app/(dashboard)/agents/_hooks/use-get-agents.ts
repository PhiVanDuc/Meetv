import { useQuery } from "@tanstack/react-query";

import { getAgents } from "@/services/agents/client-functions";

type Parameters = PaginationPartial;

export default function useGetAgents({ page, limit }: Parameters) {
    const query = useQuery({
        queryFn: () => getAgents({ page, limit }),
        queryKey: ["getAgents", { page, limit }]
    });

    const isError = !query.isPending && query.isError;
    const { data, ...response } = query.data ?? {};

    const agents = data?.agents;
    const pagination = data?.pagination;

    return {
        agents,
        isError,
        response,
        pagination,
        error: query.error,
        isPending: query.isPending
    }
}