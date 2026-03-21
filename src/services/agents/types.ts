export type GetAgentsRequestData = PaginationPartial;

export type GetAgentsResponseData = {
    pagination: Pagination,
    agents: Agent[]
}

export interface AddAgentRequestData {
    name: string,
    instructions: string
}

export type UpdateAgentRequestData = AddAgentRequestData & {
    id: string
}