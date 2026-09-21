"use client";

import { CreateSubscription } from "@/actions/Subscription";
import { useActionState } from "react";

const SubscriptionForm = () => {

    const initialState = {
        success: false,
        message: ""
    }

    const [state, formAction] = useActionState(CreateSubscription, initialState)

    return (
        <>
            <form action={formAction}>
                <label>Subscription Name: </label>
                <br />
                <input
                    className="border"
                    type="text"
                    name="subscription-name"
                    required
                />
                <br />

                <label>Subscription Price: </label>
                <br />
                <input
                    className="border"
                    type="number"
                    name="subscription-price"

                />
                <br />

                <label>Currency: </label>
                <br />
                <select
                    className="border"
                    defaultValue="USD"
                    name="currency"
                    required
                >
                    <option value="USD">USD</option>
                    <option value="NGN">NGN</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                </select>
                <br />

                <label>Frequency: </label>
                <br />
                <select
                    className="border"
                    defaultValue="Daily"
                    name="frequency"
                    required
                >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>
                <br />

                <label>Category: </label>
                <br />
                <select
                    className="border"
                    defaultValue="Entertainment"
                    name="category"
                    required
                >
                    <option value="Entertainment">Entertainment</option>
                    <option value="News">News</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Politics">Politics</option>
                    <option value="Others">Others</option>
                </select>
                <br />

                <label>Payment method: </label>
                <br />
                <input
                    className="border"
                    type="text"
                    name="payment-method"
                    required
                />
                <br />

                {/* <label>Status: </label>
                <br />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Expired">Expired</option>
                </select>
                <br /> */}

                <label>Start date: </label>
                <br />
                <input
                    className="border"
                    type="date"
                    name="start-date"
                    required
                />
                <br />

                <button type="submit" className="bg-blue-700 text-white font-bold p-2 mt-3">
                    Submit
                </button>

                {
                    state.message && (
                        <p className={`${state.success ? 'text-green-500' : 'text-red-500'}`}>
                            {state.message}
                        </p>
                    )
                }
            </form>
        </>
    );
};

export default SubscriptionForm;