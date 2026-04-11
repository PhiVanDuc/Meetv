import { useState } from "react";
import useGetMeetingTranscript from "@/app/(dashboard)/meetings/[id]/_hooks/use-get-meeting-transcript";

import Avatar from "boring-avatars";
import { Input } from "@/components/ui/input";
import Highlighter from "react-highlight-words";

import { format } from "date-fns";
import ICONS from "@/consts/icons";

interface Props {
    id: string
}

export default function MeetingDetailTranscript({ id }: Props) {
    const [search, setSearch] = useState("");
    const { data } = useGetMeetingTranscript(id);

    const filteredData = (data?.transcript ?? []).filter(item => (
        item.text.toString().toLowerCase().includes(search.toLowerCase())
    ));

    return (
        <div className="space-y-[20px] p-[20px] rounded-[10px] border">
            <div className="relative">
                <Input
                    value={search}
                    className="pl-7 w-[240px]"
                    placeholder="Tìm kiếm cuộc hội thoại . . ."
                    onChange={e => setSearch(e.target.value)}
                />

                <ICONS.SEARCH className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>

            <div className="space-y-[10px]">
                {
                    filteredData.map(item => (
                        <div
                            key={item.start_ts}
                            className="flex flex-col gap-y-[8px] hover:bg-muted p-[15px] rounded-md border"
                        >
                            <div className="flex gap-x-2 items-center">
                                <Avatar
                                    name={item.user.name}
                                    size={40}
                                />

                                <p className="text-sm font-medium">{item.user.name}</p>

                                <p className="text-sm text-blue-500 font-medium">
                                    {
                                        format(
                                            new Date(0, 0, 0, 0, 0, 0, item.start_ts),
                                            "mm:ss"
                                        )
                                    }
                                </p>
                            </div>

                            <Highlighter
                                autoEscape={true}
                                searchWords={[search]}
                                textToHighlight={item.text}
                                highlightClassName="bg-yellow-200"
                                className="text-sm text-neutral-700"
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}