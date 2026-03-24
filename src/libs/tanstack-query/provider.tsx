"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/libs/tanstack-query";

interface Props {
    readonly children: React.ReactNode
}

export default function QueryProvider({ children }: Props) {
    const router = useRouter();
    const [client] = useState(queryClient(router));

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}