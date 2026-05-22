"use client"

import http from "@/libs/http"
import { HttpError } from "@/libs/http/classes"
import { HttpResponse } from "@/libs/http/types"
import { getAuthToken, setAuthTokens } from "@/services/auth/server"

let refreshAuthTokensPromise: Promise<HttpResponse<AuthTokens>> | undefined

export const refreshAuthTokens = async () => {
    if (refreshAuthTokensPromise) return refreshAuthTokensPromise

    refreshAuthTokensPromise = (async () => {
        try {
            const refreshToken = await getAuthToken("refreshToken")
            const result = await http.post<AuthTokens>({pathname: "/auth/session/refresh", body: { refreshToken }})

            if (!result.data?.accessToken || !result.data?.refreshToken) throw new Error()

            setAuthTokens({
                accessToken: result.data.accessToken,
                refreshToken: result.data.refreshToken
            })

            return result
        }
        catch(error) {
            throw new HttpError({
                status: 401,
                message: "Phiên đăng nhập đã hết hạn."
            })
        }
        finally { refreshAuthTokensPromise = undefined }
    })()

    return refreshAuthTokensPromise
}