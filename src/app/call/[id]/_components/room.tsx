import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import useCallRoom from "@/app/call/[id]/_hooks/use-room";

import { StreamTheme } from "@stream-io/video-react-sdk";
import CallSkeleton from "@/app/call/[id]/_components/skeleton";
import CallPrepareRoom from "@/app/call/[id]/_components/prepare-room";

import dynamic from "next/dynamic";
import { getMeeting } from "@/services/meetings/client-functions";

const CallMeetingRoom = dynamic(
    () => import("@/app/call/[id]/_components/meeting-room"),
    { ssr: false }
);

const CallEndedNotice = dynamic(
    () => import("@/app/call/[id]/_components/ended-notice"),
    { ssr: false }
);

export default function CallRoom() {
    const { id } = useParams();
    
    const { isPending, isError, data } = useQuery({
        queryKey: ["getMeeting", { id }],
        queryFn: () => getMeeting(id as string)
    });

    const { callStage, handleJoin, handleLeave } = useCallRoom();

    if (isPending) return <CallSkeleton />
    if (isError || !data?.data) return null;

    return (
        <StreamTheme>
            { callStage === "prepare" && <CallPrepareRoom onJoin={handleJoin} /> }
            { callStage === "meeting" && <CallMeetingRoom data={data.data} onLeave={handleLeave} /> }
            { callStage === "ended" && <CallEndedNotice /> }
        </StreamTheme>
    )
}