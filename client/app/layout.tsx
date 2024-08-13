import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Barlow, Sen } from 'next/font/google';
import Aos from '@/components/shared/Aos';

const barlow = Barlow({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-barlow'
});

const sen = Sen({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-sen'
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
                <body className={`${barlow.variable} ${sen.variable} font-sen`}>
                    <Aos />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}