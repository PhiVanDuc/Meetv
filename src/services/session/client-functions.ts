"use client"

import { fetcherPublic } from "@/libs/fetcher";
import { setSession, getSessionToken } from "@/services/session/server-actions";

import { type FetcherResponse, FetcherError } from "@/libs/fetcher";

let refreshSessionPromise: Promise<FetcherResponse<Session>> | undefined;

export const refreshSession = async () => {
    if (refreshSessionPromise) return refreshSessionPromise;

    refreshSessionPromise = (async () => {
        try {
            const refreshToken = await getSessionToken("refreshToken") || "";

            const responseData = await fetcherPublic.post<Omit<Session, "accessToken">, Session>({
                pathname: "/auth/session/refresh",
                body: { refreshToken }
            });

            if (!responseData.data?.accessToken || !responseData.data.refreshToken) throw new Error();

            setSession({
                accessToken: responseData.data.accessToken,
                refreshToken: responseData.data.refreshToken
            });

            return responseData;
        }
        catch(error) {
            throw new FetcherError({
                status: 401,
                message: "Phiên đăng nhập đã hết hạn."
            });
        }
        finally {
            refreshSessionPromise = undefined;
        }
    })();

    return refreshSessionPromise;
}