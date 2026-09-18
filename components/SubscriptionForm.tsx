"use client";

import { useState } from "react";

const SubscriptionForm = () => {
    const [subscriptionName, setSubscriptionName] = useState("");
    const [subscriptionPrice, setSubscriptionPrice] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [frequency, setFrequency] = useState("Daily");
    const [category, setCategory] = useState("Entertainment");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [startDate, setStartDate] = useState("");

    return (
        <>
            <form action="">
                <label>Subscription Name: </label>
                <br />
                <input
                    className="border"
                    type="text"
                    value={subscriptionName}
                    onChange={(e) => setSubscriptionName(e.target.value)}
                />
                <br />

                <label>Subscription Price: </label>
                <br />
                <input
                    className="border"
                    type="number"
                    value={subscriptionPrice}
                    onChange={(e) => setSubscriptionPrice(e.target.value)}
                />
                <br />

                <label>Currency: </label>
                <br />
                <select
                    className="border"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
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
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <br />
            </form>
        </>
    );
};

export default SubscriptionForm;