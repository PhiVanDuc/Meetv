type ResponseErrors = {
    code: string,
    field?: string,
    message?: string
}[];

interface AuthTokens {
    accessToken: string,
    refreshToken: string
}