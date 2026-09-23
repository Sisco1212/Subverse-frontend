import { GetSubscriptionDetails } from "@/actions/Subscription"

const SubscriptionPage = async(
    { params }: {
        params: Promise<{ id: string }>
    }
) => {

    const { id } = await params

    const data = await GetSubscriptionDetails(id)
    const subscriptionDetails = data.data

    return (
        <>
        <p>Subscription details</p>

        <h1>{subscriptionDetails.name}</h1>
        <h2>{subscriptionDetails.price}</h2>
        <p>{subscriptionDetails.currency}</p>
        <p>{subscriptionDetails.frequency}</p>
        <p>{subscriptionDetails.category}</p>
        <p>{subscriptionDetails.startDate}</p>
        <p>{subscriptionDetails.paymentMethod}</p>
        <p>{subscriptionDetails.status}</p>
        </>
    )
}

export default SubscriptionPage