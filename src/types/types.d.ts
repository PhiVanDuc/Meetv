interface AuthTokens {
    accessToken: string,
    refreshToken: string
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