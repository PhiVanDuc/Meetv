import { useState } from "react";
import { useCall } from "@stream-io/video-react-sdk";

export default function useCallRoom() {
    const call = useCall();
    const [callStage, setCallStage] = useState<"prepare" | "meeting" | "ended">("prepare");

    const handleJoin = async () => {
        if (!call) return;
        await call.join();
        setCallStage("meeting");
    }

    const handleLeave = async () => {
        if (!call) return;
        await call.endCall();
        setCallStage("ended");
    }

    return { callStage, handleJoin, handleLeave }
}