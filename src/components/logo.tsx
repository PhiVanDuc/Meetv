import Image from "next/image";

import { cn } from "@/libs/utils";

interface Props {
    className?: string,
    color?: "orange" | "white"
}

export default function Logo({ className, color }: Props) {
    return (
        <Image
            src={
                (!color || color === "orange")
                    ? "/images/logo-minimal-nest-orange.png"
                    : "/images/logo-minimal-nest-white.png"
            }
            alt="Logo Meetv"
            width={100}
            height={100}
            className={cn("w-[40px] h-auto select-none", className)}
            priority={true}
        />
    )
}