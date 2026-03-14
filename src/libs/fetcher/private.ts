"use client"

import { FetcherError } from "@/libs/fetcher";
import { refreshSession } from "@/services/session/client-functions";

import type { FetcherResponse, FetcherHandleParams, FetcherGetParams, FetcherMutateParams } from "@/libs/fetcher";

const BE = process.env.NEXT_PUBLIC_BE;

const handle = async <RequestData, ResponseData>(
    { method, pathname, body, options, isRetry }: FetcherHandleParams<RequestData>
): Promise<FetcherResponse<ResponseData>> => {
    const headers = new Headers({
        Authorization: `Bearer ${""}`,
        ...options?.headers
    });

    let parsedBody: BodyInit | undefined | null = undefined;

    if (body) {
        if (
            typeof body === "string" ||
            body instanceof FormData ||
            body instanceof URLSearchParams ||
            body instanceof Blob ||
            body instanceof ArrayBuffer
        ) {
            parsedBody = body;
        }
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

        try {
            responseData = responseText
                ? JSON.parse(responseText)
                : {};
        }
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
        if (error instanceof FetcherError) {
            if (error.status === 401 && error.errors?.some(error => error.code === "session-expired") && !isRetry) {
                await refreshSession();
                return handle<RequestData, ResponseData>({ method, pathname, body, options, isRetry: true });
            }

            throw error;
        }
        
        throw new FetcherError({
            status: 500,
            message: error instanceof Error ? error.message : "Lỗi kết nối mạng."
        });
    }
}

export default {
    get: async <ResponseData = unknown>({ pathname, options }: FetcherGetParams) => {
        return await handle<unknown, ResponseData>({ method: "GET", pathname, options });
    },

    post: async <RequestData = unknown, ResponseData = unknown>({ pathname, body, options }: FetcherMutateParams<RequestData>) => {
        return await handle<RequestData, ResponseData>({ method: "POST", pathname, body, options });
    },

    put: async <RequestData = unknown, ResponseData = unknown>({ pathname, body, options }: FetcherMutateParams<RequestData>) => {
        return await handle<RequestData, ResponseData>({ method: "PUT", pathname, body, options });
    },

    patch: async <RequestData = unknown, ResponseData = unknown>({ pathname, body, options }: FetcherMutateParams<RequestData>) => {
        return await handle<RequestData, ResponseData>({ method: "PATCH", pathname, body, options });
    },

    delete: async <RequestData = unknown, ResponseData = unknown>({ pathname, body, options }: FetcherMutateParams<RequestData>) => {
        return await handle<RequestData, ResponseData>({ method: "DELETE", pathname, body, options });
    }
}