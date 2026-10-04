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
         <div className="w-10/12 lg:w-8/12 m-auto">
           <div className="mb-8">
                    <h1 className="text-white font-bold text-3xl">
                        Upcoming renewals
                    </h1>
                    <p className="text-gray-400 mt-3">
                        Subscriptions due for renewal soon
                    </p>
                </div>
        {
        upcomingRenewals.length === 0 ? (
            <p>You have no upcoming renewals</p>
        ) :
         <div className="w-full overflow-x-auto rounded-md border border-gray-800">
                    <div className="min-w-175 bg-[#111]">

                        {/* Table Header */}
                        <div className="grid grid-cols-[2fr_1fr_1fr_1fr__1fr] px-6 py-3 text-sm text-gray-400">
                            <div>Name</div>
                            <div>Cost</div>
                            <div>Next Charge</div>
                            <div>Frequency</div>
                            <div>Status</div>
                        </div>
           { upcomingRenewals.map((r: ISubscription) => (
                <SubscriptionCard 
                key={r._id}
                _id={r._id}
                name={r.name}
                price={r.price}
                currency={r.currency}
                frequency={r.frequency}
                category={r.category}
                paymentMethod={r.paymentMethod}
                renewalDate={r.renewalDate}
                status={r.status}
                />
            )) }
            </div>
            </div>
        }
        </div>
        </>
    )
}


export default UpcomingRenewalsPage