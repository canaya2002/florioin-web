import { SITE } from "@/lib/constants";

type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Inline JSON-LD `<script>` tag. Renders server-side so search engines
 * pick it up before any JS runs. Use one component per schema.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logos/FlorioinLogo.png`,
    sameAs: [
      "https://twitter.com/florioin",
      "https://www.linkedin.com/company/florioin",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SITE.contactEmail,
        contactType: "customer support",
        availableLanguage: ["English", "Spanish"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: ["en", "es"],
  };
}

export function softwareApplicationSchema() {
  // No aggregateRating until we have a verifiable public review source —
  // Google's structured-data policy treats invented ratings as a violation.
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android, macOS, Windows, Linux",
    offers: {
      "@type": "Offer",
      price: "3",
      priceCurrency: "USD",
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        unitText: "user/month",
      },
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE.url}${item.url}`,
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  authorName: string;
  publishedAt: string;
  slug: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    author: { "@type": "Person", name: input.authorName },
    datePublished: input.publishedAt,
    inLanguage: input.locale,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logos/FlorioinLogo.png` },
    },
    mainEntityOfPage: `${SITE.url}/${input.locale}/blog/${input.slug}`,
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function jobPostingSchema(input: {
  title: string;
  description: string;
  postedAt: string;
  location: string;
  type: string;
  slug: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    datePosted: input.postedAt,
    employmentType: input.type,
    hiringOrganization: {
      "@type": "Organization",
      name: SITE.name,
      sameAs: SITE.url,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: input.location,
    },
    inLanguage: input.locale,
    url: `${SITE.url}/${input.locale}/careers/${input.slug}`,
  };
}
