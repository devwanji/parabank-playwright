import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'example.spec.ts',

  // Login tests do not require the authenticated global setup.
  globalSetup: undefined,

  reporter: 'html',

  use: {
    // Start every login test without saved authentication.
    storageState: {
      cookies: [],
      origins: [],
    },
  },

  // Run login tests across all supported browsers.
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