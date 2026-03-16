export default function Header({ children }: { children: React.ReactNode }) {
    return (
        <header className="space-y-[2px]">
            {children}
        </header>
    )
}
