import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { schemaAgent } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAgent } from "@/services/agents/client-functions";

interface Parameters {
    formType: FormType
}

export default function useAgentFormDialog({ formType }: Parameters) {
    const title = formType === "add"
        ? "Thêm Agent"
        : "Cập nhật Agent";

    const description = formType === "add"
        ? "Nhập đầy đủ thông tin để thêm Agent tại đây."
        : "Chỉnh sửa thông tin để cập nhật Agent tại đây.";

    const form = useForm({
        defaultValues: {
            name: "",
            instructions: ""
        },
        resolver: zodResolver(schemaAgent)
    });

    const mutation = useMutation({
        mutationFn: () => addAgent(form.getValues()),
        onSuccess: () => form.reset()
    });

    return { title, description, form, mutation }
}
