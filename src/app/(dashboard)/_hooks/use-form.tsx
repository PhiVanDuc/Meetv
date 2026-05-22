import { useForm } from "react-hook-form"
import { useEffect, useState, useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import Avatar from "boring-avatars"

import { z } from "zod"
import ICONS from "@/consts/icons"
import { getAgents } from "@/services/agents/client"
import { zodResolver } from "@hookform/resolvers/zod"

interface Parameters {
    action: FormAction,
    meetingId?: string
}

const formSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { error: "Tên cuộc họp không thể để trống." }),
    agentId: z
        .uuid({ error: "Agent không thể để trống." })
})

export default function useMeetingForm({action, meetingId}: Parameters) {
    const title = action === "add"
        ? "Thêm cuộc họp"
        : "Cập nhật cuộc họp"

    const description = action === "add"
        ? "Nhập đầy đủ thông tin để thêm cuộc họp tại đây."
        : "Chỉnh sửa thông tin để cập nhật cuộc họp tại đây."

    const button = {
        icon: action === "add" ? <ICONS.ADD /> : <ICONS.CHANGE />,
        label: action === "add" ? "Thêm cuộc họp" : "Cập nhật cuộc họp"
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            agentId: ""
        }
    })

    const [agentsPage, setAgentsPage] = useState("1")
    const [agentFilter, setAgentFilter] = useState({name: ""})
    const [agentOptions, setAgentOptions] = useState<Option[]>([])

    const queryAgents = useQuery({
        queryKey: ["getAgents", {page: agentsPage, filter: agentFilter}],
        queryFn: () => getAgents({page: agentsPage, filter: agentFilter})
    })

    const agentsPagination = useMemo(() => ({
        page: agentsPage,
        totalPages: queryAgents.data?.data?.pagination.totalPages
    }), [agentsPage, queryAgents.data?.data?.pagination.page])

    useEffect(() => {
        if (queryAgents.isPending || !queryAgents.data?.data?.agents) return

        setAgentOptions(state => {
            const agentOptionsMap = new Map(state.map(agentOption => [agentOption.id, agentOption]))

            queryAgents.data?.data?.agents.forEach(agent => {
                agentOptionsMap.set(agent.id, {id: agent.id, value: agent.id, label: agent.name})
            })

            return Array.from(agentOptionsMap.values())
        })
    }, [agentsPage, queryAgents.data?.data?.agents])

    const renderAgentOption = (option: Option) => {
        return (
            <div className="flex-1 flex items-center gap-[10px]">
                <Avatar
                    name={option.label}
                    className="size-[20px]"
                />

                <p className="text-[14px] text-zinc-600">{option.label}</p>
            </div>
        )
    }

    const renderAgentSelectedOption = (option: Option) => {
        return (
            <div className="flex-1 flex items-center gap-[10px]">
                <Avatar
                    name={option.label}
                    className="size-[20px]"
                />

                <p className="text-[14px] text-muted-foreground! font-normal">{option.label}</p>
            </div>
        )
    }

    const handleFilterAgent = (value: string) => {
        const name = value.trim()
        if (name === agentFilter.name) return

        setAgentsPage("1")
        setAgentOptions([])
        setAgentFilter({name})
    }

    const handleResetForm = () => form.reset()
    const handleSubmitMeetingForm = () => {}

    return {form, title, description, button, queryAgents, agentsPagination, agentOptions, renderAgentOption, renderAgentSelectedOption, handleFilterAgent, handleSubmitMeetingForm, handleResetForm}
}