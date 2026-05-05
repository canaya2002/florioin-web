import { describe, expect, it } from "vitest";

import { absoluteUrl, cn, slugify } from "@/lib/utils";

describe("cn()", () => {
  it("merges conflicting Tailwind classes (last wins)", () => {
    expect(cn("p-4", "p-6")).toBe("p-6");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("filters falsy values", () => {
    expect(cn("a", false && "b", null, undefined, "c")).toBe("a c");
  });

  it("supports conditional objects", () => {
    expect(cn("a", { b: true, c: false })).toBe("a b");
  });
});

describe("slugify()", () => {
  it("lowercases and dasherizes", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("collapses repeating separators", () => {
    expect(slugify("foo  --  bar")).toBe("foo-bar");
  });

  it("strips diacritics", () => {
    expect(slugify("café del año")).toBe("cafe-del-ano");
  });

  it("trims edge dashes", () => {
    expect(slugify("---wow---")).toBe("wow");
  });
});

describe("absoluteUrl()", () => {
  it("builds full URLs from a relative path", () => {
    expect(absoluteUrl("/blog", "https://florioin.com")).toBe(
      "https://florioin.com/blog",
    );
  });

  it("handles trailing slash on baseUrl", () => {
    expect(absoluteUrl("/x", "https://florioin.com/")).toBe(
      "https://florioin.com/x",
    );
  });

  it("prepends a slash if missing on path", () => {
    expect(absoluteUrl("foo", "https://florioin.com")).toBe(
      "https://florioin.com/foo",
    );
  });
});
