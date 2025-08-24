import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"]
    },
    sitemap: "https://yourage.info/sitemap.xml" // Replace with your actual domain
  };
}
