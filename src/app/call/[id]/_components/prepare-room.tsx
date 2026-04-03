import useGetSessionUser from "@/hooks/use-get-session-user";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DefaultVideoPlaceholder, StreamVideoParticipant, ToggleAudioPreviewButton, ToggleVideoPreviewButton, VideoPreview } from "@stream-io/video-react-sdk";

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

const AllowBrowserPermissions = () => {
    return <p className="medium-desc">Vui lòng cấp cho trình duyệt của bạn quyền truy cập vào camera và microphone.</p>
}

export default function CallPrepareRoom({ onJoin }: Props) {
    const { useCameraState, useMicrophoneState } = useCallStateHooks();

    const { hasBrowserPermission: hasCameraPermission } = useCameraState();
    const { hasBrowserPermission: hasMicrophonePermission } = useMicrophoneState();

    const hasBrowserMediaPermission = hasCameraPermission && hasMicrophonePermission;

    return (
        <div className="flex-1 flex items-center justify-center p-[15px] md:p-[30px] bg-black overflow-y-auto">
            <div className="w-full max-w-[500px] space-y-[30px] p-[20px] text-center bg-white rounded-[10px]">
                <header className="space-y-[2px] text-left">
                    <h1 className="text-[20px] font-semibold">Chuẩn bị bắt đầu</h1>
                    <p className="medium-desc">Cài đặt quyền truy cập phần cứng trên trình duyệt để chuẩn bị bắt đầu cuộc họp.</p>
                </header>

                <div className="space-y-[20px]">
                    <VideoPreview
                        DisabledVideoPreview={
                            hasBrowserMediaPermission
                                ? DisabledVideoPreview
                                : AllowBrowserPermissions
                        }
                    />

                    {
                        hasBrowserMediaPermission
                            ? (
                                <div className="flex justify-center gap-[10px]">
                                    <ToggleAudioPreviewButton />
                                    <ToggleVideoPreviewButton />
                                </div>
                            )
                            : <AllowBrowserPermissions />
                    }

                    

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