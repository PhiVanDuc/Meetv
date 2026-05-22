"use client"

import useOAuthSignInLoading from "@/app/(auth)/oauth/[provider]/_hooks/use-loading"

import { Spinner } from "@/components/ui/spinner"

interface Props {
    code?: string,
    provider: string,
    errorMessage?: string
}

export default function OAuthSignInLoading({provider, code, errorMessage}: Props) {
    useOAuthSignInLoading({code, errorMessage})

    return (
        <div className="flex items-center justify-center gap-[15px]">
            <Spinner className="shrink-0 text-orange-600 size-[20px]" />
            <p className="desc md:text-[17px] text-[14px]">Đang đăng nhập bằng nền tảng {provider} . . .</p>
        </div>
    )
}