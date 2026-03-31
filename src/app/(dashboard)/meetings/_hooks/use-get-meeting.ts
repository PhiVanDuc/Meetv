import { useQuery } from "@tanstack/react-query";

import { getMeeting } from "@/services/meetings/client-functions";

export default function useGetMeeting(id: string) {
    const query = useQuery({
        queryFn: () => getMeeting(id),
        queryKey: ["getMeeting", { id }]
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