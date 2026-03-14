"use server"

import { fetcherPublic } from "@/libs/fetcher";

export const signInGoogle = async <RequestData>(data: RequestData) => {
    return await fetcherPublic.post<RequestData, Session>({ pathname: "/oauth/google/session", body: data });
}