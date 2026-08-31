/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**', // Matches any path under this domain
            },
        ],
    },
};

export default nextConfig;
