import OAuthSignInLoading from "@/app/(auth)/oauth/[provider]/_components/loading"

import PROVIDERS from "@/consts/providers"

interface Props {
    params: Promise<{
        provider: keyof typeof PROVIDERS
    }>,
    searchParams: Promise<{
        errorMessage?: string,
        code?: string
    }>
}

export default async function Page({ params, searchParams }: Props) {
    const { provider } = await params
    const { errorMessage, code } = await searchParams

    let tempErrorMessage = errorMessage
        ? encodeURIComponent(errorMessage)
        : undefined

    if (!PROVIDERS[provider] || (!errorMessage && !code))
        tempErrorMessage = encodeURIComponent("Dữ liệu đăng nhập không hợp lệ.")

    return (
        <OAuthSignInLoading
            code={code}
            provider={PROVIDERS[provider]}
            errorMessage={tempErrorMessage}
        />
    )
}
