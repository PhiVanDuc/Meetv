import { useQuery } from "@tanstack/react-query";

import { MeetingFilterFields } from "@/types/meeting";
import { getMeetings } from "@/services/meetings/client-functions";

type Parameters =
    Omit<Pagination, "totalPages">
    & { filter: MeetingFilterFields }

export default function useGetMeetings({ page, limit, filter }: Parameters) {
    const query = useQuery({
        queryKey: ["getMeetings", { page, limit, filter }],
        queryFn: () => getMeetings({ page, limit, filter })
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