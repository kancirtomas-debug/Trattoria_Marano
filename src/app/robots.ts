import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/blog"],
      },
    ],
    sitemap: "https://www.trattoria-marano.de/sitemap.xml",
    host: "https://www.trattoria-marano.de",
  }
}
