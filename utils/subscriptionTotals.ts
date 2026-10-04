import { ISubscription } from "@/types/Subscription"
import { convertToUSD } from "./currency"

export const getMonthlyEquivalent = (
    price: number,
    frequency: string
) => {
    switch (frequency.toLowerCase()) {
        case "daily":
            return (price * 365) / 12

        case "weekly":
            return (price * 52) / 12

        case "monthly":
            return price

        case "yearly":
            return price / 12

        default:
            return 0
    }
}

export const getYearlyEquivalent = (
    price: number,
    frequency: string
) => {
    switch (frequency.toLowerCase()) {
        case "daily":
            return price * 365

        case "weekly":
            return price * 52

        case "monthly":
            return price * 12

        case "yearly":
            return price

        default:
            return 0
    }
}

export const calculateMonthlyTotal = (
    subscriptions: ISubscription[]
) => {
    return subscriptions.reduce((total, subscription) => {
        const monthlyPrice = getMonthlyEquivalent(
            subscription.price,
            subscription.frequency
        )

        const monthlyUSD = convertToUSD(
            monthlyPrice,
            subscription.currency
        )

        return total + monthlyUSD
    }, 0)
}

export const calculateYearlyTotal = (
    subscriptions: ISubscription[]
) => {
    return subscriptions.reduce((total, subscription) => {
        const yearlyPrice = getYearlyEquivalent(
            subscription.price,
            subscription.frequency
        )

        const yearlyUSD = convertToUSD(
            yearlyPrice,
            subscription.currency
        )

        return total + yearlyUSD
    }, 0)
}