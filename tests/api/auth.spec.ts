import { test, expect } from '@playwright/test';

// ReqRes authentication endpoint used for practicing token-based API testing.
const authUrl = 'https://reqres.in/api/login';

test('API rejects an invalid Bearer token', async ({ request }) => {
  // Send a request using a deliberately invalid token.
  const response = await request.get('https://reqres.in/api/users?page=2', {
    headers: {
      Authorization: 'Bearer invalid-test-token',
    },
  });

  // The API should reject an invalid authentication token.
  expect(response.status()).toBe(401);
});