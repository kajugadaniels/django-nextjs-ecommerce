import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({ 
  subsets: ["latin"], 
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Green products online shopping",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={prompt.className}>{children}</body>
        </html>
    );
}
