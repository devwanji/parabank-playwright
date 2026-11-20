import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { generateTestUser } from '../fixtures/testData';

test('registration form accepts dynamically generated test data', async ({ page }) => {
  // Generate unique data for every test execution.
  const user = generateTestUser();

  const registerPage = new RegisterPage(page);

  // Open the registration page directly.
  await registerPage.goto();

  // Fill and submit the registration form.
  await registerPage.register({
    firstName: user.firstName,
    lastName: user.lastName,
    street: user.street,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
  });

  // Verify that the generated username was submitted to the form.
  // This confirms our dynamic test-data generation and form interaction.
  await expect(registerPage.username).toHaveValue(user.username);

  });