import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAgent } from "@/services/agents/client-functions";

export default function useAgentCellActions() {
    const queryClient = useQueryClient();
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const mutation = useMutation({
        mutationFn: (id: string) => deleteAgent(id),
        onSuccess: () => {
            setIsOpenAlert(false);
            queryClient.invalidateQueries({ queryKey: ["getUsage"] });
            queryClient.invalidateQueries({ queryKey: ["getAgents"] });
            queryClient.invalidateQueries({ queryKey: ["getMeetings"] });
        }
    });

    return { isOpenDialog, setIsOpenDialog, isOpenAlert, setIsOpenAlert, mutation }
}