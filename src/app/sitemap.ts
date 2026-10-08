import type { MetadataRoute } from "next";
import { SITE } from "@/site";
import { PROJECTS } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/about", "/contact"].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
  const caseStudies = PROJECTS.map((project) => ({
    url: `${SITE.url}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...routes, ...caseStudies];
}
