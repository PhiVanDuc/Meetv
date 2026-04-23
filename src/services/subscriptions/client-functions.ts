"use client"

import { Usage } from "@/types/subscription";
import { fetcherPrivate } from "@/libs/fetcher";

export const getUsage = async () => {
    return await fetcherPrivate.get<Usage>({ pathname: "/subscriptions/usage" });
}