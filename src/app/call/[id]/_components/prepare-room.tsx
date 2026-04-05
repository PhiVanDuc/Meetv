import useGetSessionUser from "@/hooks/use-get-session-user";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DefaultVideoPlaceholder, StreamVideoParticipant, VideoPreview, ToggleAudioPreviewButton, ToggleVideoPreviewButton } from "@stream-io/video-react-sdk";

import ICONS from "@/consts/icons";
import boringAvatarsUrl from "@/utils/boring-avatars-url";

interface Props {
    onJoin: () => void
}

const DisabledVideoPreview = () => {
    const { sessionUser } = useGetSessionUser();

    return (
        <DefaultVideoPlaceholder
            participant={{
                name: sessionUser?.name || "",
                userId: sessionUser?.id || "guest",
                image: boringAvatarsUrl({ name: sessionUser?.name })
            } as StreamVideoParticipant}
        />
    )
}

export default function CallPrepareRoom({ onJoin }: Props) {
    return (
        <div className="flex-1 flex items-center justify-center p-[15px] md:p-[30px] bg-black overflow-y-auto">
            <div className="w-full max-w-[500px] space-y-[30px] p-[20px] text-center bg-white rounded-[10px]">
                <header className="space-y-[2px] text-left">
                    <h1 className="text-[20px] font-semibold">Chuẩn bị bắt đầu</h1>
                    <p className="text-sm text-gray-500">Cài đặt thiết bị của bạn bên dưới.</p>
                </header>

                <div className="space-y-[20px]">
                    <VideoPreview
                        DisabledVideoPreview={DisabledVideoPreview}
                        NoCameraPreview={DisabledVideoPreview}
                    />

                    <div className="flex justify-center gap-[10px]">
                        <ToggleAudioPreviewButton />
                        <ToggleVideoPreviewButton />
                    </div>

                    <div className="flex justify-between gap-[5px] text-right">
                        <Button
                            asChild
                            variant="outline"
                        >
                            <Link href="/meetings">
                                <ICONS.LOG_OUT />
                                <span>Thoát</span>
                            </Link>
                        </Button>

                        <Button
                            variant="brand"
                            onClick={onJoin}
                        >
                            <ICONS.MEETING />
                            <span>Bắt đầu</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}