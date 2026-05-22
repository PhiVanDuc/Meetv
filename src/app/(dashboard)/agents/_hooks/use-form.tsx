import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { z } from "zod"
import ICONS from "@/consts/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { addAgent, getAgent, updateAgent } from "@/services/agents/client"

interface Parameters {
    agentId?: string,
    action: FormAction
}

const formSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { error: "Tên agent không thể để trống." }),
    instructions: z
        .string()
        .trim()
        .min(1, { error: "Chỉ dẫn agent không thể để trống." })
})

export default function useAgentForm({action, agentId}: Parameters) {
    const title = action === "add"
        ? "Thêm agent"
        : "Cập nhật agent"

    const description = action === "add"
        ? "Nhập đầy đủ thông tin để thêm agent tại đây."
        : "Chỉnh sửa thông tin để cập nhật agent tại đây."

    const button = {
        icon: action === "add" ? <ICONS.ADD /> : <ICONS.CHANGE />,
        label: action === "add" ? "Thêm agent" : "Cập nhật agent"
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            instructions: ""
        }
    })

    const queryClient = useQueryClient()

    const queryAgent = useQuery({
        queryKey: ["getAgent", {agentId}],
        queryFn: () => getAgent(agentId || ""),
        enabled: () => action === "update" && !!agentId
    })

    useEffect(() => {
        if (action === "add") form.reset()
        else if (action === "update" && queryAgent.data?.data) {
            const {name, instructions} = queryAgent.data.data
            form.reset({name, instructions})
        }
    }, [form, action, queryAgent.data?.data?.id])

    const agentMutation = useMutation({
        mutationFn: () => {
            if (action === "add") return addAgent(form.getValues())
            return updateAgent({agentId, data: form.getValues()})
        },
        onSuccess: () => {
            if (action === "add") {
                form.reset()
                queryClient.invalidateQueries({queryKey: ["getUsage"]})
            }
            else {
                queryClient.invalidateQueries({queryKey: ["getMeeting"]})
                queryClient.invalidateQueries({queryKey: ["getMeetings"]})
                queryClient.invalidateQueries({queryKey: ["getAgent", {agentId}]})
            }

            queryClient.invalidateQueries({queryKey: ["getAgents"]})
        }
    })

    const handleResetForm = () => form.reset()
    const handleSubmitAgentForm = () => agentMutation.mutate()

    return {form, title, description, button, queryAgent, agentMutation, handleSubmitAgentForm, handleResetForm}
}