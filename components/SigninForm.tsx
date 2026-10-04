"use client";

import { useActionState } from "react";
import SignIn from "@/actions/Signin";

const SigninForm = () => {
  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(SignIn, initialState);

  return (
    <form action={formAction} className="space-y-6">

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-black/50"
        >
          Email
        </label>

        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          className="h-14 w-full border border-black/15 bg-white px-4 text-[15px] outline-none transition placeholder:text-black/25 focus:border-black focus:ring-1 focus:ring-black"
          placeholder="you@example.com"
        />
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/50"
          >
            Password
          </label>
        </div>

        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          className="h-14 w-full border border-black/15 bg-white px-4 text-[15px] outline-none transition placeholder:text-black/25 focus:border-black focus:ring-1 focus:ring-black"
          placeholder="••••••••"
        />
      </div>

      {/* Error / success */}
      {state.message && (
        <div
          className={`border px-4 py-3 text-sm ${
            state.success
              ? "border-black/10 bg-black/[0.03] text-black/70"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="group flex h-14 w-full items-center justify-between bg-[#111] px-5 text-sm font-semibold text-white transition hover:bg-black/85 active:scale-[0.99]"
      >
        <span>Continue</span>

        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
};

export default SigninForm;