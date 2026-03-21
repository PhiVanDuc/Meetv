import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { schemaAgent } from "@/schemas/agent";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAgent } from "@/services/agents/client-functions";

export default function useAgentFormDialog(formType: FormType) {
    const queryClient = useQueryClient();

    const title = formType === "add"
        ? "Thêm agent"
        : "Cập nhật agent";

    const description = formType === "add"
        ? "Nhập đầy đủ thông tin để thêm agent tại đây."
        : "Chỉnh sửa thông tin để cập nhật agent tại đây.";

    const form = useForm({
        defaultValues: {
            name: "",
            instructions: ""
        },
        resolver: zodResolver(schemaAgent)
    });

    const mutation = useMutation({
        mutationFn: () => addAgent(form.getValues()),
        onSuccess: () => {
            form.reset();
            queryClient.invalidateQueries({ queryKey: ["getAgents"] });
        }
    });

    return { title, description, form, mutation }
}
