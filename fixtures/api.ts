import { test as base, expect, APIRequestContext } from '@playwright/test';

// Define the custom API fixture that our tests can reuse.
type APIFixtures = {
  api: APIRequestContext;
};

// Extend Playwright's built-in test with a reusable API request fixture.
export const test = base.extend<APIFixtures>({
  api: async ({ playwright }, use) => {
    // Create a dedicated API request context.
    // This allows multiple tests to reuse the same API configuration.
    const api = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

    // Make the API client available to the test.
    await use(api);

    // Close the API context after the test finishes.
    await api.dispose();
  },
});

// Export expect so API tests can import everything from this fixture.
export { expect };