import { useState } from "react";
import { useCall } from "@stream-io/video-react-sdk";

export default function useCallRoom() {
    const call = useCall();
    const [callRoomType, setCallRoomType] = useState<"lobby" | "call" | "ended">("lobby");

    const handleJoin = async () => {
        if (!call) return;
        await call.join();

        setCallRoomType("call");
    }

    const handleLeave = async () => {
        if (!call) return;
        await call.leave();

        setCallRoomType("ended");
    }

    return { call, callRoomType, handleJoin, handleLeave }
}