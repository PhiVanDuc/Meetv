"use client"

import { useQuery } from "@tanstack/react-query";
import { getSessionUser } from "@/services/auth/server-actions"

export default function useGetSessionUser() {
    const { isPending, data } = useQuery({
        queryKey: ["sessionUser"],
        queryFn: async () => getSessionUser(),
        staleTime: 0,
        retry: false
    });

    return { isPending, sessionUser: data };
}