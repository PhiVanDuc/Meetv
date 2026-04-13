import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import useCallProvider from "@/app/call/[id]/_hooks/use-provider";

import CallSkeleton from "@/app/call/[id]/_components/skeleton";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";

import { getMeeting } from "@/services/meetings/client-functions";

import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props {
    children: React.ReactNode
}

export default function CallProvider({ children }: Props) {
    const { id } = useParams();

    const { isPending, isError, data } = useQuery({
        queryKey: ["getMeeting", { id }],
        queryFn: () => getMeeting(id as string)
    });

    const { streamVideo, call } = useCallProvider(data?.data);

    if (isPending || !streamVideo || !call) return <CallSkeleton />
    if (isError || !data?.data) return null;

    return (
        <StreamVideo client={streamVideo}>
            <StreamCall call={call}>
                {children}
            </StreamCall>
        </StreamVideo>
    )
}