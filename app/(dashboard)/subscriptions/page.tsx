import Subscriptions from "@/components/Subscriptions"
import Link from "next/link"

const SubscriptionsPage = () => {

    return (
        <div className="w-10/12 lg:w-8/12 m-auto">

            <div className="w-full flex flex-col md:flex-row justify-between md:items-center items-start gap-6 mt-8">
                <div>
                    <h1 className="text-white font-bold text-3xl">
                        Subscriptions
                    </h1>
                    <p className="text-gray-400 mt-3">
                        Manage and track your subscriptions
                    </p>
                </div>

                <Link href={`/subscriptions/create`} className="bg-white font-semibold p-2 rounded-md text-black">
                    + Add Subscription
                </Link>
            </div>

            <Subscriptions />

        </div>
    )
}

export default SubscriptionsPage