import { test, expect } from '@playwright/test';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

test('API response can be mocked', async ({ page }) => {
  // Intercept requests to the users endpoint.
  await page.route(apiUrl, async route => {
    // Replace the real API response with controlled test data.
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 999,
          name: 'Terry Mock User',
          username: 'terryqa',
          email: 'terry@example.com',
        },
      ]),
    });
  });

  // Use the browser to request the API through fetch.
  const response = await page.evaluate(async url => {
    const result = await fetch(url);
    return {
      status: result.status,
      body: await result.json(),
    };
  }, apiUrl);

  // Verify that the mocked response was returned.
  expect(response.status).toBe(200);
  expect(response.body[0].name).toBe('Terry Mock User');
  expect(response.body[0].id).toBe(999);
});