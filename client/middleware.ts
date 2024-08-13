import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes: [
        '/',
        '/about',
        '/shop',
        '/shop/:id',
        '/cart',
        '/contact',
        '/api/webhook/clerk'
    ]
});

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)',
        '/(api|trpc)(.*)',
        '/checkout'
    ]
};