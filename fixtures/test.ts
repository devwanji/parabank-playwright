import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TransferPage } from '../pages/TransferPage';

// Define the custom fixtures that our tests can use.
type Fixtures = {
  loginPage: LoginPage;
  transferPage: TransferPage;
};

// Extend Playwright's built-in test with our custom Page Object fixtures.
export const test = base.extend<Fixtures>({
  // Automatically create a LoginPage using the current test's page.
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    // Make the LoginPage available to the test.
    await use(loginPage);
  },

  // Automatically create a TransferPage using the current test's page.
  transferPage: async ({ page }, use) => {
    const transferPage = new TransferPage(page);

    // Make the TransferPage available to the test.
    await use(transferPage);
  },
});

// Export expect so tests can import everything from this fixture file.
export { expect };