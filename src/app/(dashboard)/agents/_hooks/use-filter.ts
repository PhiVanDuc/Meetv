import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import generateQueryString from "@/utils/generate-query-string";
import { AgentFilterFields } from "@/app/(dashboard)/agents/_components/filter";

export default function useAgentFilter(propFilter: AgentFilterFields) {
    const router = useRouter();
    const pathname = usePathname();

    const [filter, setFilter] = useState({
        name: propFilter.name || ""
    });

    const [isShowRefreshButton, setIsShowRefreshButton] = useState(false);
        
    useEffect(() => {
        const debounce = setTimeout(() => {
            const isValid = Object.values(filter).some(value => value !== "");
            setIsShowRefreshButton(isValid);
        }, 500);

        return () => clearTimeout(debounce);
    }, [filter]);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(state => {
            return {
                ...state,
                name: e.target.value
            }
        });
    }

    const handleRedirect =  () => {
        const queryString = generateQueryString({ ...filter });

        const nextUrl = pathname + queryString;
        const currentUrl = pathname + window.location.search;

        if (currentUrl === nextUrl) return;
        router.push(nextUrl);
    }

    const handleKeyDownFilter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        handleRedirect();
    }

    const handleClickReset = () => {
        router.push(pathname);
        setFilter({ name: "" });
    };

    return { filter, setFilter, handleChangeName, handleKeyDownFilter, isShowRefreshButton, handleClickReset };
}
