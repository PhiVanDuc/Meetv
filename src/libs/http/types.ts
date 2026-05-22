export interface HttpHandleParams {
    pathname: string;
    isAuth?: boolean;
    isRetry?: boolean;
    body?: BodyInit | unknown;
    options?: Omit<RequestInit, "method" | "body">;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
}

export type HttpMutateParams = Omit<
    HttpHandleParams,
    "method"
>

export type HttpGetParams = Omit<
    HttpHandleParams,
    "method" | "body"
>

export type HttpResponseErrors = {
    code: string;
    field?: string;
    message: string;
}[]

export interface HttpResponse<HttpResponseData> {
    status: number;
    message: string;
    data?: HttpResponseData;
    errors?: HttpResponseErrors;
}