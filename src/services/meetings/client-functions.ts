"use client"

import { fetcherPrivate } from "@/libs/fetcher";
import generateQueryString from "@/utils/generate-query-string";
import { Meeting, GetMeetingsRequestData, GetMeetingsResponseData, AddMeetingRequestData, UpdateMeetingRequestData } from "@/types/meeting";

export const getMeetings = async (data: GetMeetingsRequestData) => {
    const { page, limit, filter } = data;
    const queryString = generateQueryString({ page, limit, ...filter });
    return await fetcherPrivate.get<GetMeetingsResponseData>({ pathname: `/meetings${queryString}` });
}

export const getMeeting = async (id: string) => {
    return await fetcherPrivate.get<Meeting>({ pathname: `/meetings/${id}` });
}

export const addMeeting = async (data: AddMeetingRequestData) => {
    return await fetcherPrivate.post({ pathname: "/meetings", body: data });
}

export const updateMeeting = async (data: UpdateMeetingRequestData) => {
    const { id, ...restData } = data;
    return await fetcherPrivate.put({ pathname: `/meetings/${id}`, body: restData });
}

export const deleteMeeting = async (id: string) => {
    return await fetcherPrivate.delete({ pathname: `/meetings/${id}` });
}

export const generateUserVideoToken = async () => {
    return await fetcherPrivate.post<unknown, { token: string }>({ pathname: "/meetings/user-video-token" });
}