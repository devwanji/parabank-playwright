import { chromium } from '@playwright/test';
import fs from 'node:fs';

async function createTestAccount() {
  // Generate unique credentials for each new test account.
  const username = `qauser${Date.now()}`;
  const password = 'Test@12345';

  // Launch Chromium to register and verify the account.
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Open ParaBank and wait only for the HTML document to load.
    await page.goto('https://parabank.parasoft.com/parabank/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // Navigate to the customer registration page.
    await page.getByRole('link', { name: 'Register' }).click();

    // Fill in the required customer information.
    await page.locator('input[name="customer.firstName"]').fill('QA');
    await page.locator('input[name="customer.lastName"]').fill('Tester');
    await page.locator('input[name="customer.address.street"]').fill('Test Road');
    await page.locator('input[name="customer.address.city"]').fill('Nairobi');
    await page.locator('input[name="customer.address.state"]').fill('Nairobi');
    await page.locator('input[name="customer.address.zipCode"]').fill('00100');
    await page.locator('input[name="customer.phoneNumber"]').fill('0712345678');
    await page.locator('input[name="customer.ssn"]').fill('98765');

    // Enter the unique username and password.
    await page.locator('input[name="customer.username"]').fill(username);
    await page.locator('input[name="customer.password"]').fill(password);
    await page.locator('input[name="repeatedPassword"]').fill(password);

    // Submit the registration form.
    await page.getByRole('button', { name: 'Register' }).click();

    // Confirm that ParaBank created the customer account.
    await page.getByText(`Welcome ${username}`).waitFor({
      timeout: 15000,
    });

    // Log out so the credentials can be independently verified.
    await page.getByRole('link', { name: 'Log Out' }).click();

    // Log in using the newly created credentials.
    await page.locator('input[name="username"]').fill(username);
    await page.locator('input[name="password"]').fill(password);
    await page.getByRole('button', { name: 'Log In' }).click();

    // Confirm that the credentials successfully authenticate.
    await page.getByRole('link', { name: 'Log Out' }).waitFor({
      timeout: 15000,
    });

    // Save the verified authenticated session for the test suite.
    await page.context().storageState({
      path: 'auth/user.json',
    });

    // Save the verified credentials for future test-account setup.
    fs.writeFileSync(
      'auth/credentials.json',
      JSON.stringify({ username, password }, null, 2)
    );

    console.log('Test account created and login verified successfully.');
    console.log('Authenticated session saved successfully.');
  } finally {
    // Always close the browser when account setup finishes.
    await browser.close();
  }
}

createTestAccount();