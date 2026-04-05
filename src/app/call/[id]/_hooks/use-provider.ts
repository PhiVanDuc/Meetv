import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useGetSessionUser from "@/hooks/use-get-session-user";

import { Meeting } from "@/types/meeting";
import { generateToken } from "@/services/stream/client-functions";
import { Call, StreamVideoClient } from "@stream-io/video-react-sdk";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export default function useCallProvider(data?: Meeting) {
    const [call, setCall] = useState<Call>();
    const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClient>();

    const [token, setToken] = useState("");
    const { sessionUser } = useGetSessionUser();

    const mutation = useMutation({
        mutationFn: () => generateToken(),
        onSuccess: ({ data }) => {
            if (data) setToken(data.token);
        }
    });

    useEffect(() => {
        if (sessionUser && !token) mutation.mutate();
    }, [sessionUser?.id, token]);

    useEffect(() => {
        if (!STREAM_API_KEY || !sessionUser || !token) return;
        
        const _streamVideoClient = new StreamVideoClient({
            apiKey: STREAM_API_KEY,
            user: {
                id: sessionUser.id,
                name: sessionUser.name
            },
            tokenProvider: async () => token
        });

        setStreamVideoClient(_streamVideoClient);

        return () => {
            setToken("");
            setStreamVideoClient(undefined);
            if (_streamVideoClient) _streamVideoClient.disconnectUser();
        };
    }, [sessionUser?.id, token]);

    useEffect(() => {
        if (!streamVideoClient || !data) return;

        const _call = streamVideoClient.call("default", data.id);
        setCall(_call);

        return () => {
            _call.endCall();
            setCall(undefined);
        }
    }, [streamVideoClient, data?.id]);

    return { streamVideoClient, call };
}