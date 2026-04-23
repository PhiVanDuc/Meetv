import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Avatar from "boring-avatars";

import ICONS from "@/consts/icons";
import { schemaMeeting } from "@/schemas/meeting";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAgents } from "@/services/agents/client-functions";
import { getMeeting, addMeeting, updateMeeting } from "@/services/meetings/client-functions";

interface Parameters {
    id?: string,
    open: boolean,
    formType: FormType,
    onOpenChange: (open: boolean) => void
}

export default function useMeetingFormDialog({ open, onOpenChange, formType, id: paramId }: Parameters) {
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

    const queryMeeting = useQuery({
        queryFn: () => getMeeting(id),
        queryKey: ["getMeeting", { id }],
        enabled: formType === "update" && !!id
    });

    useEffect(() => {
        if (formType === "add" && open) form.reset();
        if (formType === "update" && queryMeeting.data?.data) {
            const { name, agent } = queryMeeting.data.data;
            form.reset({ name, agentId: agent.id });
        }
    }, [form, formType, open, queryMeeting.data]);
    
    const [agentsPage, setAgentsPage] = useState("1");
    const [searchAgentName, setSearchAgentName] = useState("");
    const [agentOptions, setAgentOptions] = useState<Option[]>([]);

    const queryAgents = useQuery({
        queryKey: ["getAgents", { page: agentsPage, filter: { name: searchAgentName } }],
        queryFn: () => getAgents({ page: agentsPage, filter: { name: searchAgentName } })
    });

    const paginationAgents = useMemo(() => ({
        page: agentsPage,
        totalPages: queryAgents.data?.data?.pagination?.totalPages ?? "1"
    }), [agentsPage, queryAgents.data?.data?.pagination?.totalPages]);

    useEffect(() => {
        if (queryAgents.isPending || !queryAgents.data?.data?.agents) return;
        const { agents } = queryAgents.data.data;

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
    }, [queryAgents.isPending, queryAgents.data]);

    const handleSearch = (value: string) => {
        if (value === searchAgentName) return;

        setAgentsPage("1");
        setAgentOptions([]);
        setSearchAgentName(value);
    }

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => {
            if (formType === "add") return addMeeting(form.getValues());
            return updateMeeting({ id, ...form.getValues() });
        },
        onSuccess: () => {
            onOpenChange(false);
            queryClient.invalidateQueries({ queryKey: ["getMeetings"] });

            if (formType === "add") {
                form.reset();
                queryClient.invalidateQueries({ queryKey: ["getUsage"] });
            }
            else queryClient.invalidateQueries({ queryKey: ["getMeeting", { id }] });
        }
    });

    return {
        form,
        title,
        mutation,
        IconButton,
        description,
        labelButton,
        agentOptions,
        handleSearch,
        setAgentsPage,
        paginationAgents,
        isAgentsPending: queryAgents.isPending,
    }
}