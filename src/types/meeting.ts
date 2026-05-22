import MEETING_STATUSES from "@/consts/meeting-statuses";

export interface Meeting {
    id: string,
    name: string,
    endedAt?: Date,
    userId: string,
    summary?: string,
    startedAt?: Date,
    duration?: number,
    transcriptUrl?: string,
    status: keyof typeof MEETING_STATUSES,
    agent: {
        id: string,
        name: string
    }
}

export interface IMeetingFilter {
    name?: string,
    status?: keyof typeof MEETING_STATUSES
}