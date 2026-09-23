"use server"

import { subscriptionSchema } from "@/schemas/subscription.schema"
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode"


interface JwtPayload {
    userId: string
}

export const CreateSubscription = async(
    previousState: any,
    formData: FormData
) => {

    try {
        
    
    const userData = {
        name: formData.get("subscription-name"),
        price: formData.get("subscription-price"),
        currency: formData.get("currency"),
        frequency: formData.get("frequency"),
        category: formData.get("category"),
        paymentMethod: formData.get("payment-method"),
        startDate: formData.get("start-date")
    }

    const validationResult = subscriptionSchema.safeParse(userData);

    if(!validationResult.success) {
        return {
            success: false,
            message: validationResult.error.issues[0].message
        }
    }

    const validatedData = validationResult.data;

    const url = `${process.env.BASE_URL}/subscriptions`

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value
    

if (!token) {
    return {
        success: false,
        message: "You are not authenticated"
    };
}

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            
        },
        body: JSON.stringify(validatedData)
    })

    
    const data = await res.json();
    
    if(!res.ok) {
        console.log(`${res.status}, ${data.error}`);
        throw new Error(data.error);
    }

    console.log(data);
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


export const GetSubscriptions  = async() => {

    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value

        if(!token) {
            return {
                success: false,
                message: "You are not authenticated"
            }
        }

        const decoded = jwtDecode<JwtPayload>(token)
        const userId = decoded.userId
        console.log(userId)

        const url = `${process.env.BASE_URL}/subscriptions/user/${userId}`


        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        
        const data = await res.json();
        if(!res.ok) {
            console.log(`${res.status}, ${res.statusText}`)
            throw new Error(`${data.error}`)
        }

        console.log(data)
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

export const GetSubscriptionDetails = async(id: string) => {

    try {
        
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if(!token) {
            return {
                success: false,
                message: "User is not authenticated"
            }
        }

        const url = `${process.env.BASE_URL}/subscriptions/${id}`

        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await res.json();
        if(!res.ok) {
           console.log(`${res.status}: ${res.statusText}`);
           throw new Error(`${data.error}`);
        }

        console.log(data);
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