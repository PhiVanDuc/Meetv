type ResponseErrors = {
    code: string,
    field?: string,
    message?: string
}[];

interface Session {
    accessToken: string,
    refreshToken: string
}