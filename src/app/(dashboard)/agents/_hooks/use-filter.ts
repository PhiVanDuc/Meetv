import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { AgentFilterFields } from "@/types/agent";
import generateQueryString from "@/utils/generate-query-string";

export default function useAgentFilter(paramFilter: AgentFilterFields) {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpenRefreshButton, setIsOpenRefreshButton] = useState(false);

    const [filter, setFilter] = useState({
        name: paramFilter.name || ""
    });
        
    useEffect(() => {
        const debounce = setTimeout(() => {
            const isValid = Object.values(filter).some(value => value !== "");
            setIsOpenRefreshButton(isValid);
        }, 500);

        return () => clearTimeout(debounce);
    }, [filter]);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(state => ({
            ...state,
            name: e.target.value
        }));
    }

    const handleRedirect =  () => {
        const nextUrl = pathname + generateQueryString({ ...filter });
        const currentUrl = pathname + window.location.search;
        if (currentUrl !== nextUrl) router.push(nextUrl);
    }

    const handleKeyDownFilter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        handleRedirect();
    }

    const handleClickReset = () => {
        router.push(pathname);
        setFilter({ name: "" });
    };

    return { filter, handleChangeName, handleKeyDownFilter, isOpenRefreshButton, handleClickReset };
}
