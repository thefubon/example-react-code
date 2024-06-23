/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ['site.prod.cdn.gazprombonus.ru'],
  },
}

export default nextConfig
