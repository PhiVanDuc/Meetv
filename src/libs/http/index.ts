import { HttpError } from "@/libs/http/classes"
import { getAuthToken } from "@/services/auth/server"
import { refreshAuthTokens } from "@/services/auth/client"
import { HttpGetParams, HttpMutateParams, HttpHandleParams, HttpResponse } from "@/libs/http/types"

const BE = process.env.NEXT_PUBLIC_BE

const handle = async <HttpResponseData>({ method, pathname, body, options, isAuth, isRetry }: HttpHandleParams) => {
    let parseBody: BodyInit | undefined | null
    const accessToken = await getAuthToken("accessToken")
    let response: Omit<HttpResponse<HttpResponseData>, "status">

    const headers = new Headers({...options?.headers, "ngrok-skip-browser-warning": "true"})
    if (isAuth) headers.set("Authorization", `Bearer ${accessToken}`)

    if (body) {
        if (typeof body === "string" || body instanceof Blob || body instanceof ArrayBuffer || body instanceof FormData || body instanceof URLSearchParams || body instanceof ReadableStream) parseBody = body
        else {
            parseBody = JSON.stringify(body)
            headers.set("Content-Type", "application/json")
        }
    }

    try {
        const request = await fetch(
            `${BE}${pathname}`,
            {...options, method, headers, body: parseBody}
        )

        if (request.status === 204) {
            return {
                message: "Thành công.",
                status: request.status
            }
        }

        try { response = await request.json() }
        catch(error) {
            throw new HttpError({
                status: request.status,
                message: "Máy chủ không trả về dữ liệu phản hồi theo mong đợi."
            })
        }

        if (request.status >= 400) {
            throw new HttpError({
                ...response,
                status: request.status
            })
        }

        return {
            ...response,
            status: request.status
        }
    }
    catch(error) {
        if (error instanceof HttpError) {
            if (error.status === 401 && error.errors?.some(error => error.code === "auth-token-expired") && isAuth && !isRetry) {
                await refreshAuthTokens()
                return handle<HttpResponseData>({ method, pathname, body, options, isAuth: true, isRetry: true })
            }
            else throw error
        }

        throw new HttpError({
            status: 500,
            message: "Lỗi kết nối hoặc phản hồi không hợp lệ."
        })
    }
}

export default {
    get: async <HttpResponseData = unknown>({ pathname, options, isAuth }: HttpGetParams) => {
        return await handle<HttpResponseData>({ method: "GET", pathname, options, isAuth })
    },

    post: async <HttpResponseData = unknown>({ pathname, body, options, isAuth }: HttpMutateParams) => {
        return await handle<HttpResponseData>({ method: "POST", pathname, body, options, isAuth })
    },

    put: async <HttpResponseData = unknown>({ pathname, body, options, isAuth }: HttpMutateParams) => {
        return await handle<HttpResponseData>({ method: "PUT", pathname, body, options, isAuth })
    },

    delete: async <HttpResponseData = unknown>({ pathname, body, options, isAuth }: HttpMutateParams) => {
        return await handle<HttpResponseData>({ method: "DELETE", pathname, body, options, isAuth })
    },

    patch: async <HttpResponseData = unknown>({ pathname, body, options, isAuth }: HttpMutateParams) => {
        return await handle<HttpResponseData>({ method: "PATCH", pathname, body, options, isAuth })
    }
}