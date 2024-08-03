import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Prompt } from 'next/font/google';

const prompt = Prompt({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-prompt'
});

export const metadata: Metadata = {
    title: "E-Green",
    description: "Online green product store",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={prompt.variable}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
