import ProviderSignInForm from "@/app/(auth)/oauth/[provider]/form";

import { PROVIDERS } from "@/consts";

interface Props {
    params: Promise<{ provider: keyof typeof PROVIDERS }>,
    searchParams: Promise<{
        errorMessage?: string,
        code?: string
    }>
}

export default async function Page({ params, searchParams }: Props) {
    const { provider } = await params;
    const { errorMessage, code } = await searchParams;

    let tempErrorMessage = errorMessage ? encodeURIComponent(errorMessage) : undefined;

    if (
        !PROVIDERS[provider] ||
        (!errorMessage && !code)
    ) tempErrorMessage = encodeURIComponent("Dữ liệu đăng nhập bằng nền tảng không hợp lệ.");

    return (
        <ProviderSignInForm
            code={code}
            errorMessage={tempErrorMessage}
        />
    )
}