"use client"

import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import GoogleButton from "react-google-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AuthScreen() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false)
    }
  }, [status])

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <CardDescription>{session ? "You are signed in" : "Sign in to access your account"}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Skeleton className="h-24 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
          ) : session ? (
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                <AvatarFallback>
                  {session.user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-medium">{session.user?.name}</h3>
                <p className="text-sm text-muted-foreground">{session.user?.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <GoogleButton onClick={() => signIn("google")} className="mt-2" />
            </div>
          )}
        </CardContent>
        {session && (
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => signOut()}>
              Sign Out
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

