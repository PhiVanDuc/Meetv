import { useState } from "react";

export default function useAgentCellActions(id: string) {
    const [isOpenAlert, setIsOpenAlert] = useState(false);

    return { isOpenAlert, setIsOpenAlert }
}
