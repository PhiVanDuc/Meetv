import Header from "@/components/header";
import { MeetingDetailHeaderSkeleton } from "@/app/(dashboard)/meetings/[id]/_components/skeleton";

interface Props {
    name: string,
    isPending: boolean
}

export default function MeetingDetailHeader({ isPending, name }: Props) {
    return (
        <Header>
            {
                isPending
                    ? <MeetingDetailHeaderSkeleton />
                    : <h1 className="medium-header">{name || "Lỗi hoặc cuộc họp không tồn tại"}</h1>
            }

            <p className="medium-desc">Tham gia hoặc rời cuộc họp. Xem lại tóm tắt, nội dung và video sau khi kết thúc.</p>
        </Header>
    )
}