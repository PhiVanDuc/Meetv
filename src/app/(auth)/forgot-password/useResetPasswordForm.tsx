import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import resetPasswordValidator from "@/validators/reset-password-validator";
import { sendOTPResetPassword, resetPassword } from "@/services/auth/server-actions";

import type { ResetPasswordFormData } from "@/validators/reset-password-validator";

export default function useResetPasswordForm() {
    const router = useRouter();

    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordValidator),
        defaultValues: {
            email: "",
            otp: "",
            password: "",
            passwordConfirmation: ""
        }
    });

    const sendOTPResetPasswordMutation = useMutation({
        mutationFn: () => sendOTPResetPassword({ email: form.getValues("email") })
    });

    const resetPasswordMutation = useMutation({
        mutationFn: () => resetPassword(form.getValues()),
        onSuccess: () => {
            form.reset();
            router.push("/sign-in");
        }
    });

    return {
        form,
        sendOTPResetPasswordMutation,
        resetPasswordMutation
    }
}