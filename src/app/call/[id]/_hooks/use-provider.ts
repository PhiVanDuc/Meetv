import { useEffect, useState } from "react";
import useGetSessionUser from "@/hooks/use-get-session-user";

import { Meeting } from "@/types/meeting";
import { generateToken } from "@/services/stream/client-functions";
import { Call, StreamVideoClient } from "@stream-io/video-react-sdk";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export default function useCallProvider(data?: Meeting) {
    const [call, setCall] = useState<Call>();
    const { sessionUser } = useGetSessionUser();
    const [streamVideo, setStreamVideo] = useState<StreamVideoClient>();

    useEffect(() => {
        if (!STREAM_API_KEY || !sessionUser) return;
        
        const _streamVideo = new StreamVideoClient({
            apiKey: STREAM_API_KEY,
            user: {
                id: sessionUser.id,
                name: sessionUser.name
            },
            tokenProvider: async () => {
                const responseData = await generateToken();
                return responseData.data?.token || ""
            },
        });

        setStreamVideo(_streamVideo);

        return () => {
            setStreamVideo(undefined);
            if (_streamVideo) _streamVideo.disconnectUser();
        };
    }, [sessionUser?.id]);

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