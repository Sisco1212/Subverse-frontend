"use client";

import { useActionState } from "react";
import SignUp from "@/actions/Signup";

const SignupForm = () => {
  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(SignUp, initialState);

  return (
    <form action={formAction} className="space-y-6">

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/45"
        >
          Name
        </label>

        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          className="h-14 w-full border border-white/15 bg-white/[0.04] px-4 text-[15px] text-white outline-none transition placeholder:text-white/20 focus:border-white/60 focus:ring-1 focus:ring-white/20"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/45"
        >
          Email
        </label>

        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          className="h-14 w-full border border-white/15 bg-white/[0.04] px-4 text-[15px] text-white outline-none transition placeholder:text-white/20 focus:border-white/60 focus:ring-1 focus:ring-white/20"
          placeholder="you@example.com"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/45"
        >
          Password
        </label>

        <input
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          className="h-14 w-full border border-white/15 bg-white/[0.04] px-4 text-[15px] text-white outline-none transition placeholder:text-white/20 focus:border-white/60 focus:ring-1 focus:ring-white/20"
          placeholder="Create a password"
        />
      </div>

      {state.message && (
        <div
          className={`border px-4 py-3 text-sm ${
            state.success
              ? "border-white/10 bg-white/[0.05] text-white/70"
              : "border-red-400/20 bg-red-400/10 text-red-300"
          }`}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        className="group flex h-14 w-full items-center justify-between bg-white px-5 text-sm font-semibold text-[#111] transition hover:bg-white/90 active:scale-[0.99]"
      >
        <span>Create account</span>

        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
};

export default SignupForm;