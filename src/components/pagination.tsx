"use client"

import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { cn } from "@/libs/utils";
import generateQueryString from "@/utils/generate-query-string";

const parseSafeInt = (string: string) => {
    const parsed = parseInt(string, 10);
    return isNaN(parsed) ? 1 : parsed;
};

export default function Pagination({ page: propPage, totalPages: propTotalPages }: Omit<Pagination, "limit">) {
    const router = useRouter();
    const isMobile = useIsMobile();
    const pathname = usePathname();

    const page = parseSafeInt(propPage);
    const totalPages = parseSafeInt(propTotalPages);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        
        const queryString = generateQueryString({ page: newPage });
        router.push(`${pathname}?${queryString}`);
    };

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
