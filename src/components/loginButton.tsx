"use client";

import loginAction from "@/app/actions/loginAction";
import { useSession, signIn, signOut } from "next-auth/react";

function LoginButton() {
    async function handleLogin() {
        try {
            const user = await loginAction();
            console.log("User logged in:", user);
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    return (
        <button
            className="border-2 py-2 px-6 mx-5 bg-zinc-800 rounded-lg text-white"
            onClick={() => {signIn("google")}}
        >
            Log In
        </button>
    );
}

export default LoginButton