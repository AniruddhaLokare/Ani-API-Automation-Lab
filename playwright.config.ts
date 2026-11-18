import { defineConfig } from "@playwright/test";

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "./tests",
  workers: 1,

  // Limit the whole test run, so that it fails with a report instead of hanging.
  timeout: 30 * 1000,

  // Reporter to use
  reporter: [["html"], ["list"]],

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "https://restful-booker.herokuapp.com",
  },
});
