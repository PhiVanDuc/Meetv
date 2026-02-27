"use server"

import fetcher from "@/libs/fetcher";
import { cookies } from "next/headers";

import VERIFICATION_ACTIONS from "@/consts/verification-actions";

export const sendOTPSignUp = async <RequestData>(data: RequestData) => {
    const finalData = { ...data, action: VERIFICATION_ACTIONS.SIGN_UP };
    return await fetcher.post<RequestData, unknown>({ pathname: "/auth/otp", body: finalData });
}

export const signUp = async <RequestData>(data: RequestData) => {
    return await fetcher.post<RequestData, unknown>({ pathname: "/auth/users/accounts", body: data });
}

export const signIn = async <RequestData>(data: RequestData) => {
    return await fetcher.post<RequestData, AuthTokens>({ pathname: "/auth/sessions", body: data });
}

export const sendOTPResetPassword = async <RequestData>(data: RequestData) => {
    const finalData = { ...data, action: VERIFICATION_ACTIONS.RESET_PASSWORD };
    return await fetcher.post<RequestData, unknown>({ pathname: "/auth/otp", body: finalData });
}

export const resetPassword = async <RequestData>(data: RequestData) => {
    return await fetcher.patch<RequestData, unknown>({ pathname: "/auth/passwords", body: data });
}

export const googleSignIn = async <RequestData>(data: RequestData) => {
    return await fetcher.post<RequestData, AuthTokens>({ pathname: "/oauth/google/sessions", body: data });
}

export const setAuthTokens = async (data: AuthTokens) => {
    const parsedCookies = await cookies();
    
    const cookieOptions = {
        path: "/",
        httpOnly: true,
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production"
    };

    parsedCookies.set("access-token", data.accessToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7
    });

    parsedCookies.set("refresh-token", data.refreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7
    });
}

export const getAccessToken = async () => {
    const parsedCookies = await cookies();
    return parsedCookies.get("access-token")?.value || "";
}

export const getRefreshToken = async () => {
    const parsedCookies = await cookies();
    return parsedCookies.get("refresh-token")?.value || "";
}