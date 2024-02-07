import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const endpoint = `${process.env.NEXTAPP_URL}/api/v1/auth/users/auth`

export const authOptions = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30,
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
    },
    callbacks: {
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                },
            };
        },

        jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: 'Email' },
                password: { label: 'Password', type: 'Password' }
            },
            async authorize(credentials) {

                const data = {
                    email: credentials?.username,
                    password: credentials?.password
                }


                const request = await fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const user = await request.json()

                if (user && user.isAdmin) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],

})

export default authOptions