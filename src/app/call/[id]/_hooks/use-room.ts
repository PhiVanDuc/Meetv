import { useQueryClient } from "@tanstack/react-query";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

import { CallingState } from "@stream-io/video-react-sdk";

export default function useCallRoom() {
    const call = useCall();
    const queryClient = useQueryClient();

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    const callStage = callingState === CallingState.JOINED
        ? "meeting"
        : callingState === CallingState.LEFT
            ? "ended"
            : "prepare";

    const handleJoin = async () => await call?.join().catch(error => error);
    const handleLeave = async () => {
        await call?.endCall().catch(error => error);
        queryClient.invalidateQueries({ queryKey: ["getMeeting"] });
        queryClient.invalidateQueries({ queryKey: ["getMeetings"] });
    }

    return { callStage, handleJoin, handleLeave }
}