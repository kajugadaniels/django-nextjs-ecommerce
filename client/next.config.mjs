/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "5.walmartimages.com"
            }
        ]
    }
};

export default nextConfig;
