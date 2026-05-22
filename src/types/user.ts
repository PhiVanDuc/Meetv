export interface Profile {
    id: string,
    name: string,
    email: string,
    serviceCustomerId?: string,
    account: {
        id: string,
        provider: string
    },
    subscription?: {
        id: string,
        servicePriceId: string,
        currentPeriodEnd?: Date,
        currentPeriodStart?: Date,
        serviceSubscriptionId: string
    }
}