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

  //instructor for CSCI111
  //checking for change in mString useState
  await expect(page.getByText("John Smith")).toBeVisible();
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
  //checking for change in mString,tuString useStates
  await expect(page.getByText("John Smith")).toBeVisible();
  await expect(page.getByText("Sophia Black")).toBeVisible();
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
  //checking for change in mString,tuString useStates
  await expect(page.getByText("John Smith")).toBeVisible();
  await expect(page.getByText("Sophia Black")).toBeVisible();
  await expect(page.getByText("Micheal Evans")).toBeVisible();
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
  //checking for change in mString,tuString useStates
  await expect(page.getByText("John Smith")).toBeVisible();
  await expect(page.getByText("Sophia Black")).toBeVisible();
  await expect(page.getByText("Micheal Evans")).toBeVisible();
  await expect(page.getByLabel("Carl Brown")).toBeVisible();
});

test("five classes", async ({ page }) => {
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
  await expect(page.getByText("John Smith")).toBeVisible();
  await expect(page.getByText("Sophia Black")).toBeVisible();
  await expect(page.getByText("Micheal Evans")).toBeVisible();
  await expect(page.getByLabel("Carl Brown")).toBeVisible();
  await expect(page.getByLabel("Anne Green")).toBeVisible();
});

test("single department", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const page1Promise = page.waitForEvent("popup");
  await page.getByLabel("google authorization login").click();
  const page1 = await page1Promise;
  await expect(page.getByLabel("main page")).toBeVisible();

  await page.getByPlaceholder("Type like this: CSCI0180,").click();
  await page.getByPlaceholder("Type like this: CSCI0180,").press("CapsLock");

  await page.getByPlaceholder("Type like this: CSCI,ENGN,MATH").fill("CSCI");

  await page.getByLabel("three_classes_button").click();
  await page.getByLabel("between_twenty_and_thirty_hours_button").click();
  await page.getByLabel("generate_button").click();

  // change to text to see
  await expect(page.getByLabel("Computer Science")).toBeVisible();
});

test("use state changes with two generates", async ({ page }) => {
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

  //instructor for CSCI111
  //checking for change in mString useState
  await expect(page.getByLabel("monday box")).toContainText("Computer Science");
  await expect(page.getByText("John Smith")).toBeVisible();

  await page
    .getByPlaceholder("Type like this: CSCI0180,")
    .fill("CLPS200,VISA250,CLPS330,SOC105,EEPS110");
  await page.getByLabel("five_classes_button").click();
  await page.getByLabel("between_twenty_and_thirty_hours_button").click();
  await page.getByLabel("generate_button").click();

  //checking that first box changes to have CLPS200 info instead of CSCI111 info
  await expect(page.getByLabel("friday box")).toContainText(":");
  await expect(page.getByLabel("monday box")).not.toContainText(
    "Computer Science"
  );
  await expect(page.getByLabel("monday box")).toContainText("Margaret Reid");
  await expect(page.getByText("John Smith")).not.toBeVisible();
});
