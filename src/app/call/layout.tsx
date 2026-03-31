interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <main className="h-screen bg-black">
            {children}
        </main>
    )
}
