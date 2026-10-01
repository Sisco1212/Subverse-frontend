"use client"
import { CancelSubscription } from "@/actions/Subscription"
import { useRouter } from "next/navigation"


const CancelSubscriptionBtn = ({id}: {id: string}) => {
    const router = useRouter();

  const handleCancel = async () => {
        const result = await CancelSubscription(id)

        if (!result.success) {
            console.log(result.message)
            return
        }

        router.push("/subscriptions")
        router.refresh()
    }
    return (
        <button 
        onClick={handleCancel}
        className="bg-blue-700 p-2 border">
            Cancel
        </button>
    )
}


export default CancelSubscriptionBtn