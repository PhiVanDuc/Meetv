import { AgentFilterFields } from "@/app/(dashboard)/agents/_components/filter";

export type GetAgentsRequestData = PaginationPartial & {
    filter: AgentFilterFields
};

export type GetAgentsResponseData = {
    agents: Agent[],
    createdAgent: boolean,
    pagination: Pagination,
}

export interface AddAgentRequestData {
    name: string,
    instructions: string
}

export type UpdateAgentRequestData = AddAgentRequestData & {
    id: string
}