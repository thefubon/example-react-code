/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'site.prod.cdn.gazprombonus.ru',
      },
    ],
  },
}

export default nextConfig
