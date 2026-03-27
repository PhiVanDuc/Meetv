import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

import { MeetingFilterFields } from "@/types/meeting";
import MEETING_STATUSES from "@/consts/meeting-statuses";
import generateQueryString from "@/utils/generate-query-string";

export default function useMeetingFilter(paramFilter: MeetingFilterFields) {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpenRefreshButton, setIsOpenRefreshButton] = useState(false);

    const [filter, setFilter] = useState({
        name: paramFilter.name || "",
        status: paramFilter.status || ""
    });

    useEffect(() => {
        const debounce = setTimeout(() => {
            const isValid = Object.values(filter).some(value => value !== "");
            setIsOpenRefreshButton(isValid);
        }, 300);

        return () => clearTimeout(debounce);
    }, [filter]);

    const meetingStatusOptions = useMemo(() => {
        return Object.entries(MEETING_STATUSES).map(status => ({
            id: status[0],
            value: status[0],
            children: <p>{status[1].label}</p>
        }))
    }, []);

    const handleRedirect =  (priorityFilter?: MeetingFilterFields) => {
        const nextUrl = pathname + generateQueryString({ ...(priorityFilter ? priorityFilter : filter) });
        const currentUrl = pathname + window.location.search;
        if (currentUrl !== nextUrl) router.push(nextUrl);
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(state => ({
            ...state,
            name: e.target.value
        }));
    }

    const handleKeyDownName = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        handleRedirect();
    }

    const handleSelectStatus = (value: string) => {
        setFilter(state => ({
            ...state,
            status: value
        }));

        handleRedirect({ ...filter, status: value as keyof typeof MEETING_STATUSES })
    }

    const handleClickReset = () => {
        router.push(pathname);
        setFilter({ name: "", status: "" });
    };

    return { filter, meetingStatusOptions, handleChangeName, handleKeyDownName, handleSelectStatus, handleClickReset, isOpenRefreshButton }
}