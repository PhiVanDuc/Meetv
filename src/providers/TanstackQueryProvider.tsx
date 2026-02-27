"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { QueryClientProvider } from "@tanstack/react-query";
import globalQueryClient from "@/libs/tanstack-query/global-query-client";

interface Props {
    readonly children: React.ReactNode
}

export default function TanstackQueryProvider({ children }: Props) {
    const router = useRouter();
    const [queryClient] = useState(globalQueryClient(router));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
