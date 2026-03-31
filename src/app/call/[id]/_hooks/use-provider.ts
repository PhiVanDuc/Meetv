import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Meeting } from "@/types/meeting";
import { generateUserVideoToken } from "@/services/meetings/client-functions";
import { Call, CallingState, StreamVideoClient } from "@stream-io/video-react-sdk";

interface Parameters {
    data: Meeting,
    sessionUser?: SessionUser
}

export default function useCallProvider({ data, sessionUser }: Parameters) {
    const [call, setCall] = useState<Call>();
    const [userVideoToken, setUserVideoToken] = useState("");
    const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClient>();

    const mutation = useMutation({
        mutationFn: () => generateUserVideoToken(),
        onSuccess: ({ data }) => {
            if (data) setUserVideoToken(data.token);
        }
    });

    useEffect(() => {
        if (sessionUser && !userVideoToken) mutation.mutate();
    }, [sessionUser?.id, userVideoToken])

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY || !sessionUser || !userVideoToken) return;
        
        const _streamVideoClient = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
            user: {
                id: sessionUser.id,
                name: sessionUser.name
            },
            tokenProvider: async () => userVideoToken
        });

        setStreamVideoClient(_streamVideoClient);

        return () => {
            if (_streamVideoClient) _streamVideoClient.disconnectUser();
            setStreamVideoClient(undefined);
            setUserVideoToken("");
        };
    }, [sessionUser?.id, userVideoToken]);

    useEffect(() => {
        if (!streamVideoClient) return;

        const _call = streamVideoClient.call("default", data.id);
        _call.camera.disable();
        _call.microphone.disable();

        setCall(_call);

        return () => {
            if (_call.state.callingState !== CallingState.LEFT) {
                _call.leave();
                _call.endCall();
                setCall(undefined);
            }
        }
    }, [streamVideoClient, data.id]);

    return { streamVideoClient, call };
}