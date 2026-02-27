"use client"

import useProviderSignInForm from "@/app/(auth)/oauth/[provider]/callback/useProviderSignInForm";

import { Spinner } from "@/components/ui/spinner";

import PROVIDERS from "@/consts/providers";

interface Props {
    exchangeToken: string,
    provider: keyof typeof PROVIDERS
}

export default function ProviderSignInForm({ provider, exchangeToken }: Props) {
    const { mutation, message } = useProviderSignInForm({ provider, exchangeToken });

    return (
        <div className="flex items-center justify-center gap-[10px]">
            {
                mutation.isError
                    ? <p className="medium-desc text-[17px]">{message}</p>
                    : (
                        <>
                            <Spinner  className="text-brand-primary size-[22px]" />
                            <p className="medium-desc text-[17px]">Đang xử lý đăng nhập với {PROVIDERS[provider]}.</p>
                        </>
                    )
            }
        </div>
    )
}