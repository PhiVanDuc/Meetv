"use client"

import { useIsMobile } from "@/hooks/use-mobile";
import usePagination from "@/hooks/use-pagination";

import { Button } from "@/components/ui/button";

import { cn } from "@/libs/utils";

type Props = Omit<Pagination, "limit" | "totalItems">

export default function Pagination({ page: propPage, totalPages: propTotalPages }: Props) {
    const isMobile = useIsMobile();
    const { page, totalPages, handlePageChange } = usePagination({ page: propPage, totalPages: propTotalPages });

    return (
        <div
            className={cn(
                "flex justify-between gap-[10px]",
                isMobile ? "flex-col" : "flex-row items-center"
            )}
        >
            <p className="medium-desc">
                <span>Trang {" "}</span>
                <span className="text-brand-primary font-medium">{page}</span>
                <span>{" "} trong {totalPages}</span>
            </p>

            <div
                className={cn(
                    "flex gap-[5px]",
                    isMobile ? "w-full" : "w-fit"
                )}
            >
                <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}
                    className={cn(isMobile ? "flex-1 w-full" : "w-fit")}
                >
                    Trang trước
                </Button>

                <Button
                    variant="outline"
                    disabled={page >= totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    className={cn(isMobile ? "flex-1 w-full" : "w-fit")}
                >
                    Trang tiếp
                </Button>
            </div>
        </div>
    )
}