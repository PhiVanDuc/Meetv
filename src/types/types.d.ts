interface Session {
    accessToken: string,
    refreshToken: string
}

interface SessionUser {
    id: string,
    name: string,
    email: string,
    accountId: string,
    provider: string
}

interface Pagination {
    page?: string,
    limit?: string,
    totalPages?: string
}

interface Option {
    id: string,
    value: string,
    children: React.ReactNode
}

type FormType = "add" | "update";