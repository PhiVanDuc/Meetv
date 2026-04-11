import { useQuery } from "@tanstack/react-query";

import { getMeetingTranscript } from "@/services/meetings/client-functions";

export default function useGetMeetingTranscript(id: string) {
    const query = useQuery({
        queryFn: () => getMeetingTranscript(id),
        queryKey: ["getMeetingTranscript", { id }]
    });

    const { data, ...resResponse } = query.data ?? {};
    const isError = !query.isPending && query.isError;

    return {
        data,
        isError,
        error: query.error,
        response: resResponse,
        isPending: query.isPending
    }
}
