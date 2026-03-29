/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  //
  async rewrites() {
    return [
        {
            source: "/api/:path*",
            // destination: "https://bangladesh-20-backend-production.up.railway.app/:path*"
            destination: "https://bangladesh-20-backend-production-07c7.up.railway.app/:path*"
            // destination: "http://localhost:8080/:path*" //For local use
        }
    ]
}
};

export default nextConfig;

