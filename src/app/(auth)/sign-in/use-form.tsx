import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@pheralb/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/services/auth/server-actions";
import { setSession } from "@/services/session/server-actions";
import { schemaSignIn, FormDataSignIn } from "@/schemas/sign-in";

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
        onSuccess: async ({ data }) => {
            if (data) {
                await setSession({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                });
            }

            form.reset();
            router.push("/");
        }
    });

    const redirectOAuth = () => {
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
        const handlePopupData = async (e: MessageEvent) => {
            if (e.origin !== window.location.origin) return;

            if (e.data?.errorMessage) {
                toast.error({ text: "Thất bại", description: e.data?.errorMessage });
                return;
            }

            if (e.data?.accessToken && e.data?.refreshToken) {
                await setSession({
                    accessToken: e.data.accessToken,
                    refreshToken: e.data.refreshToken
                });
            }

            toast.success({ text: "Thành công", description: e.data?.message });
            router.push("/");
        }

        window.addEventListener("message", handlePopupData);
        return () => window.removeEventListener("message", handlePopupData);
    }, []);

    return { form, mutation, redirectOAuth }
}