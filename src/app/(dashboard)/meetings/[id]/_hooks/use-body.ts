import { Meeting } from "@/types/meeting";
import MEETING_STATUSES from "@/consts/meeting-statuses";

interface Parameters {
    data?: Meeting,
    isPending: boolean
}

export default function useMeetingDetailBody({ data, isPending }: Parameters) {
    let emptyTitle = "";
    let emptyDescription = "";

    if (isPending) {
        emptyTitle = "Cuộc họp đang được tải";
        emptyDescription = "Dữ liệu của cuộc họp đang được tải, vui lòng đợi trong giây lát.";
    }
    else if (!data) {
        emptyTitle = "Không tìm thấy cuộc họp";
        emptyDescription = "Dữ liệu cuộc họp không tồn tại hoặc đã bị xóa.";
    }
    else {
        switch (data.status) {
            case MEETING_STATUSES.upcoming.value:
                emptyTitle = "Cuộc họp chưa bắt đầu";
                emptyDescription = "Sau khi bạn kết thúc cuộc họp, một bản tóm tắt sẽ được xuất hiện tại đây.";
                break;
            case MEETING_STATUSES.processing.value:
                emptyTitle = "Cuộc họp đã kết thúc";
                emptyDescription = "Cuộc họp đã kết thúc, một bản tóm tắt đang được tổng hợp và sẽ xuất hiện sớm.";
                break;
            default:
                emptyTitle = "";
                emptyDescription = "";
        }
    }

    return { emptyTitle, emptyDescription }
}
