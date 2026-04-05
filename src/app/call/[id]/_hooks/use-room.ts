import { useEffect, useState } from "react";
import { useCall } from "@stream-io/video-react-sdk";

import { CallingState } from "@stream-io/video-react-sdk";

export default function useCallRoom() {
    const call = useCall();
    const [callStage, setCallStage] = useState<"prepare" | "meeting" | "ended">("prepare");

    useEffect(() => {
        if (!call) return;

        const subscription = call.state.callingState$.subscribe((state) => {
            if (state === CallingState.JOINED) setCallStage("meeting");
            else if (state === CallingState.LEFT) setCallStage("ended");
        });

        const unsubscribe = call.on("call.ended", () => setCallStage("ended"));

        return () => {
            unsubscribe();
            subscription.unsubscribe();
        }
    }, [call]);

    const handleJoin = async () => await call?.join();
    const handleLeave = async () => await call?.endCall();

    return { callStage, handleJoin, handleLeave }
}