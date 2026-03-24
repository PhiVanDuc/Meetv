"use client"

import { fetcherPrivate } from "@/libs/fetcher";
import generateQueryString from "@/utils/generate-query-string";
import { Agent, GetAgentsRequestData, GetAgentsResponseData, AddAgentRequestData, UpdateAgentRequestData } from "@/types/agent";

export const getAgents = async (data: GetAgentsRequestData) => {
    const { page, limit, filter } = data;
    const queryString = generateQueryString({ page, limit, ...filter });
    return await fetcherPrivate.get<GetAgentsResponseData>({ pathname: `/agents${queryString}` });
}

export const getAgent = async (id: string) => {
    return await fetcherPrivate.get<Agent>({ pathname: `/agents/${id}` });
}

export const addAgent = async (data: AddAgentRequestData) => {
    return await fetcherPrivate.post({ pathname: "/agents", body: data });
}

export const updateAgent = async (data: UpdateAgentRequestData) => {
    const { id, ...restData } = data;
    return await fetcherPrivate.put({ pathname: `/agents/${id}`, body: restData });
}

export const deleteAgent = async (id: string) => {
    return await fetcherPrivate.delete({ pathname: `/agents/${id}` });
}