"use server"

import http from "@/libs/http"
import { cookies } from "next/headers"

export const sendOtp = async <Data>(data: Data) => {
    return await http.post({ pathname: "/auth/otp", body: data })
}

export const signUp = async <Data>(data: Data) => {
    return await http.post({ pathname: "/auth/users", body: data })
}

export const signIn = async <Data>(data: Data) => {
    return await http.post<AuthTokens>({ pathname: "/auth/session", body: data })
}

export const forgotPassword = async <Data>(data: Data) => {
    return await http.patch({ pathname: "/auth/password/recovery", body: data })
}

export const signInGoogle = async <Data>(data: Data) => {
    return await http.post<AuthTokens>({ pathname: "/oauth/google/session", body: data })
}

export const getAuthToken = async (authToken: "accessToken" | "refreshToken") => {
    const cookieStore = await cookies()
    return cookieStore.get(authToken)?.value || ""
}

export const setAuthTokens = async (authTokens: AuthTokens) => {
    const cookieStore = await cookies()

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
    )

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
    )
}

export const removeAuthTokens = async () => {
    const cookieStore = await cookies()

    cookieStore.delete("accessToken")
    cookieStore.delete("refreshToken")
}