import { describe, expect, it } from "vitest";

import { INDUSTRIES } from "@/lib/constants";
import { INDUSTRY_CONTENT } from "@/lib/industries";

describe("industries dataset", () => {
  it("has content for every industry slug", () => {
    for (const slug of INDUSTRIES) {
      expect(
        INDUSTRY_CONTENT[slug],
        `missing INDUSTRY_CONTENT for ${slug}`,
      ).toBeTruthy();
    }
  });

  it("every industry has bilingual headline + description + 3 pains + 3 solutions", () => {
    for (const slug of INDUSTRIES) {
      const c = INDUSTRY_CONTENT[slug];
      expect(c.headline.en, `${slug} headline.en`).toBeTruthy();
      expect(c.headline.es, `${slug} headline.es`).toBeTruthy();
      expect(c.description.en, `${slug} description.en`).toBeTruthy();
      expect(c.description.es, `${slug} description.es`).toBeTruthy();
      expect(c.painPoints, `${slug} painPoints`).toHaveLength(3);
      expect(c.solutions, `${slug} solutions`).toHaveLength(3);
      expect(c.quote.author).toBeTruthy();
      expect(c.template.en).toBeTruthy();
      expect(c.template.es).toBeTruthy();
    }
  });

  it("INDUSTRY_CONTENT keys equal INDUSTRIES", () => {
    expect(Object.keys(INDUSTRY_CONTENT).sort()).toEqual([...INDUSTRIES].sort());
  });
});
