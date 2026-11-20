import { test, expect } from '../fixtures/test';

// Smoke test: verify that invalid login credentials are rejected.
test('invalid login is rejected', { tag: '@smoke' }, async ({ loginPage }) => {
  await loginPage.goto();

  // Generate a username that is extremely unlikely to exist.
  const invalidUsername = `invalid_${Date.now()}_${Math.random()}`;

  await loginPage.login(invalidUsername, 'WrongPassword@123');

  // Verify that ParaBank rejects the login attempt.
  await expect(
    loginPage.page.getByText(
      'The username and password could not be verified.'
    )
  ).toBeVisible();

  // Confirm that the user was not authenticated.
  await expect(
    loginPage.page.getByRole('link', { name: 'Log Out' })
  ).not.toBeVisible();
});

// Regression test: verify that empty credentials are rejected.
test('empty credentials are rejected', { tag: '@regression' }, async ({ loginPage }) => {
  await loginPage.goto();

  await loginPage.login('', '');

  await expect(
    loginPage.page.getByText(
      'Please enter a username and password.'
    )
  ).toBeVisible();
});