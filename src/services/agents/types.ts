export type GetAgentsRequestData = PaginationPartial;

export type GetAgentsResponseData = {
    pagination: Pagination,
    agents: Agent[]
}