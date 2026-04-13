import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMeetingTranscript } from "@/services/meetings/client-functions";

export default function useMeetingDetailTranscript(id: string) {
    const [search, setSearch] = useState("");

    const { isPending, isError, data } = useQuery({
        queryFn: () => getMeetingTranscript(id),
        queryKey: ["getMeetingTranscript", { id }]
    });

    const filteredData = (data?.data?.transcript ?? []).filter(item => (
        item.text.toString().toLowerCase().includes(search.toLowerCase())
    ));

    return {
        search,
        isError,
        isPending,
        setSearch,
        filteredData
    }
}
