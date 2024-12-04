import db, { user } from "@/db/schema";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcrypt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

const authOptions: NextAuthOptions = {
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

export default authOptions;
