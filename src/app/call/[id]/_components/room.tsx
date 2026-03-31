import useCallRoom from "@/app/call/[id]/_hooks/use-room";

import { StreamTheme } from "@stream-io/video-react-sdk";

import { Meeting } from "@/types/meeting";

interface Props {
    data: Meeting
}

export default function CallRoom({ data }: Props) {
    const { call, callRoomType, handleJoin, handleLeave } = useCallRoom();

    return (
        <StreamTheme classID="h-full">
            { callRoomType === "lobby" && <p>Lobby</p> }
            { callRoomType === "call" && <p>Call</p> }
            { callRoomType === "ended" && <p>Ended</p> }
        </StreamTheme>
    )
}