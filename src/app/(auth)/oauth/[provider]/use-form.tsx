import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import { PROVIDERS } from "@/consts";

interface UseProviderSignInForm {
    code?: string,
    errorMessage?: string
    provider: keyof typeof PROVIDERS
}

export default function useProviderSignInForm({ provider, errorMessage, code }: UseProviderSignInForm) {}
