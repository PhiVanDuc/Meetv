export interface FetcherErrorParams<ResponseData> {
    status: number,
    message: string,
    data?: ResponseData,
    errors?: ResponseErrors
}