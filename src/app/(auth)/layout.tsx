import Logo from "@/components/logo";

interface Props {
    readonly children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <main className="grid place-items-center w-full h-dvh p-[20px] overflow-y-auto">
            <div className="w-full max-w-[450px] space-y-[40px]">
                <div className="w-full flex justify-center">
                    <Logo className="w-[50px]" />
                </div>

                {children}
            </div>
        </main>
    )
}
