import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
