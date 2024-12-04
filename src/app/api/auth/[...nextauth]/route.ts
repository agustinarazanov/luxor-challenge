import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db, { user } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
        } & DefaultSession["user"];
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const dbUser = (
                    await db
                        .select()
                        .from(user)
                        .where(and(eq(user.email, credentials.email)))
                )[0];
                if (!dbUser || !dbUser.password) return null;
                if (await bcrypt.compare(credentials.password, dbUser.password)) return dbUser;
                return null;
            },
        }),
    ],
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.sub = user?.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
