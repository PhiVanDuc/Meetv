import MeetingShell from "@/app/(dashboard)/meetings/[id]/_components/shell";

interface Props {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    return <MeetingShell id={id} />
}