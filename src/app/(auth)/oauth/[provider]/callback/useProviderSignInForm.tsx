import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { googleSignIn, setAuthTokens } from "@/services/auth/server-actions";

import PROVIDERS from "@/consts/providers";

interface UseProviderSignInFormParams {
    exchangeToken: string,
    provider: keyof typeof PROVIDERS,
}

export default function useProviderSignInForm({ provider, exchangeToken }: UseProviderSignInFormParams) {
    const router = useRouter();
    const [message, setMessage] = useState("");

    const mutation = useMutation({
        mutationFn: () => googleSignIn({ exchangeToken }),
        onSuccess: async ({ data }) => {
            if (data) await setAuthTokens(data);
            router.push("/");
        },
        onError: (error) => setMessage(error.message)
    });

    useEffect(() => {
        mutation.mutate();
    }, [provider, exchangeToken]);

    return {
        mutation,
        message
    }
}
