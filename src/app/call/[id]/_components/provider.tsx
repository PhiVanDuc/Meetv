import { useParams } from "next/navigation";
import useCallProvider from "@/app/call/[id]/_hooks/use-provider";
import useGetMeeting from "@/app/(dashboard)/meetings/_hooks/use-get-meeting";

import CallSkeleton from "@/app/call/[id]/_components/skeleton";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props {
    children: React.ReactNode
}

export default function CallProvider({ children }: Props) {
    const { id } = useParams();
    const { data, isPending } = useGetMeeting(id as string);
    const { streamVideoClient, call } = useCallProvider(data);

    if (isPending || !streamVideoClient || !call) return <CallSkeleton />
    if (!data) return null;

    return (
        <StreamVideo client={streamVideoClient}>
            <StreamCall call={call}>
                {children}
            </StreamCall>
        </StreamVideo>
    )
}