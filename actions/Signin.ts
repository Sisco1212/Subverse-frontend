"use server";

import { signinSchema } from "@/schemas/auth.schema";
import { cookies } from "next/headers";


const SignIn = async(
    previousState: any,
    formData: FormData
) => {
    try {
        const url = `${process.env.BASE_URL}/auth/sign-in`

        const userDetails = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        const validationResult = signinSchema.safeParse(userDetails);

        if(!validationResult.success) {
            return {
                success: false,
                message: validationResult.error.issues[0].message
            }
        }

        const validatedData = validationResult.data;

        const res =  await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(validatedData)
        })

        const data = await res.json();

        if(!res.ok) {
            throw new Error(`${data.error}`)
        }

        console.log(data);

        const cookieStore = await cookies();

cookieStore.set("token", data.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
});

        return data;


    } catch (error) {
       
        return {
            success: false,
            message: error instanceof Error ?
            error.message
            : "Something went wrong"

        }
    }
}

export default SignIn