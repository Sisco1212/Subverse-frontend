"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UpdateSubscription } from "@/actions/Subscription"
import { getCurrencySymbol } from "@/utils/currency"
import CancelSubscriptionBtn from "./CancelSubscription"
import DeleteSubscriptionBtn from "./DeleteSubscriptionBtn"

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
    renewalDate?: string
}

interface SubscriptionDetailsProps {
    subscription: Subscription
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric"
    })
}

const formatLongDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}

const getNextPaymentDates = (
    renewalDate: string,
    frequency: string,
    count = 4
) => {
    const dates: Date[] = []
    const currentDate = new Date(renewalDate)

    for (let i = 0; i < count; i++) {
        dates.push(new Date(currentDate))

        switch (frequency.toLowerCase()) {
            case "daily":
                currentDate.setDate(currentDate.getDate() + 1)
                break

            case "weekly":
                currentDate.setDate(currentDate.getDate() + 7)
                break

            case "monthly":
                currentDate.setMonth(currentDate.getMonth() + 1)
                break

            case "yearly":
                currentDate.setFullYear(currentDate.getFullYear() + 1)
                break

            default:
                break
        }
    }

    return dates
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
    const [frequency, setFrequency] = useState(
        subscription.frequency.toLowerCase()
    )
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

    const currencySymbol = getCurrencySymbol(subscription.currency)

    const nextPayments = subscription.renewalDate
        ? getNextPaymentDates(
              subscription.renewalDate,
              subscription.frequency
          )
        : []

            const categoryColors: Record<string, string> = {
        Entertainment: "bg-red-500 text-white",
        Technology: "bg-blue-500 text-white",
        Finance: "bg-emerald-500 text-white",
        Lifestyle: "bg-pink-500 text-white",
        News: "bg-orange-500 text-white",
        Politics: "bg-purple-500 text-white",
        Others: "bg-gray-500 text-white",
    }

      const categoryColor =
        categoryColors[category] ??
        categoryColors.Others

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white">

            {/* Header */}
            <div className="border-b border-gray-800">

                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                    <div className="flex items-center gap-4">

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="text-2xl text-gray-400 transition hover:text-white"
                        >
                            ←
                        </button>

                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${categoryColor} text-lg font-bold `}>
                            {subscription.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <div className="flex items-center gap-3">

                                <h1 className="text-xl font-bold">
                                    {subscription.name}
                                </h1>

                                <span
                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                        subscription.status.toLowerCase() === "active"
                                            ? "bg-green-500/15 text-green-400"
                                            : "bg-gray-700 text-gray-300"
                                    }`}
                                >
                                    ● {subscription.status}
                                </span>

                            </div>

                            <p className="mt-1 text-sm text-gray-400">
                                {currencySymbol}
                                {subscription.price} /{" "}
                                {subscription.frequency}
                            </p>
                        </div>

                    </div>

                    {/* Header actions */}
                    {!editing ? (
                        <button
                            type="button"
                            onClick={() => {
                                setMessage("")
                                setEditing(true)
                            }}
                            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
                        >
                            Edit
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={loading}
                                className="rounded-md border border-gray-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1a1a1a] disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={loading}
                                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>

                        </div>
                    )}

                </div>

            </div>

            {/* Tabs */}
            <div className="mx-auto max-w-6xl px-6">

                <div className="flex gap-7 border-b border-gray-800">
                    <button
                        type="button"
                        className="border-b-2 border-white py-4 text-sm font-medium"
                    >
                        Overview
                    </button>
                </div>

            </div>

            {/* Main content */}
            <div className="mx-auto grid max-w-6xl gap-5 px-6 py-6 lg:grid-cols-[1.7fr_1fr]">

                {/* LEFT COLUMN */}
                <div className="space-y-5">

                    {/* General */}
                    <section className="rounded-md border border-gray-800 bg-[#101010]">

                        <div className="border-b border-gray-800 px-5 py-4">
                            <h2 className="font-semibold">
                                General
                            </h2>
                        </div>

                        <div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2">

                            {/* Name */}
                            <div>
                                <p className="mb-2 text-xs text-gray-500">
                                    Name
                                </p>

                                {editing ? (
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm outline-none focus:border-gray-500"
                                    />
                                ) : (
                                    <p className="font-medium">
                                        {subscription.name}
                                    </p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <p className="mb-2 text-xs text-gray-500">
                                    Category
                                </p>

                                {editing ? (
                                    <select
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm outline-none focus:border-gray-500"
                                    >
                                        <option value="Entertainment">
                                            Entertainment
                                        </option>
                                        <option value="Sports">
                                            Sports
                                        </option>
                                        <option value="News">
                                            News
                                        </option>
                                        <option value="Lifestyle">
                                            Lifestyle
                                        </option>
                                        <option value="Technology">
                                            Technology
                                        </option>
                                        <option value="Finance">
                                            Finance
                                        </option>
                                        <option value="Politics">
                                            Politics
                                        </option>
                                        <option value="Other">
                                            Other
                                        </option>
                                    </select>
                                ) : (
                                    <p className="font-medium">
                                        {subscription.category}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <p className="mb-2 text-xs text-gray-500">
                                    Status
                                </p>

                                <p className="font-medium capitalize">
                                    {subscription.status}
                                </p>
                            </div>

                            {/* Payment method */}
                            <div>
                                <p className="mb-2 text-xs text-gray-500">
                                    Payment method
                                </p>

                                {editing ? (
                                     <input
                                        type="text"
                                        value={paymentMethod}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm outline-none focus:border-gray-500"
                                    />
                                ) : (
                                    <p className="font-medium">
                                        {subscription.paymentMethod}
                                    </p>
                                )}
                            </div>

                        </div>

                    </section>

                    {/* Billing */}
                    <section className="rounded-md border border-gray-800 bg-[#101010]">

                        <div className="border-b border-gray-800 px-5 py-4">
                            <h2 className="font-semibold">
                                Billing
                            </h2>
                        </div>

                        <div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2">

                            {/* Price */}
                            <div>
                                <p className="mb-2 text-xs text-gray-500">
                                    Cost
                                </p>

                                {editing ? (
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm outline-none focus:border-gray-500"
                                    />
                                ) : (
                                    <p className="font-medium">
                                        {currencySymbol}
                                        {subscription.price}
                                    </p>
                                )}
                            </div>

                            {/* Currency */}
                            <div>
                                <p className="mb-2 text-xs text-gray-500">
                                    Currency
                                </p>

                                {editing ? (
                                    <select
                                        value={currency}
                                        onChange={(e) =>
                                            setCurrency(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm outline-none focus:border-gray-500"
                                    >
                                        <option value="USD">
                                            USD
                                        </option>
                                        <option value="NGN">
                                            NGN
                                        </option>
                                        <option value="EUR">
                                            EUR
                                        </option>
                                        <option value="GBP">
                                            GBP
                                        </option>
                                    </select>
                                ) : (
                                    <p className="font-medium">
                                        {subscription.currency}
                                    </p>
                                )}
                            </div>

                            {/* Frequency */}
                            <div>
                                <p className="mb-2 text-xs text-gray-500">
                                    Recurrence
                                </p>

                                {editing ? (
                                    <select
                                        value={frequency}
                                        onChange={(e) =>
                                            setFrequency(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm outline-none focus:border-gray-500"
                                    >
                                        <option value="daily">
                                            Daily
                                        </option>
                                        <option value="weekly">
                                            Weekly
                                        </option>
                                        <option value="monthly">
                                            Monthly
                                        </option>
                                        <option value="yearly">
                                            Yearly
                                        </option>
                                    </select>
                                ) : (
                                    <p className="font-medium capitalize">
                                        Repeat every{" "}
                                        {subscription.frequency}
                                    </p>
                                )}
                            </div>

                            {/* Start date */}
                            <div>
                                <p className="mb-2 text-xs text-gray-500">
                                    Start date
                                </p>

                                {editing ? (
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) =>
                                            setStartDate(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm outline-none focus:border-gray-500"
                                    />
                                ) : (
                                    <p className="font-medium">
                                        {formatDate(
                                            subscription.startDate
                                        )}
                                    </p>
                                )}
                            </div>

                            {/* Renewal date */}
                            {subscription.renewalDate && (
                                <div>
                                    <p className="mb-2 text-xs text-gray-500">
                                        Next payment
                                    </p>

                                    <p className="font-medium">
                                        {formatLongDate(
                                            subscription.renewalDate
                                        )}
                                    </p>
                                </div>
                            )}

                        </div>

                    </section>

                    {/* Success / Error message */}
                    {message && (
                        <div className="rounded-md border border-gray-800 bg-[#101010] px-4 py-3">
                            <p className="text-sm text-gray-300">
                                {message}
                            </p>
                        </div>
                    )}

                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-5">

                    {/* Subscription preview */}
                    <section className="rounded-md border border-gray-800 bg-[#101010] p-4">

                        <p className="mb-3 text-xs text-gray-500">
                            Preview
                        </p>

                        <div className="rounded-xl bg-gradient-to-br from-[#222] to-[#111] p-5">

                            <div className="flex items-start justify-between">

                                <div className="flex items-center gap-3">

                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${categoryColor}`}>
                                        {(
                                            editing
                                                ? name
                                                : subscription.name
                                        )
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            {editing
                                                ? name || "Subscription"
                                                : subscription.name}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            {editing
                                                ? category
                                                : subscription.category}
                                        </p>
                                    </div>

                                </div>

                                <div className="text-right">
                                    <p className="font-bold">
                                        {getCurrencySymbol(
                                            editing
                                                ? currency
                                                : subscription.currency
                                        )}
                                        {editing
                                            ? price
                                            : subscription.price}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        /{" "}
                                        {editing
                                            ? frequency
                                            : subscription.frequency}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* Next Payments */}
                    <section className="rounded-md border border-gray-800 bg-[#101010]">

                        <div className="border-b border-gray-800 px-5 py-4">
                            <h2 className="font-semibold">
                                Next Payments
                            </h2>
                        </div>

                        <div className="p-4">

                            {nextPayments.length > 0 ? (
                                <div>
                                    {nextPayments.map((date, index) => (
                                        <div
                                            key={date.toISOString()}
                                            className={`flex items-center justify-between py-3 ${
                                                index !==
                                                nextPayments.length - 1
                                                    ? "border-b border-gray-800"
                                                    : ""
                                            }`}
                                        >
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {formatLongDate(
                                                        date.toISOString()
                                                    )}
                                                </p>

                                                {index === 0 && (
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Next payment
                                                    </p>
                                                )}
                                            </div>

                                            <p className="text-sm font-semibold">
                                                {currencySymbol}
                                                {subscription.price}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No renewal date available.
                                </p>
                            )}

                        </div>

                    </section>

                    {/* Actions */}
                    <section className="rounded-md border border-gray-800 bg-[#101010] p-5">

                        <h2 className="font-semibold">
                            Subscription actions
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Manage the status or permanently remove this
                            subscription.
                        </p>

                        <div className="mt-4 flex flex-col gap-2">

                            {subscription.status.toLowerCase() ===
                                "active" && (
                          <CancelSubscriptionBtn id={subscription._id}/>
                            )}

                          <DeleteSubscriptionBtn id={subscription._id}/>

                        </div>

                    </section>

                </div>

            </div>

        </div>
    )
}

export default SubscriptionDetails