export type FetcherGetParams = Omit<HandleFetcherParams<unknown>, 'method' | 'body'>;

export type FetcherMutateParams<RequestData> = Omit<HandleFetcherParams<RequestData>, 'method'>;

export interface HandleFetcherParams<RequestData> {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    pathname: string,
    body?: RequestData | BodyInit,
    options?: Omit<RequestInit, "method" | "body">
}

export interface FetcherResponse<ResponseData> {
    status: number;
    message: string;
    data?: ResponseData;
    errors?: ResponseErrors;
}