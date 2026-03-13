import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { schemaSignIn } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/services/auth/server-actions";

import type { FormDataSignIn } from "@/schemas";

const BE = process.env.NEXT_PUBLIC_BE;

export default function useSignInForm() {
    const router = useRouter();

    const form = useForm<FormDataSignIn>({
        resolver: zodResolver(schemaSignIn),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const mutation = useMutation({
        mutationFn: () => signIn(form.getValues()),
        onSuccess: () => {
            form.reset();
            router.push("/");
        }
    });

    const signInGoogle = () => {
        const width = 500;
        const height = 600;

        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
            `${BE}/oauth/google`,
            "oauth-window",
            `width=${width},height=${height},left=${left},top=${top}`
        );
    }

    useEffect(() => {
        const handlePopupData = (e: MessageEvent) => {
            console.log(e.data);
        }

        window.addEventListener("message", handlePopupData);
        () => window.removeEventListener("message", handlePopupData);
    }, []);

    return { form, mutation, signInGoogle }
}