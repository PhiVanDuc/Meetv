import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteMeeting } from "@/services/meetings/client-functions";

export default function useMeetingCellActions() {
    const queryClient = useQueryClient();
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const mutation = useMutation({
        mutationFn: (id: string) => deleteMeeting(id),
        onSuccess: () => {
            setIsOpenAlert(false);
            queryClient.invalidateQueries({ queryKey: ["getUsage"] });
            queryClient.invalidateQueries({ queryKey: ["getMeetings"] });
        }
    });

    return { isOpenDialog, setIsOpenDialog, isOpenAlert, setIsOpenAlert, mutation }
}