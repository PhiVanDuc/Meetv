import { cn } from "@/libs/utils";

interface Props {
    readonly children: React.ReactNode;
    className?: string;
}

export default function Header({ children, className }: Props) {
    return (
        <header className={cn("space-y-[2px]", className)}>
            {children}
        </header>
    )
}
