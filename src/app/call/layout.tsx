interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <main className="flex flex-col w-full h-screen bg-black">
            {children}
        </main>
    )
}
