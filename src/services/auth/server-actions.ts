"use server"

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { fetcherPublic } from "@/libs/fetcher";

export const sendOTP = async <RequestData>(data: RequestData) => {
    return await fetcherPublic.post<RequestData>({ pathname: "/auth/otp", body: data });
}

export const signUp = async <RequestData>(data: RequestData) => {
    return await fetcherPublic.post<RequestData>({ pathname: "/auth/users", body: data });
}

export const signIn = async <RequestData>(data: RequestData) => {
    return await fetcherPublic.post<RequestData, Session>({ pathname: "/auth/session", body: data });
}

export const forgotPassword = async <RequestData>(data: RequestData) => {
    return await fetcherPublic.patch<RequestData>({ pathname: "/auth/password/recovery", body: data });
}

export const signInGoogle = async <RequestData>(data: RequestData) => {
    return await fetcherPublic.post<RequestData, Session>({ pathname: "/oauth/google/session", body: data });
}

export const setSession = async (session: Session) => {
    const cookieStore = await cookies();

    cookieStore.set(
        "accessToken",
        session.accessToken,
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
        session.refreshToken,
        {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 14,
            secure: process.env.NODE_ENV === "production"
        }
    );
}

export const removeSession = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
}

export const getSessionToken = async (token: "accessToken" | "refreshToken") => {
    const cookieStore = await cookies();
    return cookieStore.get(token)?.value;
}

export const getSessionUser = async () => {
    const cookieStore = await cookies();

    try { return jwtDecode<SessionUser>(cookieStore.get("accessToken")?.value || ""); }
    catch(error) { return undefined; }
}