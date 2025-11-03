import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware() {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: [
        "/app/:path*",
    ],
}