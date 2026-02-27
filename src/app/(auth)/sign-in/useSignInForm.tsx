import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import signInValidator from "@/validators/sign-in-validator";
import { signIn, setAuthTokens } from "@/services/auth/server-actions";

import type { SignInFormData } from "@/validators/sign-in-validator";

export default function useSignInForm() {
    const router = useRouter();

    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInValidator),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const mutation = useMutation({
        mutationFn: () => signIn(form.getValues()),
        onSuccess: async ({ data }) => {
            if (data) await setAuthTokens(data);

            form.reset();
            router.push("/");
        }
    });

    return {
        form,
        mutation,
        googleSignIn: () => router.push(`${process.env.NEXT_PUBLIC_BE}/oauth/google`)
    }
}
