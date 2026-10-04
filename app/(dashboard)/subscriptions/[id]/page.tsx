import { GetSubscriptionDetails } from "@/actions/Subscription"
import SubscriptionDetails from "@/components/SubscriptionDetails"

const SubscriptionPage = async (
    {
        params
    }: {
        params: Promise<{ id: string }>
    }
) => {

    const { id } = await params

    const data = await GetSubscriptionDetails(id)

    if (!data.success) {
        return (
            <div className="p-10 text-white">
                <p>{data.message}</p>
            </div>
        )
    }

    const subscriptionDetails = data.data

    return (
        <>
            <SubscriptionDetails
                subscription={subscriptionDetails}
            />
        </>
    )
}

export default SubscriptionPage