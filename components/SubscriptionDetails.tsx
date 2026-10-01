"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UpdateSubscription } from "@/actions/Subscription"

interface Subscription {
    _id: string
    name: string
    price: number
    currency: string
    frequency: string
    category: string
    paymentMethod: string
    startDate: string
    status: string
}

interface SubscriptionDetailsProps {
    subscription: Subscription
}

const SubscriptionDetails = ({
    subscription
}: SubscriptionDetailsProps) => {

    const router = useRouter()

    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const [name, setName] = useState(subscription.name)
    const [price, setPrice] = useState(subscription.price)
    const [currency, setCurrency] = useState(subscription.currency)
    const [frequency, setFrequency] = useState(subscription.frequency.toLowerCase())
    const [category, setCategory] = useState(subscription.category)
    const [paymentMethod, setPaymentMethod] = useState(
        subscription.paymentMethod
    )
    const [startDate, setStartDate] = useState(
        subscription.startDate.split("T")[0]
    )

    const handleCancel = () => {
        setName(subscription.name)
        setPrice(subscription.price)
        setCurrency(subscription.currency)
        setFrequency(subscription.frequency.toLowerCase())
        setCategory(subscription.category)
        setPaymentMethod(subscription.paymentMethod)
        setStartDate(subscription.startDate.split("T")[0])

        setMessage("")
        setEditing(false)
    }

    const handleSave = async () => {
        setLoading(true)
        setMessage("")

        const result = await UpdateSubscription({
            id: subscription._id,

            original: {
                name: subscription.name,
                price: subscription.price,
                currency: subscription.currency,
                frequency: subscription.frequency.toLowerCase(),
                category: subscription.category,
                paymentMethod: subscription.paymentMethod,
                startDate: subscription.startDate.split("T")[0]
            },

            name,
            price,
            currency,
            frequency,
            category,
            paymentMethod,
            startDate
        })

        setLoading(false)

        if (!result.success) {
            setMessage(result.message)
            return
        }

        setEditing(false)
        setMessage("Subscription updated successfully")

        router.refresh()
    }

    return (
        <div>

            {/* Header */}
            <div>

                 {!editing ? (
                    <button
                        type="button"
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </button>
                ) : (
                    <div>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                )}

                <h1>
                    {editing ? "Edit Subscription" : subscription.name}
                </h1>

               
            </div>

            {/* Name */}
            <div>
                <span>Name</span>

                {editing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <span>{subscription.name}</span>
                )}
            </div>

            {/* Price */}
            <div>
                <span>Price</span>

                {editing ? (
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                ) : (
                    <span>
                        {subscription.currency} {subscription.price}
                    </span>
                )}
            </div>

            {/* Currency */}
            <div>
                <span>Currency</span>

                {editing ? (
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="USD">USD</option>
                        <option value="NGN">NGN</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                ) : (
                    <span>{subscription.currency}</span>
                )}
            </div>

            {/* Frequency */}
            <div>
                <span>Frequency</span>

                {editing ? (
                    <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                ) : (
                    <span>{subscription.frequency}</span>
                )}
            </div>

            {/* Category */}
            <div>
                <span>Category</span>

                {editing ? (
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Entertainment">
                            Entertainment
                        </option>

                        <option value="Software">
                            Software
                        </option>

                        <option value="Education">
                            Education
                        </option>

                        <option value="Health">
                            Health
                        </option>

                        <option value="Finance">
                            Finance
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                ) : (
                    <span>{subscription.category}</span>
                )}
            </div>

            {/* Payment Method */}
            <div>
                <span>Payment Method</span>

                {editing ? (
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="Card">Card</option>
                        <option value="Bank Transfer">
                            Bank Transfer
                        </option>
                        <option value="Cash">Cash</option>
                        <option value="Other">Other</option>
                    </select>
                ) : (
                    <span>{subscription.paymentMethod}</span>
                )}
            </div>

            {/* Start Date */}
            <div>
                <span>Start Date</span>

                {editing ? (
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                ) : (
                    <span>
                        {new Date(
                            subscription.startDate
                        ).toLocaleDateString()}
                    </span>
                )}
            </div>

            <p>{subscription.status}</p>

            {message && (
                <p>{message}</p>
            )}

        </div>
    )
}

export default SubscriptionDetails
