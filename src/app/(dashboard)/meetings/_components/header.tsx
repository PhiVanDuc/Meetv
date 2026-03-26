import Header from "@/components/header";
import MeetingAddButton from "./add-button";

export default function MeetingHeader() {
    return (
        <div className="flex flex-col md:flex-row gap-[15px] md:items-center justify-between">
            <Header>
                <h1 className="medium-header">Quản lý cuộc họp</h1>
                <p className="medium-desc">Theo dõi danh sách và thao tác với các cuộc họp của bạn.</p>
            </Header>

            <MeetingAddButton />
        </div>
    )
}