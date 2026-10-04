import { cookies } from "next/headers"
import { jwtDecode } from "jwt-decode"
import UserMenu from "./UserMenu"
import Image from "next/image"
import Link from "next/link"

interface JwtPayload {
    userId?: string
}

interface User {
    name: string
    email: string
}

const Navbar = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    let user: User | null = null

    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token)
            const userId = decoded.userId

            if (userId) {
                const res = await fetch(
                    `${process.env.BASE_URL}/users/${userId}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        cache: "no-store",
                    }
                )

                if (res.ok) {
                    const data = await res.json()
                    user = data.data
                }
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error)
        }
    }

    return (
        <div className="w-full flex justify-between p-8 border-b border-gray-800 items-center">
            <Link href="/" className="flex items-center gap-3">
                <Image 
                src="/logo-white.png"
                width="38"
                height="38"
                alt="logo"
                />
                <h1 className="text-white text-3xl font-bold">
                    Subverse
                </h1>
            </Link>

            <UserMenu user={user} />
        </div>
    )
}

export default Navbar