import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yourage.info", // Replace with your actual domain
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: "https://yourage.info", // If you add an about page later
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: "https://yourage.info", // If you add a privacy policy later
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5
    },
    {
      url: "https://yourage.info/", // If you add terms of service later
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5
    }
  ];
}
