import { test, expect } from '../../fixtures/api';

// API endpoint used for practicing HTTP requests.
const apiUrl = '/users';

test('GET request returns a list of users', async ({ api }) => {
  // Send a GET request through our reusable API fixture.
  const response = await api.get(apiUrl);

  // Verify that the API responds successfully.
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  // Convert the API response into JSON.
  const users = await response.json();

  // Verify that the API returns an array containing users.
  expect(Array.isArray(users)).toBeTruthy();
  expect(users.length).toBeGreaterThan(0);

  // Verify that the first user has the expected data structure.
  expect(users[0]).toHaveProperty('id');
  expect(users[0]).toHaveProperty('name');
  expect(users[0]).toHaveProperty('email');

  console.log(`API returned ${users.length} users.`);
});

test('POST request creates a new user', async ({ api }) => {
  // Define the user data to send to the API.
  const newUser = {
    name: 'Terry QA',
    username: 'terryqa',
    email: 'terryqa@example.com',
  };

  // Send a POST request with the new user data.
  const response = await api.post(apiUrl, {
    data: newUser,
  });

  // Verify that the API accepted the request.
  expect(response.status()).toBe(201);

  const createdUser = await response.json();

  // Verify that the returned user matches the submitted data.
  expect(createdUser.name).toBe(newUser.name);
  expect(createdUser.username).toBe(newUser.username);
  expect(createdUser.email).toBe(newUser.email);
  expect(createdUser.id).toBeTruthy();
});

test('PUT request updates an existing user', async ({ api }) => {
  // Define the updated user information.
  const updatedUser = {
    id: 1,
    name: 'Terry Updated',
    username: 'terryqa',
    email: 'terry.updated@example.com',
  };

  // Send a PUT request to update user 1.
  const response = await api.put(`${apiUrl}/1`, {
    data: updatedUser,
  });

  // Verify that the API accepts the update.
  expect(response.status()).toBe(200);

  const user = await response.json();

  expect(user.name).toBe(updatedUser.name);
  expect(user.email).toBe(updatedUser.email);
  expect(user.id).toBe(1);
});

test('DELETE request removes an existing user', async ({ api }) => {
  // Send a DELETE request for user 1.
  const response = await api.delete(`${apiUrl}/1`);

  // Verify that the API successfully processed the deletion.
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
});

test('PATCH request updates selected user fields', async ({ api }) => {
  // Send only the field that needs to be changed.
  const response = await api.patch(`${apiUrl}/1`, {
    data: {
      name: 'Terry PATCH Updated',
    },
  });

  // Verify that the API accepted the partial update.
  expect(response.status()).toBe(200);

  const updatedUser = await response.json();

  expect(updatedUser.name).toBe('Terry PATCH Updated');
});

test('API returns the correct response headers', async ({ api }) => {
  // Send a GET request using the reusable API fixture.
  const response = await api.get(apiUrl);

  // Read the response headers.
  const headers = response.headers();

  // Verify that the response contains JSON.
  expect(headers['content-type']).toContain('application/json');

  expect(response.status()).toBe(200);
});

test('API responds within an acceptable time', async ({ api }) => {
  // Record when the API request starts.
  const startTime = Date.now();

  // Send the API request.
  const response = await api.get(apiUrl);

  // Calculate the response time.
  const responseTime = Date.now() - startTime;

  // Verify that the request succeeded and was reasonably fast.
  expect(response.status()).toBe(200);
  expect(responseTime).toBeLessThan(5000);

  console.log(`API response time: ${responseTime}ms`);
});

test('API returns 404 for a user that does not exist', async ({ api }) => {
  // Request a user ID that does not exist.
  const response = await api.get(`${apiUrl}/9999`);

  // Verify that the API returns Not Found.
  expect(response.status()).toBe(404);
});

test('API handles incomplete user data', async ({ api }) => {
  // Submit a user with incomplete information.
  const response = await api.post(apiUrl, {
    data: {
      username: 'incompleteuser',
    },
  });

  // JSONPlaceholder simulates creation even with incomplete data.
  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  expect(responseBody.username).toBe('incompleteuser');
});

test('API returns 404 for an invalid endpoint', async ({ api }) => {
  // Request a route that does not exist.
  const response = await api.get('/invalid-endpoint');

  // Verify that the API reports the missing endpoint.
  expect(response.status()).toBe(404);
});

test('API request can send an Authorization header', async ({ api }) => {
  // Use a fake token to demonstrate Bearer authentication.
  const token = 'example-test-token';

  // Send the token using the standard Authorization header.
  const response = await api.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // JSONPlaceholder does not require authentication,
  // so it still returns a successful response.
  expect(response.status()).toBe(200);
});