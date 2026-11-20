import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Run only the registration test.
  testDir: './tests',
  testMatch: 'registration.spec.ts',

  // Keep registration tests independent of ParaBank login setup.
  globalSetup: undefined,

  reporter: 'html',

  use: {
    ...devices['Desktop Chrome'],

    // Capture a screenshot when a test fails.
    screenshot: 'only-on-failure',

    // Save a video when a test fails.
    video: 'retain-on-failure',

    // Save a trace when a test fails, even without a retry.
    trace: 'retain-on-failure',

    // Start without a saved authenticated session.
    storageState: {
      cookies: [],
      origins: [],
    },
  },
});