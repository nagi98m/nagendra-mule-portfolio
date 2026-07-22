import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.url, changeFrequency: "monthly", priority: 1 }, ...projects.map((project) => ({ url: `${siteConfig.url}/projects/${project.slug}`, changeFrequency: "yearly" as const, priority: 0.8 }))];
}
