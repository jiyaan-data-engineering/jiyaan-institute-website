/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()"
          }
        ]
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml"
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400"
          }
        ]
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain"
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400"
          }
        ]
      },
      {
        source: "/:path*",
        has: [
          {
            type: "query",
            key: "utm_source"
          }
        ],
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600"
          }
        ]
      }
    ]
  }
}

export default nextConfig
