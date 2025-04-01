"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, SunMoon, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function NavigationBar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user, signIn, logOut } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b flex justify-between items-center dark:border-gray-700 border-gray-200 py-4 px-6 bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md">
      <Link href="/">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Sora AI Chat
        </h1>
      </Link> 
      <div className="flex items-center space-x-4">
        <button
          className="p-2 border dark:border-gray-700 border-gray-200 rounded"
          onClick={() => setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark")}
        >
          {theme === "dark" ? <Sun /> : theme === "light" ? <Moon /> : <SunMoon />}
        </button>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/signin">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logOut}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/signin">
            <User className="cursor-pointer" />
          </Link>
        )}
      </div>
    </header>
  )
}

export default NavigationBar