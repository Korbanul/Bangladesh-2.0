/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                // destination: "https://bangladesh-20-backend-production.up.railway.app/:path*"
                // destination: "https://bangladesh-20-backend-production-07c7.up.railway.app/:path*"
                destination: "https://bangladesh-20-backend-production.up.railway.app/:path*"
                
                // destination: "http://localhost:8080/:path*"

            },

        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**"
            }
        ]
    }
    // Next.js <Image> component blocks external image domains by default for security — 
    // it prevents from loading images from unknown/malicious sources. 
    // You explicitly whitelist trusted domains in config.
};

export default nextConfig;

