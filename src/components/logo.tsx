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
            width={200}
            height={200}
            className={cn("w-[40px] h-auto select-none", className)}
            priority={true}
        />
    )
}