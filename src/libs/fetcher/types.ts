export type FetcherGetParams = Omit<FetcherHandleParams<unknown>, 'method' | 'body'>;

export type FetcherMutateParams<RequestData> = Omit<FetcherHandleParams<RequestData>, 'method'>;

export interface FetcherHandleParams<RequestData> {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    pathname: string,
    body?: RequestData | BodyInit,
    options?: Omit<RequestInit, "method" | "body">,
    isRetry?: boolean
}

export interface FetcherErrorParams<ResponseData> {
    status: number,
    message: string,
    data?: ResponseData,
    errors?: ResponseErrors
}

export interface FetcherResponse<ResponseData> {
    status: number;
    message: string;
    data?: ResponseData;
    errors?: ResponseErrors;
}