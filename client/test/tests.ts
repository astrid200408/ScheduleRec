import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const page1Promise = page.waitForEvent("popup");
  await page.getByLabel("google authorization login").click();
  const page1 = await page1Promise;
  await expect(page.getByLabel("include button")).toBeVisible();
  await page.getByLabel("department_button").click();
  await page.getByPlaceholder("Type like this: CSCI0180,").click();
  await page.getByPlaceholder("Type like this: CSCI0180,").press("CapsLock");
  await page.getByPlaceholder("Type like this: CSCI0180,").fill("CSCI111");
  await page.getByPlaceholder("Type like this: CSCI,ENGN,MATH").click();
  await page
    .getByPlaceholder("Type like this: CSCI,ENGN,MATH")
    .press("CapsLock");
  await page.getByPlaceholder("Type like this: CSCI,ENGN,MATH").fill("CSCI");
  await page.getByLabel("three_classes_button").click();
  await page.getByLabel("between_twenty_and_thirty_hours_button").click();
  await page.getByLabel("generate_button").click();
  await expect(page.getByLabel("monday box")).toBeVisible();
});
