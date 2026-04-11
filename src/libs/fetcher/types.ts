export type FetcherGetParams = Omit<FetcherHandleParams<unknown>, 'method' | 'body'>;

export type FetcherMutateParams<RequestData> = Omit<FetcherHandleParams<RequestData>, 'method'>;

export interface FetcherHandleParams<RequestData> {
    pathname: string,
    isRetry?: boolean,
    body?: RequestData | BodyInit,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    options?: Omit<RequestInit, "method" | "body"> & { timeout?: number }
}

export type FetcherResponseErrors = {
    code: string,
    field?: string,
    message?: string
}[];

export interface FetcherResponse<ResponseData> {
    status: number;
    message: string;
    data?: ResponseData;
    errors?: FetcherResponseErrors;
}