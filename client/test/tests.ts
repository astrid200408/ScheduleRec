import { test, expect } from "@playwright/test";

// Set authing to true
test("single class", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const page1Promise = page.waitForEvent("popup");
  await page.getByLabel("google authorization login").click();
  const page1 = await page1Promise;
  await expect(page.getByLabel("main page")).toBeVisible();

  await page.getByPlaceholder("Type like this: CSCI0180,").click();
  await page.getByPlaceholder("Type like this: CSCI0180,").press("CapsLock");
  await page.getByPlaceholder("Type like this: CSCI0180,").fill("CSCI111");
  await page.getByLabel("three_classes_button").click();
  await page.getByLabel("between_twenty_and_thirty_hours_button").click();
  await page.getByLabel("generate_button").click();

  // change to text to see
  await expect(page.getByLabel("monday box")).toBeVisible();
});

test("two classes", async ({ page }) => {
    await page.goto("http://localhost:8000/");
    const page1Promise = page.waitForEvent("popup");
    await page.getByLabel("google authorization login").click();
    const page1 = await page1Promise;
    await expect(page.getByLabel("main page")).toBeVisible();

    await page.getByPlaceholder("Type like this: CSCI0180,").click();
    await page.getByPlaceholder("Type like this: CSCI0180,").press("CapsLock");

    await page
      .getByPlaceholder("Type like this: CSCI0180,")
      .fill("CSCI111,VISA250");

    await page.getByLabel("three_classes_button").click();
    await page.getByLabel("between_twenty_and_thirty_hours_button").click();
    await page.getByLabel("generate_button").click();

    // change to text to see
    await expect(page.getByLabel("monday box")).toBeVisible();
});

test("three classes", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const page1Promise = page.waitForEvent("popup");
  await page.getByLabel("google authorization login").click();
  const page1 = await page1Promise;
  await expect(page.getByLabel("main page")).toBeVisible();

  await page.getByPlaceholder("Type like this: CSCI0180,").click();
  await page.getByPlaceholder("Type like this: CSCI0180,").press("CapsLock");

  await page
    .getByPlaceholder("Type like this: CSCI0180,")
    .fill("CSCI111,VISA250,CLPS330");

  await page.getByLabel("three_classes_button").click();
  await page.getByLabel("between_twenty_and_thirty_hours_button").click();
  await page.getByLabel("generate_button").click();

  // change to text to see
  await expect(page.getByLabel("monday box")).toBeVisible();
});

test("four classes", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const page1Promise = page.waitForEvent("popup");
  await page.getByLabel("google authorization login").click();
  const page1 = await page1Promise;
  await expect(page.getByLabel("main page")).toBeVisible();

  await page.getByPlaceholder("Type like this: CSCI0180,").click();
  await page.getByPlaceholder("Type like this: CSCI0180,").press("CapsLock");

  await page
    .getByPlaceholder("Type like this: CSCI0180,")
    .fill("CSCI111,VISA250,CLPS330,SOC105");

  await page.getByLabel("three_classes_button").click();
  await page.getByLabel("between_twenty_and_thirty_hours_button").click();
  await page.getByLabel("generate_button").click();

  // change to text to see
  await expect(page.getByLabel("monday box")).toBeVisible();
});

test("four classes", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const page1Promise = page.waitForEvent("popup");
  await page.getByLabel("google authorization login").click();
  const page1 = await page1Promise;
  await expect(page.getByLabel("main page")).toBeVisible();

  await page.getByPlaceholder("Type like this: CSCI0180,").click();
  await page.getByPlaceholder("Type like this: CSCI0180,").press("CapsLock");

  await page
    .getByPlaceholder("Type like this: CSCI0180,")
    .fill("CSCI111,VISA250,CLPS330,SOC105,EEPS110");

  await page.getByLabel("three_classes_button").click();
  await page.getByLabel("between_twenty_and_thirty_hours_button").click();
  await page.getByLabel("generate_button").click();

  // change to text to see
  await expect(page.getByLabel("monday box")).toBeVisible();
});

test("too many courses", async({page}) => {
        await page.goto("http://localhost:8000/");
        const page1Promise = page.waitForEvent("popup");
        await page.getByLabel("google authorization login").click();
        const page1 = await page1Promise;
        await expect(page.getByLabel("main page")).toBeVisible();

        await page.getByPlaceholder("Type like this: CSCI0180,").click();
        await page
          .getByPlaceholder("Type like this: CSCI0180,")
          .press("CapsLock");

        //Change to multiple classes
        await page
          .getByPlaceholder("Type like this: CSCI0180,")
          .fill("CSCI111");

        await page.getByLabel("two_classes_button").click();
        await page.getByLabel("between_twenty_and_thirty_hours_button").click();
        await page.getByLabel("generate_button").click();

        // expect an error
})

test("single department", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const page1Promise = page.waitForEvent("popup");
  await page.getByLabel("google authorization login").click();
  const page1 = await page1Promise;
  await expect(page.getByLabel("main page")).toBeVisible();

  await page.getByPlaceholder("Type like this: CSCI0180,").click();
  await page.getByPlaceholder("Type like this: CSCI0180,").press("CapsLock");

  await page
    .getByPlaceholder("Type like this: CSCI,ENGN,MATH")
    .fill("CSCI");

  await page.getByLabel("three_classes_button").click();
  await page.getByLabel("between_twenty_and_thirty_hours_button").click();
  await page.getByLabel("generate_button").click();

  // change to text to see
  await expect(page.getByLabel("monday box")).toBeVisible();
});