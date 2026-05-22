import { cn } from "@/libs/utils"

interface Props {
    className?: string,
    children: React.ReactNode
}

export default function Header({ children, className }: Props) {
    return (
        <header
            className={cn(
                "space-y-[2px]",
                className
            )}
        >
            {children}
        </header>
    )
}
