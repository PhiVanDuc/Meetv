"use client"

import http from "@/libs/http"
import { Profile } from "@/types/user"

export const getProfile = async () => {
    return await http.get<Profile>({pathname: `/users/profile`, isAuth: true})
}