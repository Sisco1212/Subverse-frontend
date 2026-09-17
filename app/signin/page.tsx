import SigninForm from "@/components/SigninForm"

const SignInPage = () => {
  return (
     <div className="flex flex-col h-screen w-full justify-center items-center">
        <h1 className="text-2xl font-bold">Sign in</h1>

       <SigninForm />
        </div>
  )
}

export default SignInPage