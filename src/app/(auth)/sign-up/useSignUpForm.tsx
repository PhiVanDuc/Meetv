import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import signUpValidator from "@/validators/sign-up-validator";
import { sendOTPSignUp, signUp } from "@/services/auth/server-actions";

import type { SignUpFormData } from "@/validators/sign-up-validator";

export default function useSignUpForm() {
    const router = useRouter();

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpValidator),
        defaultValues: {
            name: "",
            email: "",
            otp: "",
            password: "",
            passwordConfirmation: ""
        }
    });

    const sendOTPMutation = useMutation({
        mutationFn: () => sendOTPSignUp({ email: form.getValues("email") })
    });

    const signUpMutation = useMutation({
        mutationFn: () => signUp(form.getValues()),
        onSuccess: () => {
            form.reset();
            router.push("/sign-in");
        }
    });

    return {
        form,
        sendOTPMutation,
        signUpMutation 
    }
}