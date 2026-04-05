import { useParams } from "next/navigation";
import useCallRoom from "@/app/call/[id]/_hooks/use-room";
import useGetMeeting from "@/app/(dashboard)/meetings/_hooks/use-get-meeting";

import { StreamTheme } from "@stream-io/video-react-sdk";
import CallSkeleton from "@/app/call/[id]/_components/skeleton";
import CallPrepareRoom from "@/app/call/[id]/_components/prepare-room";
import CallMeetingRoom from "@/app/call/[id]/_components/meeting-room";
import CallEndedNotice from "@/app/call/[id]/_components/ended-notice";

export default function CallRoom() {
    const { id } = useParams();
    const { data, isPending } = useGetMeeting(id as string);
    const { callStage, handleJoin, handleLeave } = useCallRoom();

    if (isPending) return <CallSkeleton />
    if (!data) return null;

    return (
        <StreamTheme className="h-full">
            { callStage === "prepare" && <CallPrepareRoom onJoin={handleJoin} /> }
            { callStage === "meeting" && <CallMeetingRoom data={data} onLeave={handleLeave} /> }
            { callStage === "ended" && <CallEndedNotice /> }
        </StreamTheme>
    )
}