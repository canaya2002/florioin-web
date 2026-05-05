import { NextResponse } from "next/server";

import { BLOG_POSTS } from "@/lib/blog";
import { SITE } from "@/lib/constants";

function escape(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = [...BLOG_POSTS]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((post) => {
      const url = `${SITE.url}/en/blog/${post.slug}`;
      const pubDate = new Date(post.publishedAt).toUTCString();
      return `
    <item>
      <title>${escape(post.title.en)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escape(SITE.contactEmail)} (${escape(post.authorName)})</author>
      <description>${escape(post.excerpt.en)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE.name)} blog</title>
    <link>${SITE.url}/en/blog</link>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${escape(SITE.description)}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
