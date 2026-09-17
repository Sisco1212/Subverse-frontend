"use client"

import { useActionState } from "react";
import SignIn from "@/actions/Signin";

const SigninForm = () => {

        const initialState = {
        success: false,
        message: ""
    }

    const [state, formAction] = useActionState(SignIn, initialState);

  return (
    <>
         <div className="mt-20">
            <form action={formAction}>
                <label htmlFor="email">Enter your email:</label>
                <br />
                <input type="email" name="email" id="email" className="border" />
<br />
                <label htmlFor="password">Enter your password:</label>
                <br />
                <input type="password" name="password" className="border" id="password" />
                <br />

             <button className="mt-9 bg-blue-700 text-white p-3 font-bold cursor-pointer" type="submit"> Sign in</button>

       {state.message && (
    <p className={state.success ? "text-green-700" : "text-red-700"}>
        {state.message}
    </p>
)}
            </form>
        </div>
    </>
  )
}

export default SigninForm