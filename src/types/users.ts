export interface Profile {
    id: string,
    name: string,
    email: string,
    account: {
        id: string,
        provider: string
    },
    subcription?: {
        id: string,
        servicePriceId: string,
        currentPeriodEnd: Date,
        currentPeriodStart: Date,
        serviceSubcriptionId: string
    }
}