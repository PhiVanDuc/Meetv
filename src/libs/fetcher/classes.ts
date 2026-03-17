import { FetcherErrorParams } from "@/libs/fetcher";

export class FetcherError<ResponseData = unknown> extends Error {
    status: number;
    data?: ResponseData;
    errors?: ResponseErrors;

    constructor({ status, message, data, errors }: FetcherErrorParams<ResponseData>) {
        super(message);

        this.name = 'FetcherError';
        this.status = status;
        this.data = data;
        this.errors = errors;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FetcherError);
        }
    }
}