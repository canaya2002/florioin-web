import { describe, expect, it } from "vitest";

import enMessages from "@/i18n/messages/en.json";
import esMessages from "@/i18n/messages/es.json";
import { defaultLocale, isLocale, locales } from "@/i18n/locales";

describe("locales", () => {
  it("includes en and es", () => {
    expect(locales).toContain("en");
    expect(locales).toContain("es");
  });

  it("default is en", () => {
    expect(defaultLocale).toBe("en");
  });

  it("isLocale narrows correctly", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("EN")).toBe(false);
  });
});

describe("dictionary parity", () => {
  it("EN and ES share the same shape (top-level keys)", () => {
    expect(Object.keys(enMessages).sort()).toEqual(
      Object.keys(esMessages).sort(),
    );
  });

  it("home.hero strings exist in both languages", () => {
    expect(enMessages.home.hero.headline).toBeTruthy();
    expect(esMessages.home.hero.headline).toBeTruthy();
  });

  it("forms namespace covers required field labels", () => {
    expect(enMessages.forms.email).toBeTruthy();
    expect(esMessages.forms.email).toBeTruthy();
    expect(enMessages.forms.company).toBeTruthy();
    expect(esMessages.forms.company).toBeTruthy();
  });
});
