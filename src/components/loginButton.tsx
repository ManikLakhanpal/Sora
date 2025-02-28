"use client";

import { signIn, signOut, useSession } from "next-auth/react";

function LoginButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <button
        onClick={() => signOut()}
        className="border-2 py-2 px-6 mx-5 bg-red-500 rounded-lg text-white"
      >
        Sign Out
      </button>
    );
  }
  return (
    <button
      onClick={() => signIn()}
      className="border-2 py-2 px-6 mx-5 bg-zinc-800 rounded-lg text-white"
    >
      Sign In
    </button>
  );
}

export default LoginButton;
