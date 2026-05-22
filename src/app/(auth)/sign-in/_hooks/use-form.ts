import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { z } from "zod"
import { toast } from "@pheralb/toast"
import { signIn } from "@/services/auth/server"
import { zodResolver } from "@hookform/resolvers/zod"
import { setAuthTokens } from "@/services/auth/server"

const BE = process.env.NEXT_PUBLIC_BE

const formSchema = z.object({
    email: z
        .email({ error: "Email sai định dạng." }),
    password: z
        .string()
        .trim()
        .min(8, { error: "Mật khẩu không thể ít hơn 8 ký tự." })
        .max(100, { error: "Mật khẩu không thể vượt quá 100 ký tự." })
})

export default function useSignInForm() {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const signInMutation = useMutation({
        mutationFn: () => signIn(form.getValues()),
        onSuccess: () => {
            form.reset()
            router.push("/")
        }
    })

    const handleSignIn = () => signInMutation.mutate()

    const handleSignInOAuth = () => {
        const width = 500
        const height = 600

        const left = window.screenX + (window.outerWidth - width) / 2
        const top = window.screenY + (window.outerHeight - height) / 2

        window.open(
            `${BE}/oauth/google`,
            "oauth-window",
            `width=${width},height=${height},left=${left},top=${top}`
        )
    }

    useEffect(() => {
        const handlePopupData = async (e: MessageEvent) => {
            if (e.origin !== window.location.origin) return

            if (e.data?.errorMessage) {
                toast.error({
                    text: "Thất bại",
                    description: e.data?.errorMessage
                })

                return
            }

            if (e.data?.accessToken && e.data?.refreshToken) {
                await setAuthTokens({
                    accessToken: e.data.accessToken,
                    refreshToken: e.data.refreshToken
                })
            }

            toast.success({
                text: "Thành công",
                description: e.data?.message
            })

            router.push("/")
        }

        window.addEventListener("message", handlePopupData)
        return () => window.removeEventListener("message", handlePopupData)
    }, [])

    return {form, handleSignIn, handleSignInOAuth, signInMutation}
}
