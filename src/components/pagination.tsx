"use client"

import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";

import { cn } from "@/libs/utils";

export default function Pagination() {
    const isMobile = useIsMobile();

    return (
        <div
            className={cn(
                "flex justify-between gap-[10px]",
                isMobile ? "flex-col" : "flex-row items-center"
            )}
        >
            <p className="medium-desc">
                <span>Trang {" "}</span>
                <span className="text-brand-primary font-medium">01</span>
                <span>{" "} trong 20</span>
            </p>

            <div
                className={cn(
                    "flex gap-[5px]",
                    isMobile ? "w-full" : "w-fit"
                )}
            >
                <Button
                    variant="outline"
                    className={cn(isMobile ? "flex-1 w-full" : "w-fit")}
                >
                    Trang trước
                </Button>

                <Button
                    variant="outline"
                    className={cn(isMobile ? "flex-1 w-full" : "w-fit")}
                >
                    Trang tiếp
                </Button>
            </div>
        </div>
    )
}
