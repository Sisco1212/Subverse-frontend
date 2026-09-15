"use server";

const SignUp = async(
    previousState: any,
    formData: FormData
) => {

    try {

        const userData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        }
        const url = `${process.env.BASE_URL}/auth/sign-up`;

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })

        const data = await res.json();
        console.log("STATUS:", res.status);
console.log("RESPONSE:", data);
        if(!res.ok) {
            // throw new Error(`Failed to fetch ${res.status}: ${res.statusText}`)
            throw new Error(`${data.error}`)
        }

        
        console.log(data);
        return data;
        
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: error instanceof Error ?
            error.message 
            : "Something went wrong"
        }
    }
}


export default SignUp