type ResponseErrors = {
    code: string,
    field?: string,
    message?: string
}[];

interface Session {
    accessToken: string,
    refreshToken: string
}

interface PaginationPartial {
    page: string,
    limit: string
}

type Pagination = PaginationPartial & {
    totalPages: string,
    totalItems: string
}

type FormType = "add" | "update";

interface CurrentUser {
    id: string,
    name: string,
    email: string,
    accountId: string,
    provider: string
}

interface Agent {
    id: string,
    name: string,
    instructions: string
}