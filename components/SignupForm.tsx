"use client"

import { useActionState } from "react";
import SignUp from "@/actions/Signup";

const SignupForm = () => {

        const initialState = {
        success: false,
        message: ""
    }

    const [state, formAction] = useActionState(SignUp, initialState);

  return (
    <>
         <div className="mt-20">
            <form action={formAction}>
                <label htmlFor="name">Enter your name:</label>
                <br />
                <input type="text" name="name" id="name" className="border" required/>
               <br />
                <label htmlFor="email">Enter your email:</label>
                <br />
                <input type="email" name="email" id="email" className="border" />
<br />
                <label htmlFor="password">Enter your password:</label>
                <br />
                <input type="password" name="password" className="border" id="password" />
                <br />

             <button className="mt-9 bg-blue-700 text-white p-3 font-bold cursor-pointer" type="submit"> Sign up</button>

        {state.error ? (
            <p className="text-red-700">{state.error}</p>
        )
        :
        (
            <p className="">{state.message}</p>
        )
    }
            </form>
        </div>
    </>
  )
}

export default SignupForm