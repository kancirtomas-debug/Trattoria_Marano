/** @type {import('next').NextConfig} */
const isMobile = process.env.NEXT_PUBLIC_MOBILE === "true"
const nextConfig = {
  distDir: isMobile ? ".next-mobile" : ".next",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.olinkakancirova.sk" },
      { protocol: "https", hostname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 1080, 1920, 2560, 3840],
    imageSizes: [260, 520, 800],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ]
  },
}

module.exports = nextConfig
