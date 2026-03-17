import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { schemaSignUp, FormDataSignUp } from "@/schemas";
import { sendOTP, signUp } from "@/services/auth/server-actions";

import { CODE_TYPES } from "@/consts";

export default function useSignUpForm() {
    const router = useRouter();

    const form = useForm<FormDataSignUp>({
        resolver: zodResolver(schemaSignUp),
        defaultValues: {
            name: "",
            email: "",
            otp: "",
            password: ""
        }
    });

    const sendOTPMutation = useMutation({
        mutationFn: () => sendOTP({
            type: CODE_TYPES.SIGN_UP,
            email: form.getValues("email")
        })
    });

    const signUpMutation = useMutation({
        mutationFn: () => signUp(form.getValues()),
        onSuccess: () => {
            form.reset();
            router.push("/sign-in");
        }
    });

    return { form, sendOTPMutation, signUpMutation }
}