"use client"

import { fetcherPrivate } from "@/libs/fetcher";
import generateQueryString from "@/utils/generate-query-string";

import { GetAgentsRequestData, GetAgentsResponseData, AddAgentRequestData, UpdateAgentRequestData } from "@/services/agents/types";

export const getAgents = async (data: GetAgentsRequestData) => {
    const queryString = generateQueryString({
        page: data.page,
        limit: data.limit
    });

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