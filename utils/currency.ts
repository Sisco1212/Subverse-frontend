const currencySymbols: Record<string, string> = {
    USD: "$",
    NGN: "₦",
    EUR: "€",
    GBP: "£"
}

const exchangeRatesToUSD: Record<string, number> = {
    USD: 1,
    NGN: 0.000751433,
    EUR: 1.1257,
    GBP: 1.32425
}

export const getCurrencySymbol = (currency: string) => {
    return currencySymbols[currency.toUpperCase()] ?? currency
}

export const convertToUSD = (
    amount: number,
    currency: string
) => {
    const rate = exchangeRatesToUSD[currency.toUpperCase()]

    if (!rate) {
        return 0
    }

    return amount * rate
}