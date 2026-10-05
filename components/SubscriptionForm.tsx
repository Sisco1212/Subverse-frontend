"use client"

import { CreateSubscription } from "@/actions/Subscription"
import { getCurrencySymbol } from "@/utils/currency"
import { useActionState, useState } from "react"
import { useRouter } from "next/navigation"

const SubscriptionForm = () => {

    const router = useRouter()

    const initialState = {
        success: false,
        message: ""
    }

    const [state, formAction] = useActionState(
        CreateSubscription,
        initialState
    )


    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [currency, setCurrency] = useState("USD")
    const [frequency, setFrequency] = useState("monthly")
    const [category, setCategory] = useState("Entertainment")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [startDate, setStartDate] = useState("")

    const currencySymbol = getCurrencySymbol(currency)

    const getNextPaymentDate = () => {

        if (!startDate) {
            return null
        }

        const date = new Date(`${startDate}T00:00:00`)

        switch (frequency.toLowerCase()) {

            case "daily":
                date.setDate(date.getDate() + 1)
                break

            case "weekly":
                date.setDate(date.getDate() + 7)
                break

            case "monthly":
                date.setMonth(date.getMonth() + 1)
                break

            case "yearly":
                date.setFullYear(date.getFullYear() + 1)
                break

            default:
                return null
        }

        return date
    }

    const nextPaymentDate = getNextPaymentDate()

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    }

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

                    {/* Left side */}
                    <div className="flex items-center gap-4">

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="text-2xl text-gray-400 transition hover:text-white"
                        >
                            ←
                        </button>

                        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${categoryColor}`}>
                            {name
                                ? name.charAt(0).toUpperCase()
                                : "S"}
                        </div>

                        <div>

                            <h1 className="text-xl font-bold">
                                {name || "New Subscription"}
                            </h1>

                            <p className="mt-1 text-sm text-gray-400">
                                {price
                                    ? `${currencySymbol}${price} / ${frequency.toLowerCase()}`
                                    : "Create a new subscription"}
                            </p>

                        </div>

                    </div>

                    {/* Header actions */}
                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-md border border-gray-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1a1a1a]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            form="create-subscription-form"
                            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
                        >
                            Create
                        </button>

                    </div>

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

            {/* Form */}
            <form
                id="create-subscription-form"
                action={formAction}
            >

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
                                    <label
                                        htmlFor="subscription-name"
                                        className="mb-2 block text-xs text-gray-500"
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="subscription-name"
                                        type="text"
                                        name="subscription-name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Netflix"
                                        required
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-gray-500"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="mb-2 block text-xs text-gray-500"
                                    >
                                        Category
                                    </label>

                                    <select
                                        id="category"
                                        name="category"
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                        required
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm text-white outline-none focus:border-gray-500"
                                    >
                                        <option value="Entertainment">
                                            Entertainment
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

                                        <option value="Others">
                                            Others
                                        </option>
                                    </select>
                                </div>

                                {/* Payment method */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="payment-method"
                                        className="mb-2 block text-xs text-gray-500"
                                    >
                                        Payment method
                                    </label>

                                    <input
                                        id="payment-method"
                                        type="text"
                                        name="payment-method"
                                        value={paymentMethod}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        placeholder="Credit card"
                                        required
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-gray-500"
                                    />
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
                                    <label
                                        htmlFor="subscription-price"
                                        className="mb-2 block text-xs text-gray-500"
                                    >
                                        Cost
                                    </label>

                                    <input
                                        id="subscription-price"
                                        type="number"
                                        name="subscription-price"
                                        min="0"
                                        step="0.01"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                        placeholder="19.90"
                                        required
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-gray-500"
                                    />
                                </div>

                                {/* Currency */}
                                <div>
                                    <label
                                        htmlFor="currency"
                                        className="mb-2 block text-xs text-gray-500"
                                    >
                                        Currency
                                    </label>

                                    <select
                                        id="currency"
                                        name="currency"
                                        value={currency}
                                        onChange={(e) =>
                                            setCurrency(e.target.value)
                                        }
                                        required
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm text-white outline-none focus:border-gray-500"
                                    >
                                        <option value="USD">
                                            USD
                                        </option>

                                        <option value="NGN">
                                            NGN
                                        </option>

                                        <option value="GBP">
                                            GBP
                                        </option>

                                        <option value="EUR">
                                            EUR
                                        </option>
                                    </select>
                                </div>

                                {/* Frequency */}
                                <div>
                                    <label
                                        htmlFor="frequency"
                                        className="mb-2 block text-xs text-gray-500"
                                    >
                                        Recurrence
                                    </label>

                                    <select
                                        id="frequency"
                                        name="frequency"
                                        value={frequency}
                                        onChange={(e) =>
                                            setFrequency(e.target.value)
                                        }
                                        required
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm text-white outline-none focus:border-gray-500"
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
                                </div>

                                {/* Start date */}
                                <div>
                                    <label
                                        htmlFor="start-date"
                                        className="mb-2 block text-xs text-gray-500"
                                    >
                                        Start date
                                    </label>

                                    <input
                                        id="start-date"
                                        type="date"
                                        name="start-date"
                                        value={startDate}
                                        onChange={(e) =>
                                            setStartDate(e.target.value)
                                        }
                                        required
                                        className="w-full rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm text-white outline-none focus:border-gray-500"
                                    />
                                </div>

                            </div>

                        </section>

                        {/* Server response */}
                        {state.message && (
                            <div
                                className={`rounded-md border px-4 py-3 ${
                                    state.success
                                        ? "border-green-900 bg-green-950/30"
                                        : "border-red-900 bg-red-950/30"
                                }`}
                            >
                                <p
                                    className={`text-sm ${
                                        state.success
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {state.message}
                                </p>
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-5">

                        {/* Preview */}
                        <section className="rounded-md border border-gray-800 bg-[#101010] p-4">

                            <p className="mb-3 text-xs text-gray-500">
                                Preview
                            </p>

                            <div className="rounded-xl bg-gradient-to-br from-[#222] to-[#111] p-5">

                                <div className="flex items-start justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${categoryColor}`}>
                                            {name
                                                ? name
                                                    .charAt(0)
                                                    .toUpperCase()
                                                : "S"}
                                        </div>

                                        <div>

                                            <p className="font-semibold">
                                                {name ||
                                                    "Subscription"}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                {category}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="text-right">

                                        <p className="font-bold">
                                            {currencySymbol}
                                            {price || "0.00"}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            /{" "}
                                            {frequency.toLowerCase()}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* Next Payment */}
                        <section className="rounded-md border border-gray-800 bg-[#101010]">

                            <div className="border-b border-gray-800 px-5 py-4">
                                <h2 className="font-semibold">
                                    Next Payment
                                </h2>
                            </div>

                            <div className="p-4">

                                {nextPaymentDate ? (
                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-sm font-medium">
                                                {formatDate(
                                                    nextPaymentDate
                                                )}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                First renewal
                                            </p>

                                        </div>

                                        <p className="text-sm font-semibold">
                                            {currencySymbol}
                                            {price || "0.00"}
                                        </p>

                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        Select a start date to see the
                                        next payment.
                                    </p>
                                )}

                            </div>

                        </section>

                    </div>

                </div>

            </form>

        </div>
    )
}

export default SubscriptionForm