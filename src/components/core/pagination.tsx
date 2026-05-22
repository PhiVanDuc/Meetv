"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import usePagination from "@/hooks/use-pagination"

import { Button } from "@/components/ui/button"

import { cn } from "@/libs/utils"

export default function Pagination({totalPages}: Omit<Pagination, "page" | "limit">) {
    const isMobile = useIsMobile()
    const {currentPage, currentTotalPages, isPrev, isNext, handleNextPage, handlePrevPage} = usePagination(totalPages)

    return (
        <div
            className={cn(
                "flex flex-wrap justify-between",
                isMobile ? "flex-col gap-[10px]" : "flex-row items-center gap-[20px]"
            )}
        >
            <p className="desc">
                <span>Trang</span>
                {" "}
                <span className="text-orange-600 font-medium">{currentPage}</span>
                {" "}
                <span>trong {currentTotalPages}</span>
            </p>

            <div className="flex gap-[5px]">
                <Button
                    variant="outline"
                    disabled={!isPrev}
                    onClick={handlePrevPage}
                    className={cn(isMobile ? "flex-1 w-full" : "w-fit")}
                >
                    Trang trước
                </Button>

                <Button
                    variant="outline"
                    disabled={!isNext}
                    onClick={handleNextPage}
                    className={cn(isMobile ? "flex-1 w-full" : "w-fit")}
                >
                    Trang tiếp
                </Button>
            </div>
        </div>
    )
}