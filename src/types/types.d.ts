type ResponseErrors = {
    code: string,
    field?: string,
    message?: string
}[];

interface Session {
    accessToken: string,
    refreshToken: string
}

interface CurrentUser {
    id: string,
    name: string,
    email: string,
    accountId: string,
    provider: string
}

type FormType = "add" | "update";