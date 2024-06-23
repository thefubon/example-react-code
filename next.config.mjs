/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: true,
  },
  images: {
    domains: ['site.prod.cdn.gazprombonus.ru'],
  },
}

export default nextConfig
