"use server"

import { cookies } from "next/headers";
import { fetcherPublic } from "@/libs/fetcher";

export const sendOTP = async <RequestData>(data: RequestData) => {
    return await fetcherPublic.post<RequestData>({ pathname: "/auth/otp", body: data });
}

export const signUp = async <RequestData>(data: RequestData) => {
    return await fetcherPublic.post<RequestData>({ pathname: "/auth/users", body: data });
}

export const signIn = async <RequestData>(data: RequestData) => {
    return await fetcherPublic.post<RequestData, AuthTokens>({ pathname: "/auth/session", body: data });
}

export const forgotPassword = async <RequestData>(data: RequestData) => {
    return await fetcherPublic.patch<RequestData>({ pathname: "/auth/password/recovery", body: data });
}

export const signInGoogle = async <RequestData>(data: RequestData) => {
    return await fetcherPublic.post<RequestData, AuthTokens>({ pathname: "/oauth/google/session", body: data });
}

export const setAuthTokens = async (authTokens: AuthTokens) => {
    const cookieStore = await cookies();

    cookieStore.set(
        "accessToken",
        authTokens.accessToken,
        {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 14,
            secure: process.env.NODE_ENV === "production"
        }
    );

    cookieStore.set(
        "refreshToken",
        authTokens.refreshToken,
        {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 14,
            secure: process.env.NODE_ENV === "production"
        }
    );
}

export const removeAuthTokens = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
}

export const getAuthToken = async (token: "accessToken" | "refreshToken") => {
    const cookieStore = await cookies();
    return cookieStore.get(token)?.value;
}