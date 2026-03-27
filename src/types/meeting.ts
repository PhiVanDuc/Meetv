import MEETING_STATUSES from "@/consts/meeting-statuses";

export interface Meeting {
    id: string,
    name: string,
    endedAt: Date,
    userId: string,
    summary: string,
    startedAt: Date,
    recordingURL: string,
    transcriptURL: string,
    status: keyof typeof MEETING_STATUSES,
    agent: {
        id: string,
        name: string,
        createdAt: string
    }
}

export interface MeetingFilterFields {
    name?: string,
    status?: keyof typeof MEETING_STATUSES
}