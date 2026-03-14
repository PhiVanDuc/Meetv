"use server"

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