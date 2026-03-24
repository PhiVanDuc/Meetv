import { useQuery } from "@tanstack/react-query";

import { AgentFilterFields } from "@/types/agent";
import { getAgents } from "@/services/agents/client-functions";

type Parameters = PaginationPartial & { filter: AgentFilterFields };

export default function useGetAgents({ page, limit, filter }: Parameters) {
    const query = useQuery({
        queryFn: () => getAgents({ page, limit, filter }),
        queryKey: ["getAgents", { page, limit, filter }]
    });

    const { data, ...res } = query.data ?? {};
    const isError = !query.isPending && query.isError;

    return {
        data,
        isError,
        response: res,
        error: query.error,
        isPending: query.isPending
    }
}