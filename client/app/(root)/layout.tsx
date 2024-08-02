import type { Metadata } from "next";
import "../globals.css";
import { Prompt } from 'next/font/google';
import Navbar from "@/components/shared/Navbar";

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
        <html lang="en">
            <body className={prompt.variable}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
