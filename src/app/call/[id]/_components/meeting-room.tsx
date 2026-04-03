import Link from "next/link";
import Logo from "@/components/logo";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

import { Meeting } from "@/types/meeting";

interface Props {
    data: Meeting
    onLeave: () => void
}

export default function CallMeetingRoom({ data, onLeave }: Props) {
    return (
        <div className="flex-1 flex flex-col justify-between gap-[15px] p-[15px] md:p-[30px]">
            <div className="flex items-center gap-[15px] p-[16px] min-w-0 text-white bg-[#101213] rounded-full">
                <Link
                    href="/"
                    className="shrink-0"
                >
                    <Logo />
                </Link>

                <h4 className="font-medium capitalize line-clamp-1 white-space: nowrap wrap-break-word">{data.name}</h4>
            </div>

            <SpeakerLayout />
            <CallControls onLeave={onLeave} />
        </div>
    )
}