"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Logout } from "@/actions/Signout"

interface User {
    name: string
    email: string
}

interface UserMenuProps {
    user: User | null
}

const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-cyan-500",
    "bg-yellow-500",
    "bg-red-500"
]

const getAvatarColor = (name: string) => {

    if (!name) {
        return colors[0]
    }

    const total = name
        .split("")
        .reduce((sum, character) => sum + character.charCodeAt(0), 0)

    return colors[total % colors.length]
}

const UserMenu = ({ user }: UserMenuProps) => {

    const router = useRouter()
    const menuRef = useRef<HTMLDivElement>(null)

    const [open, setOpen] = useState(false)
    const [loggingOut, setLoggingOut] = useState(false)

    const name = user?.name || "User"
    const email = user?.email || ""
    const initial = name.charAt(0).toUpperCase()
    const avatarColor = getAvatarColor(name)

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )
        }

    }, [])

       const handleLogout = async () => {
        setLoggingOut(true)

        try {
            const result = await Logout()

            if (!result.success) {
                setLoggingOut(false)
                return
            }

            router.push("/signin")
            router.refresh()
        } catch (error) {
            console.error("Logout error:", error)
            setLoggingOut(false)
        }
    }

    return (
        <div
            ref={menuRef}
            className="relative"
        >

            {/* Avatar */}
            <button
                type="button"
                onClick={() => setOpen((previous) => !previous)}
                aria-label="Open account menu"
                aria-expanded={open}
                className={`cursor-pointer flex h-10 w-10 items-center justify-center rounded-full ${avatarColor} text-sm font-bold text-white transition hover:scale-105 focus:outline-none`}
            >
                {initial}
            </button>

            {/* Account dropdown */}
            <div
                className={`absolute right-0 top-13 z-50 w-64 origin-top-right rounded-xl border border-gray-800 bg-[#111] p-2 shadow-2xl transition-all duration-200 ${
                    open
                        ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                }`}
            >

                {/* User information */}
                <div className="px-3 py-3">

                    <div className="flex items-center gap-3">

                        <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${avatarColor} text-sm font-bold text-white`}
                        >
                            {initial}
                        </div>

                        <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-white">
                                {name}
                            </p>

                            <p className="truncate text-xs text-gray-500">
                                {email}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Divider */}
                <div className="my-1 border-t border-gray-800" />

                {/* Logout */}
                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loggingOut ? "Logging out..." : "Log out"}
                </button>

            </div>

        </div>
    )
}

export default UserMenu