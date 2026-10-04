"use client"

import { DeleteSubscription } from "@/actions/Subscription"
import { useRouter } from "next/navigation"
import { useState } from "react"

const DeleteSubscriptionBtn = ({ id }: { id: string }) => {
    const router = useRouter()

    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleDelete = async () => {
        setLoading(true)
        setError("")

        const result = await DeleteSubscription(id)

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
                className="rounded-md px-4 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10"
            >
                Delete subscription
            </button>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">

                    <div className="w-full max-w-md rounded-xl border border-gray-800 bg-[#111] p-6 shadow-2xl">

                        <h2 className="text-lg font-semibold text-white">
                            Delete subscription?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-400">
                            Are you sure you want to delete this subscription?
                            This action cannot be undone.
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
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={loading}
                                className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Yes, delete"}
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    )
}

export default DeleteSubscriptionBtn