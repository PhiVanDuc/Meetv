import { useRouter, usePathname, useSearchParams } from "next/navigation"

import generateQueryString from "@/utils/generate-query-string"

export default function usePagination(totalPages?: string) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentTotalPages = Math.max(1, Number(totalPages) || 1)
    const currentPage = Math.max(1, Number(searchParams.get("page")) || 1)

    const isPrev = currentPage > 1
    const isNext = currentPage < currentTotalPages

    const handlePagination = (page: number) => {
        const currentParams = Object.fromEntries(searchParams.entries())
        const queryString = generateQueryString({...currentParams, page})
        router.push(`${pathname}${queryString}`)
    }

    const handleNextPage = () => {
        if (isNext) handlePagination(currentPage + 1)
    }

    const handlePrevPage = () => {
        if (isPrev) handlePagination(currentPage - 1)
    }

    return {currentPage, currentTotalPages, isPrev, isNext, handleNextPage, handlePrevPage}
}