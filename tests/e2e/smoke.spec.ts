import { expect, test } from "@playwright/test";

test.describe("public marketing site", () => {
  test("/ redirects to a locale and renders the hero", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(/\/(en|es)\/?$/);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/en home renders nav, hero CTA, and footer", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("link", { name: /FlorioIn/i }).first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: /request access/i }).first(),
    ).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("/es renders Spanish content", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(
      page.getByRole("link", { name: /solicitar acceso/i }).first(),
    ).toBeVisible();
  });

  test("/login redirects to florioin.app", async ({ page }) => {
    const response = await page.goto("/login", { waitUntil: "commit" });
    const finalUrl = response?.url() ?? "";
    expect(finalUrl).toMatch(/florioin\.app\/login/);
  });

  test("/en/pricing renders the $3 hero and FAQ accordion", async ({ page }) => {
    await page.goto("/en/pricing");
    await expect(page.getByText(/^\$3$/).first()).toBeVisible();
    await expect(
      page.getByRole("button", { name: /free trial/i }).first(),
    ).toBeVisible();
  });

  test("/en/request-access form validates required fields", async ({ page }) => {
    await page.goto("/en/request-access");
    const submit = page
      .getByRole("button", { name: /request access/i })
      .first();
    await submit.click();
    // After client validation kicks in, at least one field-level error appears.
    await expect(page.locator("[aria-invalid='true']").first()).toBeVisible();
  });

  test("/en/solutions has 15 industry links", async ({ page }) => {
    await page.goto("/en/solutions");
    const industryLinks = page.locator(
      'a[href^="/en/solutions/"]:not([href$="/solutions/"])',
    );
    expect(await industryLinks.count()).toBeGreaterThanOrEqual(15);
  });

  test("/sitemap.xml is served as XML", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const ct = response.headers()["content-type"] ?? "";
    expect(ct).toMatch(/xml/);
  });

  test("/robots.txt advertises sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toMatch(/Sitemap:.*sitemap\.xml/);
  });
});
