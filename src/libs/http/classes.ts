import { HttpResponse, HttpResponseErrors } from "@/libs/http/types"

export class HttpError<HttpResponseData = unknown> extends Error {
    status: number
    data?: HttpResponseData
    errors?: HttpResponseErrors

    constructor({ status, message, data, errors }: HttpResponse<HttpResponseData>) {
        super(message)
        this.name = 'HttpError'

        this.data = data
        this.status = status
        this.errors = errors

        if (Error.captureStackTrace) Error.captureStackTrace(this, HttpError)
    }
}