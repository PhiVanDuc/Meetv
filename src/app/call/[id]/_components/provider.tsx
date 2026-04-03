import useCallProvider from "@/app/call/[id]/_hooks/use-provider";

import CallSkeleton from "@/app/call/[id]/_components/skeleton";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";

import { Meeting } from "@/types/meeting";

import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props {
    data: Meeting,
    children: React.ReactNode,
    sessionUser?: SessionUser
}

export default function CallProvider({ children, data, sessionUser }: Props) {
    const { streamVideoClient, call } = useCallProvider({ data, sessionUser });

    if (!streamVideoClient || !call) return <CallSkeleton />

    return (
        <StreamVideo client={streamVideoClient}>
            <StreamCall call={call}>
                {children}
            </StreamCall>
        </StreamVideo>
    )
}