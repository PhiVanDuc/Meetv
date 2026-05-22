"use client"

import http from "@/libs/http"
import generateQueryString from "@/utils/generate-query-string"
import { Agent, GetAgentsParameters, GetAgentsResponseData, UpdateAgentParameters } from "@/types/agent"

export const getAgents = async ({page, limit, filter}: GetAgentsParameters) => {
    const queryString = generateQueryString({page, limit, ...filter})
    return await http.get<GetAgentsResponseData>({pathname: `/agents${queryString}`, isAuth: true})
}

export const getAgent = async (agentId: string) => {
    return await http.get<Agent>({pathname: `/agents/${agentId}`, isAuth: true})
}

export const addAgent = async <Data>(data: Data) => {
    return await http.post({pathname: "/agents", body: data, isAuth: true})
}

export const updateAgent = async <Data>({agentId, data}: UpdateAgentParameters<Data>) => {
    return await http.put({pathname: `/agents/${agentId}`, body: data, isAuth: true})
}

export const deleteAgent = async (agentId: string) => {
    return await http.delete({pathname: `/agents/${agentId}`, isAuth: true})
}