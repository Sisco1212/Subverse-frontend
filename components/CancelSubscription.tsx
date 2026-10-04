"use client"

import { CancelSubscription } from "@/actions/Subscription"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CancelSubscriptionBtn = ({ id }: { id: string }) => {
    const router = useRouter()

    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleCancel = async () => {
        setLoading(true)
        setError("")

        const result = await CancelSubscription(id)

        setLoading(false)

        if (!result.success) {
            setError(result.message)
            return
        }

        router.push("/subscriptions")
        router.refresh()
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="rounded-md border border-gray-700 px-4 py-2 text-left text-sm transition hover:bg-[#1a1a1a]"
            >
                Cancel Subscription
            </button>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">

                    <div className="w-full max-w-md rounded-xl border border-gray-800 bg-[#111] p-6 shadow-2xl">

                        <h2 className="text-lg font-semibold text-white">
                            Cancel subscription?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-400">
                            Are you sure you want to cancel this subscription?
                            You can still keep its record, but it will no
                            longer be active.
                        </p>

                        {error && (
                            <p className="mt-4 text-sm text-red-400">
                                {error}
                            </p>
                        )}

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={() => setShowConfirm(false)}
                                disabled={loading}
                                className="rounded-md border border-gray-700 px-4 py-2 text-sm text-white transition hover:bg-[#1a1a1a] disabled:opacity-50"
                            >
                                Keep subscription
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={loading}
                                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
                            >
                                {loading ? "Cancelling..." : "Yes, cancel"}
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    )
}

export default CancelSubscriptionBtn