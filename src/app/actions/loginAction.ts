"use server"

import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

async function loginAction() {
    const session = await getServerSession(authOptions);

    if (session) {

        return { user: session.user };

    } else {

        throw new Error("Authentication failed");

    }
}

export default loginAction;