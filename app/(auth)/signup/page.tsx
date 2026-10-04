import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-6 py-6 sm:px-10 lg:px-14">

        {/* Brand */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-[-0.04em]"
          >
                <Image
                          src="/logo-white.png"
                          alt="Subverse logo"
                          width={38}
                          height={38}
                          className="mr-2 inline-block"
                        />
          </Link>

          <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
            Start tracking
          </span>
        </header>

        {/* Main */}
        <div className="flex flex-1 items-center justify-center py-16">
          <div className="w-full max-w-[430px]">

            <div className="mb-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                Get started
              </p>

              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.065em]">
                Create account.
              </h1>

              <p className="mt-5 max-w-[360px] text-sm leading-6 text-white/45">
                One place for every subscription you pay for.
              </p>
            </div>

            <SignupForm />

            <p className="mt-8 text-center text-sm text-white/40">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-white underline decoration-white/20 underline-offset-4 transition hover:decoration-white"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.14em] text-white/25">
          <span>Subverse</span>
          <span>Your subscriptions. One place.</span>
        </footer>
      </div>
    </main>
  );
};

export default SignUpPage;