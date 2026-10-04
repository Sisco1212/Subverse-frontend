"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const features = [
    {
        number: "01",
        title: "One command center",
        description:
            "See every subscription, payment date, price and category from one beautifully organized workspace.",
        className: "lg:col-span-7",
    },
    {
        number: "02",
        title: "Never miss a renewal",
        description:
            "Subverse keeps an eye on upcoming payments and reminds you before they happen.",
        className: "lg:col-span-5",
    },
    {
        number: "03",
        title: "Know where your money goes",
        description:
            "Turn scattered recurring payments into a clear picture of your monthly and yearly spending.",
        className: "lg:col-span-5",
    },
    {
        number: "04",
        title: "Built around your life",
        description:
            "Organize subscriptions by category, payment method, frequency and more.",
        className: "lg:col-span-7",
    },
];

const subscriptions = [
    {
        name: "Netflix",
        category: "Entertainment",
        price: "$15.49",
        color: "#E50914",
        initials: "N",
        days: "2 days",
    },
    {
        name: "Figma",
        category: "Design",
        price: "$15.00",
        color: "#A8C7FA",
        initials: "F",
        days: "8 days",
    },
    {
        name: "Spotify",
        category: "Music",
        price: "$10.99",
        color: "#B7D8FF",
        initials: "S",
        days: "14 days",
    },
];

