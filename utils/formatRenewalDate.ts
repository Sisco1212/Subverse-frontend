export const formatRenewalDate = (date: string | Date) => {
    const renewalDate = new Date(date)
    const today = new Date()

    // Remove the time portion so we're comparing calendar dates
    today.setHours(0, 0, 0, 0)
    renewalDate.setHours(0, 0, 0, 0)

    const differenceInMs = renewalDate.getTime() - today.getTime()
    const differenceInDays = Math.round(
        differenceInMs / (1000 * 60 * 60 * 24)
    )

    if (differenceInDays === 0) {
        return "Today"
    }

    if (differenceInDays === 1) {
        return "Tomorrow"
    }

    if (differenceInDays >= 2 && differenceInDays <= 6) {
        return `in ${differenceInDays} days`
    }

    return renewalDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    })
}