import { GetUpcomingRenewals } from "@/actions/Subscription"
import SubscriptionCard from "@/components/SubscriptionCard";
import { ISubscription } from "@/types/Subscription";

const UpcomingRenewalsPage = async() => {

    const data = await GetUpcomingRenewals();
    const upcomingRenewals = data.data;

       if(!data.success) {
        return <p>{data.error}</p>
    }


    return (
        <>
        {
        upcomingRenewals.length === 0 ? (
            <p>You have no upcoming renewals</p>
        ) :
            upcomingRenewals.map((r: ISubscription) => (
                <SubscriptionCard 
                key={r._id}
                _id={r._id}
                name={r.name}
                price={r.price}
                currency={r.currency}
                frequency={r.frequency}
                category={r.category}
                paymentMethod={r.paymentMethod}
                startDate={r.startDate}
                status={r.status}
                />
            )) 
        }
        </>
    )
}


export default UpcomingRenewalsPage