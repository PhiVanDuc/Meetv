import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { schemaAgent } from "@/schemas/agent";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAgent, getAgent, updateAgent } from "@/services/agents/client-functions";

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

    const query = useQuery({
        queryFn: () => getAgent(id),
        queryKey: ["getAgent", { id }],
        enabled: formType === "update" && !!id, 
    });

    useEffect(() => {
        if (formType === "add" && open) form.reset();
        if (formType === "update" && query.data?.data) {
            const { name, instructions } = query.data.data;
            form.reset({ name, instructions });
        }
    }, [form, formType, open, query.data]);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => {
            if (formType === "add") return addAgent(form.getValues());
            return updateAgent({ id, ...form.getValues() });
        },
        onSuccess: () => {
            if (formType === "add") form.reset();
            else {
                queryClient.invalidateQueries({ queryKey: ["getMeetings"] });
                queryClient.invalidateQueries({ queryKey: ["getAgent", { id }] });
            }
            
            onOpenChange(false);
            queryClient.invalidateQueries({ queryKey: ["getAgents"] });
        }
    });

    const isPendingInitialData = formType === "update" && query.isLoading;

    return { title, description, IconButton, labelButton, form, isPendingInitialData, mutation }
}