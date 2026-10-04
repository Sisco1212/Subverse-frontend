import { ISubscription } from "@/types/Subscription"
import Link from "next/link"
import { formatRenewalDate } from "@/utils/formatRenewalDate"
import { getCurrencySymbol } from "@/utils/currency"



const SubscriptionCard = ({
    _id,
    name,
    price,
    currency,
    frequency,
    renewalDate,
    category,
    status
}: ISubscription) => {

    const categoryColors: Record<string, string> = {
        Entertainment: "bg-red-500 text-white",
        Technology: "bg-blue-500 text-white",
        Finance: "bg-emerald-500 text-white",
        Lifestyle: "bg-pink-500 text-white",
        News: "bg-orange-500 text-white",
        Politics: "bg-purple-500 text-white",
        Others: "bg-gray-500 text-white",
    }

    const initial = name.charAt(0).toUpperCase()

    const categoryColor =
        categoryColors[category] ??
        categoryColors.Others

    return (
        <Link
            href={`/subscriptions/${_id}`}
            className="grid min-w-175 grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center border-t border-gray-800 px-6 py-4 text-white transition-colors hover:bg-[#1c1c1c]"
        >
            {/* Name */}
            <div className="flex items-center gap-3">
                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${categoryColor}`}
                >
                    {initial}
                </div>

                <span className="font-bold">
                    {name}
                </span>
            </div>

            {/* Cost */}
            <div className="font-bold">
                {getCurrencySymbol(currency)}{price.toFixed(2)}
            </div>


            {/* Next Charge */}
            <div className="text-gray-400">
                {formatRenewalDate(renewalDate)}
            </div>

            {/* Frequency */}
            <div className="text-gray-400">
                {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
            </div>
            <div className="text-gray-400 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${status === "active" ? "bg-green-500" : "bg-red-500"}`}></div> <p>{status}</p>
            </div>
        </Link>
    )
}

export default SubscriptionCard