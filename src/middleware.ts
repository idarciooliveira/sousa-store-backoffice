export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/orders/:path*",
        "/products/:path*",
        "/",
    ]
}