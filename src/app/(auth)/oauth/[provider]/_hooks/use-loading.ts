import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"

import { signInGoogle } from "@/services/auth/server"
import { useRouter } from "next/navigation"

interface Parameters {
    code?: string,
    errorMessage?: string
}

interface CloseWindowParameters {
    message?: string,
    accessToken?: string,
    refreshToken?: string,
    errorMessage?: string
}

export default function useOAuthSignInLoading({code, errorMessage}: Parameters) {
    const router = useRouter()

    const closeWindow = (data: CloseWindowParameters) => {
        if (!window.opener?.postMessage) {
            router.push("/sign-in")
            return
        }

        window.opener.postMessage(data, window.location.origin)
        window.close()
    }

    const signInGoogleMutation = useMutation({
        mutationFn: () => signInGoogle({code}),
        onSuccess: ({message, data}) => closeWindow((message && data) ? {...data, message} : {}),
        onError: (error) => closeWindow({errorMessage: error.message || "Đăng nhập bằng nền tảng Google thất bại."})
    })

    useEffect(() => {
        if (errorMessage) {
            closeWindow({errorMessage: decodeURIComponent(errorMessage)})
            return
        }

        signInGoogleMutation.mutate()
    }, [code, errorMessage])
}