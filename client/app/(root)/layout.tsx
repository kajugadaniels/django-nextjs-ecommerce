import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex-1">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}