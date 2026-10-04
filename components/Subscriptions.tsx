import { GetSubscriptions } from "@/actions/Subscription"
import SubscriptionCard from "./SubscriptionCard"
import { ISubscription } from "@/types/Subscription"
import {
    calculateMonthlyTotal,
    calculateYearlyTotal
} from "@/utils/subscriptionTotals"
import Link from "next/link"

const Subscriptions = async () => {

    const data = await GetSubscriptions()

    if (!data.success) {
        return <p>{data.error}</p>
    }

    const subscriptions = data.data

    const monthlyTotal = calculateMonthlyTotal(subscriptions)
    const yearlyTotal = calculateYearlyTotal(subscriptions)

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center items-start gap-6 my-12">

                {/* Monthly */}
                <div className="py-5 px-5  w-80 h-30 text-white border border-gray-800 rounded-md">
                    <p className="font-bold text-lg">
                        Monthly
                    </p>

                    <p className="font-bold text-4xl mt-2">
                        ${monthlyTotal.toFixed(2)}
                    </p>
                </div>

                {/* Yearly */}
                <div className="py-5 px-5 w-80 h-30 text-white border border-gray-800 rounded-md">
                    <p className="font-bold text-lg">
                        Yearly
                    </p>

                    <p className="font-bold text-4xl mt-2">
                        ${yearlyTotal.toFixed(2)}
                    </p>
                </div>

                <div className="py-5 px-5 w-80 h-30 text-white border border-gray-800 rounded-md flex flex-col justify-between">
                    <p className="font-bold text-lg">
                        Upcoming Renewals
                    </p>

                    <Link href="/subscriptions/upcoming-renewals" className=" text-md text-blue-500 underline hover:underline">
                        View Upcoming Renewals 
                    </Link>
                </div>

            </div>

            {subscriptions.length === 0 ? (
                <p>You have no subscriptions</p>
            ) : (
                <div className="w-full overflow-x-auto rounded-md border border-gray-800 mb-8">
                    <div className="min-w-175 bg-[#111]">

                        {/* Table Header */}
                        <div className="grid grid-cols-[2fr_1fr_1fr_1fr__1fr] px-6 py-3 text-sm text-gray-400">
                            <div>Name</div>
                            <div>Cost</div>
                            <div>Next Charge</div>
                            <div>Frequency</div>
                            <div>Status</div>
                        </div>

                        {/* Subscriptions */}
                        {subscriptions.map((sub: ISubscription) => (
                            <SubscriptionCard
                                key={sub._id}
                                _id={sub._id}
                                name={sub.name}
                                price={sub.price}
                                currency={sub.currency}
                                frequency={sub.frequency}
                                category={sub.category}
                                paymentMethod={sub.paymentMethod}
                                status={sub.status}
                                renewalDate={sub.renewalDate}
                            />
                        ))}

                    </div>
                </div>
            )}
        </>
    )
}

export default Subscriptions