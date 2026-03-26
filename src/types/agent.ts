export interface Agent {
    id: string,
    name: string,
    instructions: string
}

export interface AgentFilterFields {
    name?: string
}

export type GetAgentsRequestData =
    PaginationPartial
    & { filter?: AgentFilterFields };

export type GetAgentsResponseData = {
    agents: Agent[],
    createdAgent: boolean,
    pagination: Pagination,
}

export interface AddAgentRequestData {
    name: string,
    instructions: string
}

export type UpdateAgentRequestData =
    AddAgentRequestData
    & { id: string }