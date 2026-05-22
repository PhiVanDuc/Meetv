import { useQuery } from "@tanstack/react-query"

import { IAgentFilter } from "@/types/agent"
import { getAgents } from "@/services/agents/client"

type Parameters = Omit<Pagination, "totalPages">
    & {filter?: IAgentFilter}

export default function useAgentBody({page, limit, filter}: Parameters) {
    const queryAgents = useQuery({
        queryFn: () => getAgents({page, limit, filter}),
        queryKey: ["getAgents", {page, limit, filter}]
    })

    return {queryAgents}
}