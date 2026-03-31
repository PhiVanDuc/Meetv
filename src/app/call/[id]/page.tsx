import CallShell from "@/app/call/[id]/_components/shell";

import { getSessionUser } from "@/services/auth/server-actions";

interface Props {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    const sessionUser = await getSessionUser();

    return (
        <CallShell
            id={id}
            sessionUser={sessionUser}
        />
    )
}