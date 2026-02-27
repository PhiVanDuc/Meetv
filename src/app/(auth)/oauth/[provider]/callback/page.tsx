import ProviderSignInForm from "@/app/(auth)/oauth/[provider]/callback/ProviderSignInForm";

import { redirect } from "next/navigation";

import PROVIDERS from "@/consts/providers";

interface Props {
    params: Promise<{ provider: keyof typeof PROVIDERS }>,
    searchParams: Promise<{ exchangeToken: string }>
}

export default async function Page({ params, searchParams }: Props) {
    const { provider } = await params;
    const { exchangeToken } = await searchParams;

    if (!(provider in PROVIDERS) || !exchangeToken) redirect("/sign-in");

    return (
        <ProviderSignInForm
            provider={provider}
            exchangeToken={exchangeToken}
        />
    )
}