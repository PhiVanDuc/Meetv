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
        if (query.data) {
            const { agents } = query.data;

            if (agents && agents.length) {
                setAgentOptions(state => {
                    const agentOptionMap = new Map(state.map(agentOption => [agentOption.id, agentOption]));

                    agents.forEach(agent => {
                        agentOptionMap.set(agent.id, {
                            id: agent.id,
                            value: agent.id,
                            children: (
                                <div className="flex items-center gap-[10px]">
                                    <Avatar
                                        name={agent.name}
                                        className="size-[20px]"
                                    />

                                    {agent.name}
                                </div>
                            )
                        })
                    });

                    return Array.from(agentOptionMap.values())
                });
            }
        }
    }, [query.data]);

    const handleSearch = (value: string) => {
        if (value === searchAgentName) return;

        setAgentPage("1");
        setAgentOptions([]);
        setSearchAgentName(value);
    }
    // Kết thúc

    return { title, description, IconButton, labelButton, form, agentOptions, agentIsPending: query.isPending, handleSearch, agentPagination, setAgentPage }
}