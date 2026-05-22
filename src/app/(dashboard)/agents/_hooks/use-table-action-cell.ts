import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteAgent } from "@/services/agents/client"

export default function useAgentTableActionCell(agentId: string) {
    const queryClient = useQueryClient()
    const [isOpenAlert, setIsOpenAlert] = useState(false)
    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const deleteAgentMutation = useMutation({
        mutationFn: () => deleteAgent(agentId),
        onSuccess: () => {
            setIsOpenAlert(false)
            queryClient.invalidateQueries({queryKey: ["getUsage"]})
            queryClient.invalidateQueries({queryKey: ["getAgents"]})
            queryClient.invalidateQueries({queryKey: ["getMeetings"]})
            queryClient.invalidateQueries({queryKey: ["getMeeting", {agentId}]})
        }
    })

    const handleOpenAlert = () => setIsOpenAlert(true)
    const handleOpenDialog = () => setIsOpenDialog(true)
    const handleDeleteAgent = () => deleteAgentMutation.mutate()

    return {isOpenDialog, setIsOpenDialog, handleOpenDialog, isOpenAlert, setIsOpenAlert, handleOpenAlert, deleteAgentMutation, handleDeleteAgent}
}
