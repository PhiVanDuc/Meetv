"use client"

import { FetcherError, fetcherPrivate } from "@/libs/fetcher";
import generateQueryString from "@/utils/generate-query-string";
import { getCurrentUser } from "@/services/session/server-actions";

import { GetAgentsRequestData, GetAgentsResponseData } from "@/services/agents/types";

export const getAgents = async (data: GetAgentsRequestData) => {
    const queryString = generateQueryString({
        page: data.page,
        limit: data.limit
    });

    return await fetcherPrivate.get<GetAgentsResponseData>({ pathname: `/agents?${queryString}` });
}

export const addAgent = async <RequestData>(data: RequestData) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        throw new FetcherError({
            status: 401,
            message: "Phiên đăng nhập đã hết hạn."
        });
    }

    return await fetcherPrivate.post({
        pathname: "/agents",
        body: {
            ...data,
            userId: currentUser.id
        }
    });
}