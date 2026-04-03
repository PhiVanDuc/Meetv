import Link from "next/link";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";

import ICONS from "@/consts/icons";

export default function CallEndedNotice() {
    return (
        <div className="flex-1 flex items-center justify-center p-[15px] md:p-[30px] bg-black overflow-y-auto">
            <div className="w-full max-w-[500px] space-y-[30px] p-[20px] text-center bg-white rounded-[10px]">
                <Header className="text-left">
                    <h1 className="text-[20px] font-semibold">Cuộc họp đã kết thúc</h1>
                    <p className="medium-desc">Bản tóm tắt cuộc họp sẽ được tổng hợp và xuất hiện trong ít phút nữa.</p>
                </Header>

                <Button
                    asChild
                    variant="brand"
                >
                    <Link href="/meetings">
                        <ICONS.MEETING />
                        <span>Danh sách cuộc họp</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
