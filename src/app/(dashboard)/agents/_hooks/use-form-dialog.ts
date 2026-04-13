import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { schemaAgent } from "@/schemas/agent";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAgent, addAgent, updateAgent } from "@/services/agents/client-functions";

import ICONS from "@/consts/icons";

interface Parameters {
    id?: string,
    open: boolean,
    formType: FormType,
    onOpenChange: (open: boolean) => void
}

export default function useAgentFormDialog({ open, onOpenChange, formType, id: paramId }: Parameters) {
    const id = paramId ? paramId : "";

    const title = formType === "add"
        ? "Thêm agent"
        : "Cập nhật agent";

    const description = formType === "add"
        ? "Nhập đầy đủ thông tin để thêm agent tại đây."
        : "Chỉnh sửa thông tin để cập nhật agent tại đây.";

    const IconButton = formType === "add"
        ? ICONS.ADD
        : ICONS.UPDATE;

    const labelButton = formType === "add"
        ? "Thêm agent"
        : "Cập nhật agent";

    const form = useForm({
        resolver: zodResolver(schemaAgent),
        defaultValues: {
            name: "",
            instructions: ""
        }
    });

    const queryAgent = useQuery({
        queryFn: () => getAgent(id),
        queryKey: ["getAgent", { id }],
        enabled: formType === "update" && !!id
    });

    useEffect(() => {
        if (formType === "add" && open) form.reset();
        if (formType === "update" && queryAgent.data?.data) {
            const { name, instructions } = queryAgent.data.data;
            form.reset({ name, instructions });
        }
    }, [formType, open, form, queryAgent.data]);

    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: () => {
            if (formType === "add") return addAgent(form.getValues());
            return updateAgent({ id, ...form.getValues() });
        },
        onSuccess: () => {
            if (formType === "add") form.reset();
            else {
                queryClient.invalidateQueries({ queryKey: ["getMeeting"] });
                queryClient.invalidateQueries({ queryKey: ["getMeetings"] });
                queryClient.invalidateQueries({ queryKey: ["getAgent", { id }] });
            }
            
            onOpenChange(false);
            queryClient.invalidateQueries({ queryKey: ["getAgents"] });
        }
    });

    return {
        form,
        title,
        mutation,
        IconButton,
        description,
        labelButton,
        isQueryAgentPending: formType === "update" && queryAgent.isPending
    }
}