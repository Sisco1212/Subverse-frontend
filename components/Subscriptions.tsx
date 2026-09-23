import { GetSubscriptions } from "@/actions/Subscription";
import SubscriptionCard from "./SubscriptionCard"
import { ISubscription } from "@/types/Subscription";

const Subscriptions = async() => {

    const data = await GetSubscriptions();

    const subscriptions = data.data;

    if(!data.success) {
        return <p>{data.error}</p>
    }


    return (
        <>

        {
        subscriptions.length === 0 ? (
            <p>You have no subscriptions</p>
        ) :
        subscriptions.map((sub: ISubscription) => (
                <SubscriptionCard 
                key={sub._id}
                _id={sub._id}
                name={sub.name}
                price={sub.price}
                currency={sub.currency}
                frequency={sub.frequency}
                category={sub.category}
                paymentMethod={sub.paymentMethod}
                startDate={sub.startDate}
                status={sub.status}
                />
            )

        )}


        </>
    )
}

export default Subscriptions