import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { z } from "zod"
import CODE_TYPES from "@/consts/code-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { sendOtp, signUp } from "@/services/auth/server"

const formSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { error: "Tên người dùng không thể để trống." })
        .max(100, { error: "Tên người dùng không thể vượt quá 100 ký tự." }),
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

export default function useSignUpForm() {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
            name: "",
            email: "",
            password: ""
        }
    })

    const sendOtpMutation = useMutation({
        mutationFn: () => sendOtp({
            type: CODE_TYPES.SIGN_UP,
            email: form.getValues("email")
        })
    })

    const signUpMutation = useMutation({
        mutationFn: () => signUp(form.getValues()),
        onSuccess: () => {
            form.reset()
            router.push("/sign-in")
        }
    })

    const handleSignUp = () => signUpMutation.mutate()
    const handleSendOtp = () => sendOtpMutation.mutate()

    return {form, handleSendOtp, handleSignUp, sendOtpMutation, signUpMutation}
}