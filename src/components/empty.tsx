interface Props {
    title: string,
    description: string
}

export default function Empty({ title, description }: Props) {
    return (
        <div className="space-y-[60px]">
            <div className="flex flex-col gap-[5px] items-center w-full">
                <div className="flex justify-center w-full max-w-[320px]">
                    <span className="inline-block w-[80%] h-[20px] bg-zinc-100 border border-b-0 rounded-tl-[10px] rounded-tr-[10px]" />
                </div>

                <div className="flex items-stretch gap-[15px] p-[15px] w-full max-w-[320px] bg-white border rounded-[10px]">
                    <span className="shrink-0 inline-block size-[60px] bg-zinc-200 rounded-[10px]" />

                    <div className="self-stretch flex flex-col justify-between py-[5px] w-full">
                        <span className="inline-block w-full md:w-[50%] h-[8px] bg-brand-primary rounded-full" />
                        <span className="inline-block w-full h-[8px] bg-zinc-200 rounded-full" />
                        <span className="inline-block w-full h-[8px] bg-zinc-200 rounded-full" />
                    </div>
                </div>

                <div className="flex justify-center w-full max-w-[320px]">
                    <span className="inline-block w-[80%] h-[20px] bg-zinc-100 border border-t-0 rounded-bl-[10px] rounded-br-[10px]" />
                </div>
            </div>

            <div className="flex flex-col items-center gap-[15px]">
                <h3 className="medium-header text-[20px]">{title}</h3>
                <p className="w-full max-w-[600px] medium-desc text-center">{description}</p>
            </div>
        </div>
    )
}