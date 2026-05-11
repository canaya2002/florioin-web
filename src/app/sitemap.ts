import type { MetadataRoute } from "next";

import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog";
import { CAREERS } from "@/lib/careers";
import { CHANGELOG } from "@/lib/changelog";
import { INDUSTRIES } from "@/lib/constants";
import { CUSTOMERS } from "@/lib/customers";
import { RESOURCES } from "@/lib/resources";
import { locales } from "@/i18n/locales";
import { SITE } from "@/lib/constants";

const STATIC_ROUTES = [
  "",
  "/product",
  "/product/ai-copilot",
  "/product/tasks",
  "/product/docs",
  "/product/inbox",
  "/product/integrations",
  "/solutions",
  "/customers",
  "/pricing",
  "/about",
  "/careers",
  "/blog",
  "/changelog",
  "/resources",
  "/security",
  "/request-access",
  "/legal/privacy",
  "/legal/terms",
  "/legal/dpa",
  "/legal/cookies",
];

function makeAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((l) => [l, `${SITE.url}/${l}${path}`]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Static routes × locales
  for (const locale of locales) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${SITE.url}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: makeAlternates(route),
      });
    }

    // Industry pages
    for (const industry of INDUSTRIES) {
      entries.push({
        url: `${SITE.url}/${locale}/solutions/${industry}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: makeAlternates(`/solutions/${industry}`),
      });
    }

    // Blog posts and categories
    for (const post of BLOG_POSTS) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: makeAlternates(`/blog/${post.slug}`),
      });
    }
    for (const cat of BLOG_CATEGORIES) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/category/${cat}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.4,
        alternates: makeAlternates(`/blog/category/${cat}`),
      });
    }

    // Changelog versions
    for (const entry of CHANGELOG) {
      entries.push({
        url: `${SITE.url}/${locale}/changelog/${entry.version}`,
        lastModified: new Date(entry.releasedAt),
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: makeAlternates(`/changelog/${entry.version}`),
      });
    }

    // Career postings
    for (const job of CAREERS) {
      entries.push({
        url: `${SITE.url}/${locale}/careers/${job.slug}`,
        lastModified: new Date(job.postedAt),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: makeAlternates(`/careers/${job.slug}`),
      });
    }

    // Customer stories
    for (const customer of CUSTOMERS) {
      entries.push({
        url: `${SITE.url}/${locale}/customers/${customer.slug}`,
        lastModified: new Date(customer.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: makeAlternates(`/customers/${customer.slug}`),
      });
    }

    // Resources
    for (const resource of RESOURCES) {
      entries.push({
        url: `${SITE.url}/${locale}/resources/${resource.slug}`,
        lastModified: new Date(resource.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: makeAlternates(`/resources/${resource.slug}`),
      });
    }
  }

  return entries;
}
