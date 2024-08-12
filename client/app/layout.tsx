import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Prompt } from 'next/font/google';
import Aos from '@/components/shared/Aos';

const prompt = Prompt({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '900'],
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
                <Aos />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
