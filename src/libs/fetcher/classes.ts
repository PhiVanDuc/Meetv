import { FetcherResponseErrors, FetcherResponse } from "@/libs/fetcher";

export class FetcherError<ResponseData = unknown> extends Error {
    status: number;
    data?: ResponseData;
    errors?: FetcherResponseErrors;

    constructor({ status, message, data, errors }: FetcherResponse<ResponseData>) {
        super(message);
        this.name = 'FetcherError';

        this.status = status;
        this.data = data;
        this.errors = errors;

        if (Error.captureStackTrace) Error.captureStackTrace(this, FetcherError);
    }
}