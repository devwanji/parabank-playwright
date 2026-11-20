import { test, expect } from '@playwright/test';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

test('API failure can be simulated with network mocking', async ({ page }) => {
  // Intercept the API request and simulate a server failure.
  await page.route(apiUrl, async route => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
    });
  });

  // Request the API through browser fetch.
  const response = await page.evaluate(async url => {
    const result = await fetch(url);
    return {
      status: result.status,
      body: await result.json(),
    };
  }, apiUrl);

  // Verify that our simulated server error was returned.
  expect(response.status).toBe(500);
  expect(response.body.error).toBe('Internal Server Error');
});