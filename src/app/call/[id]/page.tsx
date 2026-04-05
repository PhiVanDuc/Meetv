"use client"

import CallRoom from "@/app/call/[id]/_components/room";
import CallProvider from "@/app/call/[id]/_components/provider";

export default function Page() {
    return (
        <CallProvider>
            <CallRoom />
        </CallProvider>
    )
}