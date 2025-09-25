/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: process.env.BACKEND_PROTOCOL, //'https',
                hostname: process.env.BACKEND_HOST, //'assets.example.com',
                pathname: process.env.BACKEND_MEDIA_PATH, // '/account123/**',
                port: process.env.BACKEND_PORT, // 8000
            },
        ],
    },

    async rewrites() {
        return [
            {
                source: '/media/:path*',
                destination: `${process.env.BACKEND_MEDIA_URL}:path*`, // backend media url
            },
            {
                source: '/static/:path*',
                destination: 'http://localhost:8000/static/:path*', // backend static url
            },
            {
                source: '/uploads/:path*',
                destination: 'http://localhost:8000/uploads/:path*', // backend uploads url
            },
        ]
    },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
