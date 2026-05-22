export interface Agent {
    id: string;
    name: string;
    instructions: string;
}

export interface IAgentFilter {
    name?: string
}

export type GetAgentsParameters =
    Omit<Pagination, "totalPages">
    & {filter?: IAgentFilter}

export interface GetAgentsResponseData {
    agents: Agent[];
    createdAgent: boolean;
    pagination: Pagination;
}

export interface UpdateAgentParameters<Data> {
    data: Data;
    agentId?: string;
}