function Reveal({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add("is-visible");
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px",
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

function CountUp({
    value,
    suffix = "",
}: {
    value: number;
    suffix?: string;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        let started = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started) return;

                started = true;

                const duration = 1200;
                const startTime = performance.now();

                const animate = (currentTime: number) => {
                    const progress = Math.min(
                        (currentTime - startTime) / duration,
                        1,
                    );

                    const eased = 1 - Math.pow(1 - progress, 3);

                    setCount(Math.floor(eased * value));

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };

                requestAnimationFrame(animate);
                observer.disconnect();
            },
            { threshold: 0.5 },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [value]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

function ArrowUpRight() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M3 12L12 3M5 3H12V10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function LogoMark({ light = false }: { light?: boolean }) {
    return (
        <div
            className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${light ? "bg-white text-black" : "bg-[#b9dcff] text-black"
                }`}
        >
            <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M4 3.5V13.5M4 8.5H10.5C12.157 8.5 13.5 7.157 13.5 5.5C13.5 3.843 12.157 2.5 10.5 2.5H4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}

export default function LandingPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-[#b9dcff] selection:text-black">
            {/* Ambient background */}
            <div
                className="pointer-events-none fixed inset-0 -z-10"
                aria-hidden="true"
            >
                <div className="absolute left-1/2 top-[-300px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[#b9dcff]/[0.055] blur-[130px]" />
                <div className="absolute right-[-200px] top-[45%] h-[500px] w-[500px] rounded-full bg-[#b9dcff]/[0.025] blur-[120px]" />
            </div>

            {/* Navigation */}
            <header className="absolute left-0 right-0 top-0 z-50">
                <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
                    <Link href="/" className="group flex items-center gap-2.5">
                        <Image
                            src={"/logo-white.png"}
                            width={30}
                            height={30}
                            alt={"logo"}
                        />
                        <span className="text-[30px] font-semibold tracking-[-0.02em]">
                            Subverse
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        <a
                            href="#features"
                            className="text-[15px] text-white/45 transition-colors hover:text-white"
                        >
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="text-[15px] text-white/45 transition-colors hover:text-white"
                        >
                            How it works
                        </a>
                        <a
                            href="#insights"
                            className="text-[15px] text-white/45 transition-colors hover:text-white"
                        >
                            Insights
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="hidden text-[13px] text-white/55 transition-colors hover:text-white sm:block"
                        >
                            Log in
                        </Link>

                        <Link
                            href="/signup"
                            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
                        >
                            <span>Get started</span>
                            <ArrowUpRight />
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section className="relative flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8 lg:px-12">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_0%,transparent_80%)]" />

                <div className="mx-auto w-full max-w-[1400px]">
                    <div className="mx-auto max-w-[1050px] text-center">
                        <Reveal>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 backdrop-blur-md">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#b9dcff]" />
                                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
                                    Your subscriptions, under control
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={80}>
                            <h1 className="mx-auto max-w-[1000px] text-[clamp(4rem,9.5vw,9rem)] font-medium leading-[0.84] tracking-[-0.075em]">
                                <span className="block">Take back</span>
                                <span className="relative inline-block">
                                    your money.
                                    <span className="absolute -bottom-3 left-[4%] h-[2px] w-[92%] origin-left animate-[lineGrow_1.2s_0.8s_both] bg-[#b9dcff]/80" />
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={160}>
                            <p className="mx-auto mt-9 max-w-[530px] text-[15px] leading-7 text-white/40 sm:text-[16px]">
                                Subverse gives you one calm, intelligent place to track
                                subscriptions, understand recurring spending, and never get
                                surprised by a renewal again.
                            </p>
                        </Reveal>

                        <Reveal delay={240}>
                            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Link
                                    href="/signup"
                                    className="group flex min-w-[170px] items-center justify-center gap-3 rounded-full bg-[#b9dcff] px-6 py-3.5 text-[13px] font-semibold text-black shadow-[0_0_50px_rgba(185,220,255,0.12)] transition-all duration-300 hover:scale-[1.025] hover:shadow-[0_0_70px_rgba(185,220,255,0.2)]"
                                >
                                    Start for free
                                    <ArrowUpRight />
                                </Link>

                                <a
                                    href="#features"
                                    className="flex min-w-[170px] items-center justify-center rounded-full border border-white/10 bg-white/[0.025] px-6 py-3.5 text-[13px] font-medium text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                                >
                                    Explore Subverse
                                </a>
                            </div>
                        </Reveal>
                    </div>

                    {/* Hero product preview */}
                    <Reveal delay={350} className="mt-20 sm:mt-24">
                        <div className="relative mx-auto max-w-[1100px]">
                            <div className="absolute -inset-10 -z-10 rounded-[50%] bg-[#b9dcff]/[0.045] blur-[90px]" />

                            <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0b0b0c] shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
                                {/* Window top */}
                                <div className="flex h-11 items-center border-b border-white/[0.07] px-4">
                                    <div className="flex gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                    </div>

                                    <div className="mx-auto hidden rounded-md border border-white/[0.06] bg-white/[0.025] px-12 py-1 text-[8px] text-white/20 sm:block">
                                        app.subverse
                                    </div>

                                    <div className="w-12" />
                                </div>

                                {/* Dashboard */}
                                <div className="grid min-h-[430px] grid-cols-[150px_1fr]">
                                    <aside className="hidden border-r border-white/[0.06] p-4 sm:block">
                                        <div className="mb-8 flex items-center gap-2">
                                             <Image
                            src={"/logo-white.png"}
                            width={20}
                            height={20}
                            alt={"logo"}
                        />
                                            <span className="text-[10px] font-semibold">
                                                subverse
                                            </span>
                                        </div>

                                        <div className="space-y-1">
                                            {["Overview", "Subscriptions", "Insights"].map(
                                                (item, index) => (
                                                    <div
                                                        key={item}
                                                        className={`rounded-lg px-3 py-2 text-[9px] ${index === 0
                                                                ? "bg-white/[0.07] text-white"
                                                                : "text-white/25"
                                                            }`}
                                                    >
                                                        {item}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </aside>

                                    <div className="p-5 sm:p-7">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                                                    Overview
                                                </p>
                                                <h3 className="mt-1 text-lg font-medium tracking-tight sm:text-2xl">
                                                    Good evening.
                                                </h3>
                                            </div>

                                            <div className="hidden rounded-full border border-white/[0.08] px-3 py-1.5 text-[8px] text-white/30 sm:block">
                                                October 2026
                                            </div>
                                        </div>

                                        <div className="mt-7 grid gap-3 sm:grid-cols-3">
                                            {[
                                                ["$128.47", "Monthly spend"],
                                                ["$1,541.64", "Yearly projection"],
                                                ["08", "Active subscriptions"],
                                            ].map(([value, label], index) => (
                                                <div
                                                    key={label}
                                                    className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4"
                                                >
                                                    <div className="text-lg font-medium tracking-tight sm:text-xl">
                                                        {value}
                                                    </div>
                                                    <div className="mt-1 text-[8px] uppercase tracking-[0.12em] text-white/25">
                                                        {label}
                                                    </div>

                                                    {index === 0 && (
                                                        <div className="mt-4 h-[2px] overflow-hidden rounded-full bg-white/[0.06]">
                                                            <div className="h-full w-[64%] rounded-full bg-[#b9dcff]" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.018] p-4 sm:p-5">
                                            <div className="mb-4 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[11px] font-medium">
                                                        Upcoming renewals
                                                    </p>
                                                    <p className="mt-0.5 text-[8px] text-white/25">
                                                        Keep an eye on what&apos;s next
                                                    </p>
                                                </div>

                                                <span className="text-[8px] text-[#b9dcff]/70">
                                                    View all
                                                </span>
                                            </div>

                                            <div className="space-y-2">
                                                {subscriptions.map((subscription) => (
                                                    <div
                                                        key={subscription.name}
                                                        className="flex items-center justify-between rounded-lg border border-white/[0.045] bg-black/20 px-3 py-2.5"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="flex h-7 w-7 items-center justify-center rounded-lg text-[9px] font-bold"
                                                                style={{
                                                                    backgroundColor: `${subscription.color}20`,
                                                                    color: subscription.color,
                                                                }}
                                                            >
                                                                {subscription.initials}
                                                            </div>

                                                            <div>
                                                                <p className="text-[9px] font-medium">
                                                                    {subscription.name}
                                                                </p>
                                                                <p className="text-[7px] text-white/25">
                                                                    {subscription.category}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-5">
                                                            <div className="text-right">
                                                                <p className="text-[9px]">
                                                                    {subscription.price}
                                                                </p>
                                                                <p className="text-[7px] text-white/25">
                                                                    / month
                                                                </p>
                                                            </div>

                                                            <span className="hidden rounded-full bg-[#b9dcff]/10 px-2 py-1 text-[7px] text-[#b9dcff] sm:block">
                                                                {subscription.days}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating notification */}
                            <div className="absolute -right-3 bottom-10 hidden w-[180px] animate-[float_5s_ease-in-out_infinite] rounded-xl border border-white/10 bg-[#101011]/90 p-3 shadow-2xl backdrop-blur-xl sm:block lg:-right-16">
                                <div className="flex items-start gap-2.5">
                                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#b9dcff]/10 text-[#b9dcff]">
                                        <svg width="11" height="11" viewBox="0 0 12 12">
                                            <path
                                                d="M6 1.5v9M1.5 6h9"
                                                stroke="currentColor"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-medium">
                                            Renewal coming up
                                        </p>
                                        <p className="mt-1 text-[7px] leading-3 text-white/30">
                                            Netflix renews in 2 days.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-white/20 sm:flex">
                    <span className="h-px w-8 bg-white/10" />
                    Scroll to explore
                    <span className="h-px w-8 bg-white/10" />
                </div>
            </section>

            {/* TRUST / STATEMENT */}
            <section className="border-y border-white/[0.06] px-5 py-16 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-[1400px]">
                    <Reveal>
                        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-end">
                            <p className="text-[20px] uppercase tracking-[0.2em] text-white/25">
                                The problem
                            </p>

                            <h2 className="max-w-[900px] text-3xl font-medium leading-[1.05] tracking-[-0.045em] text-white/80 sm:text-5xl lg:text-6xl">
                                Small monthly charges become{" "}
                                <span className="text-white">big yearly expenses.</span>
                            </h2>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FEATURES */}
            <section
                id="features"
                className="px-5 py-28 sm:px-8 lg:px-12 lg:py-40"
            >
                <div className="mx-auto max-w-[1400px]">
                    <Reveal>
                        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                            <div>
                                <p className="mb-4 text-[15px] uppercase tracking-[0.2em] text-[#b9dcff]/70">
                                    Everything in one place
                                </p>
                                <h2 className="max-w-[650px] text-4xl font-medium tracking-[-0.055em] sm:text-6xl">
                                    Less tracking.
                                    <br />
                                    More control.
                                </h2>
                            </div>

                            <p className="max-w-[330px] text-md leading-6 text-white/35">
                                Designed to make recurring spending visible without making
                                managing it feel like work.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid gap-3 lg:grid-cols-12">
                        {features.map((feature, index) => (
                            <Reveal
                                key={feature.number}
                                delay={index * 80}
                                className={feature.className}
                            >
                                <div className="group relative h-full min-h-[280px] overflow-hidden rounded-[20px] border border-white/[0.07] bg-white/[0.025] p-7 transition-colors duration-500 hover:border-white/[0.14] sm:p-9">
                                    <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#b9dcff]/[0.035] blur-[70px] transition-opacity duration-500 group-hover:opacity-100" />

                                    <div className="relative flex h-full flex-col justify-between">
                                        <div className="flex items-start justify-between">
                                            <span className="font-mono text-[9px] text-white/20">
                                                {feature.number}
                                            </span>

                                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] text-white/30 transition-all duration-300 group-hover:border-[#b9dcff]/30 group-hover:text-[#b9dcff]">
                                                <ArrowUpRight />
                                            </div>
                                        </div>

                                        <div className="mt-16">
                                            <h3 className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl">
                                                {feature.title}
                                            </h3>
                                            <p className="mt-3 max-w-[470px] text-[13px] leading-6 text-white/35">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Decorative UI */}
                                    {index === 0 && (
                                        <div className="absolute bottom-[-25px] right-[-20px] h-32 w-56 rotate-[-7deg] rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-3 opacity-60 transition-transform duration-700 group-hover:translate-y-[-8px] group-hover:rotate-[-4deg]">
                                            <div className="h-1.5 w-16 rounded-full bg-white/10" />
                                            <div className="mt-3 flex gap-1.5">
                                                {[1, 2, 3, 4, 5].map((item) => (
                                                    <span
                                                        key={item}
                                                        className={`h-12 flex-1 rounded-sm ${item === 4
                                                                ? "bg-[#b9dcff]/40"
                                                                : "bg-white/[0.04]"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {index === 1 && (
                                        <div className="absolute bottom-[-15px] right-[-15px] opacity-50">
                                            <div className="relative h-36 w-36 rounded-full border border-[#b9dcff]/15">
                                                <div className="absolute inset-4 rounded-full border border-[#b9dcff]/10" />
                                                <div className="absolute inset-8 rounded-full border border-[#b9dcff]/10" />
                                                <div className="absolute left-1/2 top-1/2 h-[1px] w-16 origin-left rotate-[-35deg] bg-[#b9dcff]/50" />
                                                <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b9dcff]" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* INSIGHTS */}
            <section
                id="insights"
                className="relative border-y border-white/[0.06] px-5 py-28 sm:px-8 lg:px-12 lg:py-40"
            >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_50%,rgba(185,220,255,0.055),transparent_30%)]" />

                <div className="mx-auto max-w-[1400px]">
                    <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
                        <Reveal>
                            <div>
                                <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-[#b9dcff]/70">
                                    See the bigger picture
                                </p>

                                <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                                    Your spending,
                                    <br />
                                    <span className="text-white/35">made visible.</span>
                                </h2>

                                <p className="mt-7 max-w-[440px] text-sm leading-7 text-white/35">
                                    Once your subscriptions are in one place, patterns start to
                                    appear. Subverse turns recurring payments into information
                                    you can actually use.
                                </p>

                                <Link
                                    href="/signup"
                                    className="mt-8 inline-flex items-center gap-2 border-b border-white/20 pb-1 text-[12px] font-medium transition-colors hover:border-[#b9dcff] hover:text-[#b9dcff]"
                                >
                                    Start tracking
                                    <ArrowUpRight />
                                </Link>
                            </div>
                        </Reveal>

                        <Reveal delay={120}>
                            <div className="relative">
                                <div className="absolute -inset-10 rounded-full bg-[#b9dcff]/[0.035] blur-[80px]" />

                                <div className="relative rounded-[22px] border border-white/[0.08] bg-[#090909] p-5 shadow-2xl sm:p-7">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                                                Monthly overview
                                            </p>
                                            <p className="mt-1 text-sm text-white/70">
                                                Recurring spending
                                            </p>
                                        </div>

                                        <div className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[8px] text-white/25">
                                            This month
                                        </div>
                                    </div>

                                    <div className="mt-10 flex items-end justify-between">
                                        <div>
                                            <div className="text-4xl font-medium tracking-[-0.06em] sm:text-5xl">
                                                $128.47
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 text-[8px]">
                                                <span className="rounded-full bg-[#b9dcff]/10 px-2 py-1 text-[#b9dcff]">
                                                    8 active
                                                </span>
                                                <span className="text-white/25">
                                                    across 5 categories
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10 flex h-[180px] items-end gap-2 border-b border-white/[0.07] pb-0 sm:gap-3">
                                        {[35, 46, 38, 60, 50, 72, 63, 88, 70, 78, 92, 76].map(
                                            (height, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative flex-1"
                                                    style={{ height: `${height}%` }}
                                                >
                                                    <div
                                                        className={`h-full w-full rounded-t-[3px] transition-all duration-500 ${index === 10
                                                                ? "bg-[#b9dcff]"
                                                                : "bg-white/[0.07] group-hover:bg-white/[0.14]"
                                                            }`}
                                                    />
                                                </div>
                                            ),
                                        )}
                                    </div>

                                    <div className="mt-3 flex justify-between text-[7px] uppercase tracking-[0.1em] text-white/20">
                                        {[
                                            "Nov",
                                            "Dec",
                                            "Jan",
                                            "Feb",
                                            "Mar",
                                            "Apr",
                                        ].map((month) => (
                                            <span key={month}>{month}</span>
                                        ))}
                                    </div>

                                    <div className="mt-8 grid grid-cols-3 gap-2">
                                        {[
                                            ["Entertainment", "$43.48"],
                                            ["Productivity", "$34.99"],
                                            ["Other", "$50.00"],
                                        ].map(([label, amount]) => (
                                            <div
                                                key={label}
                                                className="rounded-lg border border-white/[0.05] bg-white/[0.018] p-3"
                                            >
                                                <div className="mb-2 h-1 w-1 rounded-full bg-[#b9dcff]" />
                                                <p className="text-[8px] text-white/30">{label}</p>
                                                <p className="mt-1 text-[10px]">{amount}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* REMINDERS */}
            <section className="px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
                <div className="mx-auto max-w-[1400px]">
                    <Reveal>
                        <div className="mb-16 max-w-[800px]">
                            <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-[#b9dcff]/70">
                                Stay ahead
                            </p>

                            <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                                Your next payment
                                <br />
                                <span className="text-white/30">should never surprise you.</span>
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid gap-3 lg:grid-cols-3">
                        {[
                            {
                                day: "02",
                                month: "OCT",
                                name: "Netflix",
                                amount: "$15.49",
                            },
                            {
                                day: "08",
                                month: "OCT",
                                name: "Figma",
                                amount: "$15.00",
                            },
                            {
                                day: "14",
                                month: "OCT",
                                name: "Spotify",
                                amount: "$10.99",
                            },
                        ].map((item, index) => (
                            <Reveal key={item.name} delay={index * 100}>
                                <div className="group relative overflow-hidden rounded-[18px] border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#b9dcff]/20">
                                    <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-[#b9dcff]/[0.035] blur-[45px]" />

                                    <div className="relative flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025]">
                                                <span className="text-[15px] font-medium">
                                                    {item.day}
                                                </span>
                                                <span className="text-[6px] tracking-[0.15em] text-white/25">
                                                    {item.month}
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-[12px] font-medium">{item.name}</p>
                                                <p className="mt-1 text-[8px] text-white/25">
                                                    Renewal reminder
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-[12px]">{item.amount}</p>
                                    </div>

                                    <div className="relative mt-8 flex items-center gap-2">
                                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                                            <div
                                                className="h-full rounded-full bg-[#b9dcff]"
                                                style={{ width: `${35 + index * 22}%` }}
                                            />
                                        </div>
                                        <span className="text-[7px] text-white/20">
                                            {35 + index * 22}% prepared
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section
                id="how-it-works"
                className="border-y border-white/[0.06] bg-white/[0.012] px-5 py-28 sm:px-8 lg:px-12 lg:py-40"
            >
                <div className="mx-auto max-w-[1400px]">
                    <Reveal>
                        <div className="grid gap-8 lg:grid-cols-[0.65fr_1fr]">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                                    Simple by design
                                </p>
                            </div>

                            <h2 className="max-w-[800px] text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                                From scattered payments
                                <br />
                                to <span className="text-[#b9dcff]">clarity.</span>
                            </h2>
                        </div>
                    </Reveal>

                    <div className="mt-20 grid border-t border-white/[0.07] lg:grid-cols-3">
                        {[
                            {
                                number: "01",
                                title: "Add",
                                description:
                                    "Create your subscriptions in seconds. Name, price, frequency, category and payment details.",
                            },
                            {
                                number: "02",
                                title: "Track",
                                description:
                                    "Subverse organizes everything into one clear dashboard so you always know what's active.",
                            },
                            {
                                number: "03",
                                title: "Stay ahead",
                                description:
                                    "Get timely reminders before renewals and understand how recurring spending adds up.",
                            },
                        ].map((step, index) => (
                            <Reveal key={step.number} delay={index * 100}>
                                <div className="border-b border-white/[0.07] py-9 lg:border-b-0 lg:border-r lg:px-10 lg:first:pl-0 lg:last:border-r-0">
                                    <span className="font-mono text-[9px] text-[#b9dcff]/60">
                                        {step.number}
                                    </span>

                                    <h3 className="mt-16 text-2xl font-medium tracking-[-0.035em]">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 max-w-[300px] text-[13px] leading-6 text-white/30">
                                        {step.description}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="px-5 py-24 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-[1200px]">
                    <div className="grid divide-y divide-white/[0.07] border-y border-white/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                        {[
                            {
                                value: 100,
                                suffix: "%",
                                label: "Visibility",
                            },
                            {
                                value: 24,
                                suffix: "/7",
                                label: "Awareness",
                            },
                            {
                                value: 0,
                                suffix: " surprises",
                                label: "The goal",
                            },
                        ].map((stat, index) => (
                            <Reveal key={stat.label} delay={index * 100}>
                                <div className="py-10 text-center sm:px-8 sm:py-14">
                                    <div className="text-4xl font-medium tracking-[-0.06em] sm:text-5xl">
                                        <CountUp value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-white/25">
                                        {stat.label}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative overflow-hidden px-5 pb-28 pt-20 sm:px-8 lg:px-12 lg:pb-40">
                <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b9dcff]/[0.045] blur-[120px]" />

                <Reveal>
                    <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0a0a] px-6 py-20 text-center sm:px-10 sm:py-28">
                        <div className="mx-auto mb-8 flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#b9dcff] text-black shadow-[0_0_50px_rgba(185,220,255,0.15)]">
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 17 17"
                                fill="none"
                            >
                                <path
                                    d="M4 3.5V13.5M4 8.5H10.5C12.157 8.5 13.5 7.157 13.5 5.5C13.5 3.843 12.157 2.5 10.5 2.5H4"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <h2 className="mx-auto max-w-[800px] text-5xl font-medium leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
                            Your money.
                            <br />
                            <span className="text-white/30">Your view.</span>
                        </h2>

                        <p className="mx-auto mt-7 max-w-[430px] text-sm leading-6 text-white/35">
                            Start building a clearer picture of your recurring spending
                            today.
                        </p>

                        <Link
                            href="/signup"
                            className="group mx-auto mt-9 flex w-fit items-center gap-3 rounded-full bg-[#b9dcff] px-7 py-4 text-[13px] font-semibold text-black transition-all duration-300 hover:scale-[1.025] hover:shadow-[0_0_70px_rgba(185,220,255,0.18)]"
                        >
                            Create your account
                            <ArrowUpRight />
                        </Link>
                    </div>
                </Reveal>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/[0.06] px-5 py-10 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-[1400px]">
                    <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
                        <div>
                            <Link href="/" className="flex items-center gap-2.5">
                                <LogoMark light />
                                <span className="text-[15px] font-semibold tracking-[-0.02em]">
                                    subverse
                                </span>
                            </Link>

                            <p className="mt-4 max-w-[260px] text-[11px] leading-5 text-white/25">
                                A calmer way to understand and manage the subscriptions that
                                shape your monthly spending.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
                            <div>
                                <p className="mb-3 text-[9px] uppercase tracking-[0.15em] text-white/20">
                                    Product
                                </p>
                                <div className="space-y-2">
                                    <a
                                        href="#features"
                                        className="block text-[11px] text-white/40 transition-colors hover:text-white"
                                    >
                                        Features
                                    </a>
                                    <a
                                        href="#insights"
                                        className="block text-[11px] text-white/40 transition-colors hover:text-white"
                                    >
                                        Insights
                                    </a>
                                </div>
                            </div>

                            <div>
                                <p className="mb-3 text-[9px] uppercase tracking-[0.15em] text-white/20">
                                    Account
                                </p>
                                <div className="space-y-2">
                                    <Link
                                        href="/login"
                                        className="block text-[11px] text-white/40 transition-colors hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="block text-[11px] text-white/40 transition-colors hover:text-white"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <p className="mb-3 text-[9px] uppercase tracking-[0.15em] text-white/20">
                                    Subverse
                                </p>
                                <div className="space-y-2">
                                    <span className="block text-[11px] text-white/40">
                                        Privacy
                                    </span>
                                    <span className="block text-[11px] text-white/40">
                                        Terms
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/[0.06] pt-5 sm:flex-row">
                        <p className="text-[9px] text-white/20">
                            © 2026 Subverse. All rights reserved.
                        </p>

                        <p className="text-[9px] text-white/15">
                            Built for a clearer financial life.
                        </p>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #050505;
        }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes lineGrow {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

          .reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
        </main>
    );
}