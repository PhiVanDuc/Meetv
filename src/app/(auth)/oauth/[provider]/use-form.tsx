import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import { signInGoogle } from "@/services/oauth/server-actions";

interface UseProviderSignInForm {
    code?: string,
    errorMessage?: string
}

interface CloseWindowDataParam {
    message?: string,
    accessToken?: string,
    refreshToken?: string,
    errorMessage?: string
}

export default function useProviderSignInForm({ errorMessage, code }: UseProviderSignInForm) {
    const closeWindow = (data: CloseWindowDataParam) => {
        window.opener.postMessage(data, window.location.origin);
        window.close();
    };

    const mutation = useMutation({
        mutationFn: () => signInGoogle({ code }),
        onSuccess: ({ message, data }) => closeWindow((message && data) ? { ...data, message } : {}),
        onError: (error) => closeWindow({ errorMessage: error.message || "Đăng nhập bằng nền tảng Google thất bại." })
    });

    useEffect(() => {
        if (errorMessage) {
            closeWindow({ errorMessage: decodeURIComponent(errorMessage) });
            return;
        }

        mutation.mutate();
    }, [code, errorMessage]);
}