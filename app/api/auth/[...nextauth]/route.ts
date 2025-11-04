import { verifyUser } from "@/functions/auth/verifyUser";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {

                if (!credentials) {
                    return null;
                }
                
                const ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;
                const ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD;

                if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
                    return null;
                }

                if (ADMIN_EMAIL === credentials?.email) {
                    if (ADMIN_PASSWORD === credentials.password) {
                        console.log("Is super admin:")
                        return ({
                           name: "Super Admin",
                           email: ADMIN_EMAIL,
                           id: "fasifbsajfnu3q4ry98yrwywu9pqtypuqwothpq93t9a",
                        });
                    }
                }

                try {

                    const user = await verifyUser(credentials);

                    return ({
                        id: user.userId,
                        email: user.email,
                        name: user.name,
                    })

                } catch (err) {
                    console.log(err);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/",
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
