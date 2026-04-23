import useAuth from "@/hooks/use-auth";
import { useEffect, useState } from "react";

import { Meeting } from "@/types/meeting";
import { Call, StreamVideoClient } from "@stream-io/video-react-sdk";
import { generateStreamToken } from "@/services/meetings/client-functions";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export default function useCallProvider(data?: Meeting) {
    const { profile } = useAuth();
    const [call, setCall] = useState<Call>();
    const [streamVideo, setStreamVideo] = useState<StreamVideoClient>();

    useEffect(() => {
        if (!STREAM_API_KEY || !profile) return;
        
        const _streamVideo = new StreamVideoClient({
            apiKey: STREAM_API_KEY,
            user: {
                id: profile.id,
                name: profile.name
            },
            tokenProvider: async () => {
                const responseData = await generateStreamToken();
                return responseData.data?.token || ""
            },
        });

        setStreamVideo(_streamVideo);

        return () => {
            setStreamVideo(undefined);
            if (_streamVideo) _streamVideo.disconnectUser();
        };
    }, [profile?.id]);

    useEffect(() => {
        if (!streamVideo || !data) return;

        const _call = streamVideo.call("default", data.id);
        _call.camera.disable().catch(error => error);
        _call.microphone.disable().catch(error => error);

        setCall(_call);

        return () => {
            setCall(undefined);

            if (_call) {
                _call.endCall().catch(error => error);
                _call.leave().catch(error => error);
            }

        }
    }, [streamVideo, data?.id]);

    return { streamVideo, call };
}