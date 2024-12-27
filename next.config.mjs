/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                pathname: '**', // Match all paths under this hostname
            },
        ],
    },
};

export default nextConfig;
