import Link from "next/link";
import Image from "next/image";

import { cn } from "@/libs/utils";

interface Props {
    className?: string
}

export default function Logo({ className }: Props) {
    return (
        <Link
            href="/"
            className="shrink-0 block"
        >
            <Image
                src="/images/logo-minimal-nest-orange.png"
                alt="Logo Meetv"
                width={100}
                height={100}
                className={cn("w-[40px] h-auto select-none", className)}
                priority={true}
            />
        </Link>
    )
}
