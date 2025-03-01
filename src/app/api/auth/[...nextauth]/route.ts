import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/Schema/Users";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await dbConnect();

      try {
        // Check if user exists
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user
          await User.create({
            name: user.name,
            email: user.email,
            avatar: user.image,
          });
        }

        return true;
      } catch (error) {
        console.error("Error saving user:", error);
        return false;
      }
    },
    async session({ session }) {
      await dbConnect();
      const dbUser = await User.findOne({ email: session.user?.email });

      if (dbUser) {
        session.user!.name = dbUser.name;
        session.user!.image = dbUser.avatar;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
