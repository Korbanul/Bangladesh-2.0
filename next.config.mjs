/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  //
  async rewrites() {
    return [
        {
            source: "/api/:path*",
            destination: "https://bangladesh-20-backend-production.up.railway.app/:path*"
        }
    ]
}
};

export default nextConfig;

