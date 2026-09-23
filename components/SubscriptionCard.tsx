import { ISubscription } from "@/types/Subscription"
import Link from "next/link"

const SubscriptionCard = ({
    _id,
    name,
    price,
    currency,
    frequency,
    category,
    paymentMethod,
    startDate,
    status

} : ISubscription) => {

    return (

    <Link href={`/subscriptions/${_id}`}>
        <h1 className="text-xl font-bold">{name}</h1>
        <h2 className="text-lg font-bold">{price}</h2>
        <p className="font-bold">{currency}</p>
        <p className="">{frequency}</p>
        <p className="">{category}</p>
        <p className="">{paymentMethod}</p>
        <p className="">{startDate}</p>
        <p className="">{status}</p>
    </Link>
    )
}


export default SubscriptionCard