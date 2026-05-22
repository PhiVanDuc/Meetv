import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { z } from "zod"
import CODE_TYPES from "@/consts/code-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { sendOtp, forgotPassword } from "@/services/auth/server"

const formSchema = z.object({
    email: z
        .email({ error: "Email sai định dạng." }),
    otp: z
        .string()
        .trim()
        .regex(/^\d{6}$/, { error: "Mã OTP sai định dạng." }),
    password: z
        .string()
        .trim()
        .min(8, { error: "Mật khẩu không thể ít hơn 8 ký tự." })
        .max(100, { error: "Mật khẩu không thể vượt quá 100 ký tự." })
})

export default function useForgotPasswordForm() {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            otp: "",
            password: ""
        }
    })

    const sendOtpMutation = useMutation({
        mutationFn: () => sendOtp({
            email: form.getValues("email"),
            type: CODE_TYPES.FORGOT_PASSWORD
        })
    })

    const forgotPasswordMutation = useMutation({
        mutationFn: () => forgotPassword(form.getValues()),
        onSuccess: () => {
            form.reset()
            router.push("/sign-in")
        }
    })

    const handleSendOtp = () => sendOtpMutation.mutate()
    const handleForgotPassword = () => forgotPasswordMutation.mutate()

    return {form, handleSendOtp, handleForgotPassword, sendOtpMutation, forgotPasswordMutation}
}