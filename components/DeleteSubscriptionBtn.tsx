"use client"
import { DeleteSubscription } from "@/actions/Subscription"
import { useRouter } from "next/navigation"


const DeleteSubscriptionBtn = ({id}: {id: string}) => {
    const router = useRouter();

  const handleDelete = async () => {
        const result = await DeleteSubscription(id)

        if (!result.success) {
            console.log(result.message)
            return
        }

        router.push("/subscriptions")
        router.refresh()
    }
    return (
        <button 
        onClick={handleDelete}
        className="bg-red-700 p-2 border">
            Delete
        </button>
    )
}


export default DeleteSubscriptionBtn