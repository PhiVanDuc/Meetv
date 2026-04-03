import useCallRoom from "@/app/call/[id]/_hooks/use-room";

import { StreamTheme } from "@stream-io/video-react-sdk";
import CallPrepareRoom from "@/app/call/[id]/_components/prepare-room";
import CallMeetingRoom from "@/app/call/[id]/_components/meeting-room";
import CallEndedNotice from "@/app/call/[id]/_components/ended-notice";

import { Meeting } from "@/types/meeting";

interface Props {
    data: Meeting
}

export default function CallRoom({ data }: Props) {
    const { callStage, handleJoin, handleLeave } = useCallRoom();

    return (
        <StreamTheme className="h-full">
            { callStage === "prepare" && <CallPrepareRoom onJoin={handleJoin} /> }
            { callStage === "meeting" && <CallMeetingRoom data={data} onLeave={handleLeave} /> }
            { callStage === "ended" && <CallEndedNotice /> }
        </StreamTheme>
    )
}