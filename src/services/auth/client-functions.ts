"use client"

import { fetcherPublic } from "@/libs/fetcher";
import { FetcherResponse, FetcherError } from "@/libs/fetcher";
import { setAuthTokens, getAuthToken } from "@/services/auth/server-actions";

let refreshSessionPromise: Promise<FetcherResponse<AuthTokens>> | undefined;

export const refreshSession = async () => {
    if (refreshSessionPromise) return refreshSessionPromise;

    refreshSessionPromise = (async () => {
        try {
            const refreshToken = await getAuthToken("refreshToken") || "";
            const responseData = await fetcherPublic.post<Omit<AuthTokens, "accessToken">, AuthTokens>({
                pathname: "/auth/session/refresh",
                body: { refreshToken }
            });

            if (!responseData.data?.accessToken || !responseData.data?.refreshToken) throw new Error();

            setAuthTokens({
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
        finally { refreshSessionPromise = undefined; }
    })();

    return refreshSessionPromise;
}