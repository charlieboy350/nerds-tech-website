import type { MetadataRoute } from "next";
import { SITE } from "@/site";
import { PROJECTS, SERVICES } from "@/data/content";
import { BLOG_POSTS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/about", "/contact", "/blog"].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route === "/blog" ? 0.9 : 0.8,
  }));
  const caseStudies = PROJECTS.map((project) => ({
    url: `${SITE.url}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const posts = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date + "T12:00:00"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const servicePages = SERVICES.map((service) => ({
    url: `${SITE.url}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...routes, ...caseStudies, ...posts, ...servicePages];
}
