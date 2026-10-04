import SigninForm from "@/components/SigninForm";
import Link from "next/link";
import Image from "next/image";

const SignInPage = () => {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-6 py-6 sm:px-10 lg:px-14">

        {/* Brand */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-[-0.04em]"
          >
            <Image
              src="/logo-black.png"
              alt="Subverse logo"
              width={24}
              height={24}
              className="mr-2 inline-block"
            />
          </Link>

          <span className="text-xs font-medium uppercase tracking-[0.16em] text-black/40">
            Subscription management
          </span>
        </header>

        {/* Main */}
        <div className="flex flex-1 items-center justify-center py-16">
          <div className="w-full max-w-[430px]">

            <div className="mb-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                Welcome back
              </p>

              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.065em]">
                Sign in.
              </h1>

              <p className="mt-5 max-w-[360px] text-sm leading-6 text-black/50">
                Keep your subscriptions organized, visible, and under control.
              </p>
            </div>

            <SigninForm />

            <p className="mt-8 text-center text-sm text-black/45">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-black underline decoration-black/20 underline-offset-4 transition hover:decoration-black"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t border-black/10 pt-5 text-[11px] uppercase tracking-[0.14em] text-black/35">
          <span>Subverse</span>
          <span>Manage what matters</span>
        </footer>
      </div>
    </main>
  );
};

export default SignInPage;