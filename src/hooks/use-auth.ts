"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { getProfile } from "@/services/users/client"
import { getAuthToken, removeAuthTokens } from "@/services/auth/server"

export default function useAuth() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [isAuthTokensPending, setIsAuthTokensPending] = useState(true)
    const [authTokens, setAuthTokens] = useState({accessToken: "", refreshToken: ""})

    useEffect(() => {
        const handleGetAuthTokens = async () => {
            const [accessToken, refreshToken] = await Promise.all([
                getAuthToken("accessToken"),
                getAuthToken("refreshToken")
            ])

            setAuthTokens({accessToken, refreshToken})
            setIsAuthTokensPending(false)
        }

        handleGetAuthTokens()
    }, [])

    const queryProfile = useQuery({
        queryKey: ["getProfile"],
        queryFn: () => getProfile()
    })

    const handleSignOut = async () => {
        await removeAuthTokens()
        queryClient.invalidateQueries({refetchType: "none"})
        router.push("/sign-in")
    }

    return {isAuthPending: isAuthTokensPending || queryProfile.isPending, authTokens, handleSignOut, isProfileError: queryProfile.isError, profileError: queryProfile.error, profile: queryProfile.data?.data}
}