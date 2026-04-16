import { fetcherPrivate } from "@/libs/fetcher";

import { Profile } from "@/types/users";

export const getProfile = async () => {
    return await fetcherPrivate.get<Profile>({ pathname: `/users/profile` });
}