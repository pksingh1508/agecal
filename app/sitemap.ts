import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yourage.info", // Replace with your actual domain
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
