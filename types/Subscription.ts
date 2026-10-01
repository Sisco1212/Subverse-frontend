export interface ISubscription {
    _id?: string,
    name: string,
    price: number,
    currency: string,
    frequency: string,
    category: string,
    paymentMethod: string,
    startDate: string,
    status?: string
}

export interface UpdateSubscriptionProps {
    id: string

    original: {
        name: string
        price: number
        currency: string
        frequency: string
        category: string
        paymentMethod: string
        startDate: string
    }

    name: string
    price: number
    currency: string
    frequency: string
    category: string
    paymentMethod: string
    startDate: string
}