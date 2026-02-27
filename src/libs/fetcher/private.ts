"use client"

import { FetcherError } from "@/libs/errors";
import { getAccessToken } from "@/services/auth/server-actions";

import type { FetcherResponse, HandleFetcherParams, FetcherGetParams, FetcherMutateParams } from "@/libs/fetcher/types";

const BE = process.env.BE || process.env.NEXT_PUBLIC_BE;

const handleFetcher = async <RequestData = unknown, ResponseData = unknown>({ method, pathname, body, options }: HandleFetcherParams<RequestData>): Promise<FetcherResponse<ResponseData>> => {
    const accessToken = await getAccessToken();
    
    const headers = new Headers({
        ...options?.headers,
        Authorization: `Bearer ${accessToken}`
    });

    let parsedBody: BodyInit | undefined | null = undefined;

    if (body) {
        if (typeof body === "string" || body instanceof FormData || body instanceof URLSearchParams || body instanceof Blob || body instanceof ArrayBuffer
        ) parsedBody = body;
        else {
            parsedBody = JSON.stringify(body);
            headers.set("Content-Type", "application/json");
        }
    }

    const requestConfig: RequestInit = { ...options, method, headers, body: parsedBody };

    try {
        const response = await fetch(`${BE}${pathname}`, requestConfig);
        const responseStatus = response.status;

        if (responseStatus === 204) {
            return {
                status: responseStatus,
                message: "Yêu cầu thành công."
            };
        }

        const responseText = await response.text();
        let responseData: Omit<FetcherResponse<ResponseData>, "status">;

        try { responseData = responseText ? JSON.parse(responseText) : {}; }
        catch(error) {
            throw new FetcherError({
                status: response.status,
                message: "Lỗi định dạng dữ liệu từ máy chủ."
            });
        }

        if (responseStatus >= 400) {
            throw new FetcherError({
                ...responseData,
                status: responseStatus
            });
        }

        return {
            ...responseData,
            status: responseStatus
        }
    }
    catch(error) {
        if (error instanceof FetcherError) throw error;
        
        throw new FetcherError({
            status: 500,
            message: error instanceof Error ? error.message : "Lỗi kết nối mạng."
        });
    }
}

export default {
    get: async <ResponseData>({ pathname, options }: FetcherGetParams) => {
        return await handleFetcher<unknown, ResponseData>({ method: "GET", pathname, options });
    },

    post: async <RequestData, ResponseData>({ pathname, body, options }: FetcherMutateParams<RequestData>) => {
        return await handleFetcher<RequestData, ResponseData>({ method: "POST", pathname, body, options });
    },

    put: async <RequestData, ResponseData>({ pathname, body, options }: FetcherMutateParams<RequestData>) => {
        return await handleFetcher<RequestData, ResponseData>({ method: "PUT", pathname, body, options });
    },

    patch: async <RequestData, ResponseData>({ pathname, body, options }: FetcherMutateParams<RequestData>) => {
        return await handleFetcher<RequestData, ResponseData>({ method: "PATCH", pathname, body, options });
    },

    delete: async <RequestData, ResponseData>({ pathname, body, options }: FetcherMutateParams<RequestData>) => {
        return await handleFetcher<RequestData, ResponseData>({ method: "DELETE", pathname, body, options });
    }
}