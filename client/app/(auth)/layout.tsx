const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="px-72 flex justify-center items-center min-h-screen">
            {children}
        </div>

    )
}

export default Layout