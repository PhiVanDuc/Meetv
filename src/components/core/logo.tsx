import Image from "next/image"
import { cn } from "@/libs/utils"

interface Props {
    className?: string,
    color?: "white" | "orange"
}

export default function Logo({ color = "orange", className }: Props) {
    return (
        <Image
            src={
                color === "white"
                    ? "/images/logo-meetv-white.png"
                    : "/images/logo-meetv-orange.png"
            }
            alt="Meetv Logo"
            width={200}
            height={200}
            priority={true}
            className={cn(
                "w-[200px] h-auto object-cover object-center",
                className
            )}
        />
    )
}
