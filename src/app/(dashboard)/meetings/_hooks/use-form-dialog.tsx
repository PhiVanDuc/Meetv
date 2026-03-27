import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import useGetAgents from "@/app/(dashboard)/agents/_hooks/use-get-agents";

import Avatar from "boring-avatars";

import ICONS from "@/consts/icons";
import { schemaMeeting } from "@/schemas/meeting";
import { zodResolver } from "@hookform/resolvers/zod";

interface Parameters {
    id?: string,
    open: boolean,
    formType: FormType,
    onOpenChange: (open: boolean) => void
}

export default function useMeetingFormDialog({ open, onOpenChange, formType, id: paramId }: Parameters) {
    // Thông tin khởi tạo
    const id = paramId ? paramId : "";

    const title = formType === "add"
        ? "Thêm cuộc họp"
        : "Cập nhật cuộc họp";

    const description = formType === "add"
        ? "Nhập đầy đủ thông tin để thêm cuộc họp tại đây."
        : "Chỉnh sửa thông tin để cập nhật cuộc họp tại đây.";

    const IconButton = formType === "add"
        ? ICONS.ADD
        : ICONS.UPDATE;

    const labelButton = formType === "add"
        ? "Thêm cuộc họp"
        : "Cập nhật cuộc họp";

    const form = useForm({
        resolver: zodResolver(schemaMeeting),
        defaultValues: {
            name: "",
            agentId: ""
        }
    });
    // Kết thúc

    // Danh sách agents
    const [agentPage, setAgentPage] = useState("1");
    const [searchAgentName, setSearchAgentName] = useState("");
    const [agentOptions, setAgentOptions] = useState<Option[]>([]);

    const query = useGetAgents({
        page: agentPage,
        filter: { name: searchAgentName }
    });

    const agentPagination = useMemo(() => ({
        page: agentPage,
        totalPages: query.data?.pagination?.totalPages || "1"
    }), [agentPage, query.data?.pagination?.totalPages]);

    useEffect(() => {
        if (!query.isPending && query.data?.agents && query.data.agents.length) {
            const { agents } = query.data;

            setAgentOptions(state => {
                const agentOptionMap = new Map(state.map(agentOption => [agentOption.id, agentOption]));

                agents.forEach(agent => {
                    agentOptionMap.set(agent.id, {
                        id: agent.id,
                        value: agent.id,
                        children: (
                            <div className="flex-1 flex items-center gap-[10px] min-w-0">
                                <Avatar
                                    name={agent.name}
                                    className="shrink-0 size-[20px]"
                                />

                                <p className="flex-1 text-left truncate">{agent.name}</p>
                            </div>
                        )
                    })
                });

                return Array.from(agentOptionMap.values())
            });
        }
    }, [query.isPending, query.data]);

    const handleSearch = (value: string) => {
        if (value === searchAgentName) return;

        setAgentPage("1");
        setAgentOptions([]);
        setSearchAgentName(value);
    }
    // Kết thúc

    return { title, description, IconButton, labelButton, form, agentOptions, agentIsPending: query.isPending, handleSearch, agentPagination, setAgentPage }
}