import MEETING_STATUSES from "@/consts/meeting-statuses";

export interface Meeting {
    id: string,
    name: string,
    endedAt?: Date,
    userId: string,
    summary?: string,
    startedAt?: Date,
    recordingUrl?: string,
    transcriptUrl?: string,
    status: keyof typeof MEETING_STATUSES,
    agent: {
        id: string,
        name: string
    }
}

export interface MeetingFilterFields {
    name?: string,
    status?: keyof typeof MEETING_STATUSES
}

export type GetMeetingsRequestData =
    Omit<Pagination, "totalPages">
    & { filter: MeetingFilterFields }

export interface GetMeetingsResponseData {
    meetings: Meeting[],
    pagination: Pagination,
    createdMeeting: boolean
}

export interface AddMeetingRequestData {
    name: string,
    agentId: string
}

export interface UpdateMeetingRequestData {
    id: string,
    name: string,
    agentId: string
}