import { defineConfig, devices } from '@playwright/test';

// Load environment variables from the .env file.
import dotenv from 'dotenv';

// Initialize dotenv before Playwright configuration runs.
dotenv.config();

// Main Playwright configuration for the ParaBank automation project.
export default defineConfig({
  // Location of all automated test files.
  testDir: './tests',

  // Runs once before the test suite to establish an authenticated session.
  globalSetup: require.resolve('./auth/setup'),

  // Allows independent test files to execute concurrently.
  fullyParallel: true,

  // Prevents accidental test.only from being committed to CI.
  forbidOnly: !!process.env.CI,

  // Retries failed tests twice in CI to help identify intermittent failures.
  retries: process.env.CI ? 2 : 0,

  // Uses one worker in CI for more predictable execution.
  workers: process.env.CI ? 1 : undefined,

  // Generates an HTML report after test execution.
  reporter: 'html',

  use: {
    // Capture a screenshot whenever a test fails.
    screenshot: 'only-on-failure',

    // Record video only when a test fails.
    video: 'retain-on-failure',

    // Capture a trace when a test fails on its first retry.
    trace: 'on-first-retry',
  },

  // Defines the browsers used for cross-browser testing.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});