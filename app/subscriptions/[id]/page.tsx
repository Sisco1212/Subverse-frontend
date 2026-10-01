import { GetSubscriptionDetails } from "@/actions/Subscription"
import CancelSubscriptionBtn from "@/components/CancelSubscription"
import DeleteSubscriptionBtn from "@/components/DeleteSubscriptionBtn"
import SubscriptionDetails from "@/components/SubscriptionDetails"
// import DeleteSubscriptionBtn from "@/components/DeleteSubscriptionBtn"
// import UpdateSubscriptionForm from "@/components/UpdateSubscriptionForm"

const SubscriptionPage = async(
    { params }: {
        params: Promise<{ id: string }>
    }
) => {

    const { id } = await params

    const data = await GetSubscriptionDetails(id)
    const subscriptionDetails = data.data

        if(!data.success) {
        return <p>{data.message}</p>
    }

    return (
        <>
      <SubscriptionDetails subscription={subscriptionDetails} />
      <DeleteSubscriptionBtn id={id}/>
      <CancelSubscriptionBtn  id={id}/>

        </>
    )
}

export default SubscriptionPage