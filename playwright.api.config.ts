import { defineConfig, devices } from '@playwright/test';

// Dedicated configuration for API tests.
// This keeps API tests independent from the ParaBank UI authentication setup.
export default defineConfig({
  // Only run tests inside the API test folder.
  testDir: './tests/api',

  // Keep API tests independent and easy to run in parallel.
  fullyParallel: true,

  // Generate the same HTML report used by the main project.
  reporter: 'html',

  use: {
    // Use Chromium so the API tests remain consistent with the main project.
    ...devices['Desktop Chrome'],
  },
});