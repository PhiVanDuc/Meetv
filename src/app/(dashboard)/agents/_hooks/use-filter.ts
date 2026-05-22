import { useDebounce } from "use-debounce"
import { useState, useEffect, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"

import { IAgentFilter } from "@/types/agent"
import generateQueryString from "@/utils/generate-query-string"

export default function useAgentFilter(filter?: IAgentFilter) {
    const router = useRouter()
    const pathname = usePathname()

    const [currentFilter, setCurrentFilter] = useState({name: filter?.name ?? ""})
    const [debounceFilter] = useDebounce(currentFilter, 500)
    
    useEffect(() => {
        setCurrentFilter({name: filter?.name ?? ""})
    }, [filter?.name])

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentFilter(state => ({...state, name: e.target.value}))
    }

    const handleFilter = () => {
        const queryString = generateQueryString({name: currentFilter.name.trim()})
        const url = queryString ? `${pathname}${queryString}` : pathname
        router.push(url)
    }

    const handleRefreshFilter = () => {
        const queryString = generateQueryString({name: ""})
        const url = queryString ? `${pathname}${queryString}` : pathname

        setCurrentFilter({name: ""})
        router.push(url)
    }

    const handleEnterSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleFilter()
    }

    const isAppearRefreshButton = useMemo(() => {
        return Object.values(debounceFilter).some(value => value !== "")
    }, [debounceFilter])

    return {currentFilter, handleChangeName, handleRefreshFilter, handleEnterSearchInput, isAppearRefreshButton}
}