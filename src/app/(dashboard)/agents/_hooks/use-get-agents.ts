import { useQuery } from "@tanstack/react-query";

import { AgentFilterFields } from "@/types/agent";
import { getAgents } from "@/services/agents/client-functions";

type Parameters = Omit<Pagination, "totalPages"> & { filter?: AgentFilterFields };

export default function useGetAgents({ page, limit, filter }: Parameters) {
    const query = useQuery({
        queryFn: () => getAgents({ page, limit, filter }),
        queryKey: ["getAgents", { page, limit, filter }]
    });

    const { data, ...resResponse } = query.data ?? {};
    const isError = !query.isPending && query.isError;

    return {
        data,
        isError,
        error: query.error,
        response: resResponse,
        isPending: query.isPending
    }
}