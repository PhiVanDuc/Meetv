import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { sendOTP, forgotPassword } from "@/services/auth/server-actions";
import { schemaForgotPassword, FormDataForgotPassword } from "@/schemas/forgot-password";

import CODE_TYPES from "@/consts/code-types";

export default function useForgotPasswordForm() {
    const router = useRouter();

    const form = useForm<FormDataForgotPassword>({
        resolver: zodResolver(schemaForgotPassword),
        defaultValues: {
            email: "",
            otp: "",
            password: ""
        }
    });

    const sendOTPMutation = useMutation({
        mutationFn: () => sendOTP({
            email: form.getValues("email"),
            type: CODE_TYPES.FORGOT_PASSWORD
        })
    });

    const forgotPasswordMutation = useMutation({
        mutationFn: () => forgotPassword(form.getValues()),
        onSuccess: () => {
            form.reset();
            router.push("/sign-in");
        }
    });

    return { form, sendOTPMutation, forgotPasswordMutation }
}