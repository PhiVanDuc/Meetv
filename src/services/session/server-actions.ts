"use server"

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

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

export const getSessionToken = async (token: "accessToken" | "refreshToken") => {
    const cookieStore = await cookies();
    return cookieStore.get(token)?.value;
}

export const clearSession = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
}

export const getCurrentUser = async () => {
    const cookieStore = await cookies();

    try {
        return jwtDecode(cookieStore.get("accessToken")?.value || "");
    }
    catch(error) {
        console.log(error);
        return undefined;
    }
}