"use client"

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/services/users/client-functions";
import { getAuthToken } from "@/services/auth/server-actions";

export default function useAuth() {
    const [isAuthTokensPending, setIsAuthTokensPending] = useState(true);
    const [authTokens, setAuthTokens] = useState({
        accessToken: "",
        refreshToken: ""
    });

    useEffect(() => {
        const handleGetAuthTokens = async () => {
            const [accessToken, refreshToken] = await Promise.all([
                getAuthToken("accessToken"),
                getAuthToken("refreshToken")
            ]);

            setAuthTokens({
                accessToken: accessToken ?? "",
                refreshToken: refreshToken ?? ""
            });

            setIsAuthTokensPending(false);
        }

        handleGetAuthTokens();
    }, []);

    const queryProfile = useQuery({
        queryKey: ["getProfile"],
        queryFn: () => getProfile()
    });

    const isPending = isAuthTokensPending || queryProfile.isPending;
    const isAuth = !!authTokens.accessToken && !!authTokens.refreshToken && !!queryProfile.data?.data;

    return {
        isAuth,
        isPending,
        authTokens,
        profile: queryProfile.data?.data
    }
}