import SignupForm from "@/components/SignupForm";

export default function SignupPage (){

    return(
        <>
        <div className="flex flex-col h-screen w-full justify-center items-center">
        <h1 className="text-2xl font-bold">Sign up</h1>

       <SignupForm />
        </div>
        </>
    )
}