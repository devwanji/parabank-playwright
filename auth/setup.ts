import { chromium } from '@playwright/test';
import fs from 'node:fs';

interface Credentials {
  username: string;
  password: string;
}

async function globalSetup() {
  // Load the verified credentials created by the account setup script.
  const credentials: Credentials = JSON.parse(
    fs.readFileSync('auth/credentials.json', 'utf-8')
  );

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Open ParaBank and wait for the main HTML document.
    await page.goto('https://parabank.parasoft.com/parabank/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // Wait for the login form before entering credentials.
    await page.locator('input[name="username"]').waitFor({
      state: 'visible',
      timeout: 30000,
    });

    // Enter the verified credentials.
    await page.locator('input[name="username"]').fill(credentials.username);
    await page.locator('input[name="password"]').fill(credentials.password);

    // Submit the login form.
    await page.getByRole('button', { name: 'Log In' }).click();

    // Wait for the authenticated page to load.
    // ParaBank can be slow, so allow extra time here.
    await page.waitForLoadState('domcontentloaded', {
      timeout: 60000,
    });

    // Verify authentication using the welcome message rather than
    // depending only on the navigation menu's Log Out link.
    await page.getByText(`Welcome ${credentials.username}`).waitFor({
      state: 'visible',
      timeout: 60000,
    });

    // Save the authenticated browser session for the test suite.
    await context.storageState({
      path: 'auth/user.json',
    });

    console.log('Authentication state saved successfully.');
  } catch (error) {
    // Capture the page when authentication fails to help diagnose
    // ParaBank's intermittent response delays.
    await page.screenshot({
      path: 'auth/login-result.png',
      fullPage: true,
    });

    throw error;
  } finally {
    // Always close the browser after setup finishes.
    await browser.close();
  }
}

export default globalSetup;