import { fetcherPrivate } from "@/libs/fetcher";

export const generateToken = async () => {
    return await fetcherPrivate.post<unknown, { token: string }>({ pathname: "/stream/token" });
}