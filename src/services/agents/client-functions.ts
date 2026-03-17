"use client"

import { FetcherError, fetcherPrivate } from "@/libs/fetcher";
import { getCurrentUser } from "@/services/session/server-actions";

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