"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function NavigationBar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="border-b flex justify-between items-center dark:border-gray-700 border-gray-200 py-4 px-6">
      <Link href="/">
      <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Sora AI Chat
      </h1>
      </Link> 
      <div className="flex items-center space-x-4">
        <button
          className="p-2 border dark:border-gray-700 border-gray-200 rounded"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session.user?.image || ""} />
                <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
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

