import { useQuery } from "@tanstack/react-query";

import { FetcherResponse } from "@/libs/fetcher";
import { getAgents } from "@/services/agents/client-functions";
import { AgentFilterFields } from "@/app/(dashboard)/agents/_components/filter";

type Parameters = PaginationPartial & { filter: AgentFilterFields };

export default function useGetAgents({ page, limit, filter }: Parameters) {
    const query = useQuery({
        queryFn: () => getAgents({ page, limit, filter }),
        queryKey: ["getAgents", { page, limit, filter }]
    });

    const isError = !query.isPending && query.isError;

    const { data, ...res } = query.data ?? {};
    const response = res as Omit<FetcherResponse<unknown>, "data">;

    return {
        data,
        isError,
        response,
        error: query.error,
        isPending: query.isPending
    }
}