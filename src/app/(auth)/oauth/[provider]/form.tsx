"use client"

import useProviderSignInForm from "@/app/(auth)/oauth/[provider]/use-form";

import { Spinner } from "@/components/ui/spinner";

interface Props {
    code?: string,
    errorMessage?: string
}

export default function ProviderSignInForm({ errorMessage, code }: Props) {
    useProviderSignInForm({ errorMessage, code });

    return (
        <div className="flex items-center justify-center gap-[15px]">
            <Spinner className="shrink-0 text-brand-primary size-[20px]" />
            <p className="medium-desc md:text-[17px] text-[14px]">Đang đăng nhập bằng nền tảng Google . . .</p>
        </div>
    )
}
