export interface Agent {
    id: string,
    name: string,
    instructions: string
}

export interface AgentFilterFields {
    name?: string
}

export type GetAgentsRequestData =
    Omit<Pagination, "totalPages">
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