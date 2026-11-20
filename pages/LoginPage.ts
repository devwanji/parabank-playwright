import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = page.getByRole('textbox').nth(0);
    this.password = page.getByRole('textbox').nth(1);
    this.loginButton = page.getByRole('button', { name: 'Log In' });
  }

  // Open ParaBank with a clean browser session.
  async goto() {
    await this.page.context().clearCookies();

    await this.page.goto('https://parabank.parasoft.com/parabank/', {
      waitUntil: 'domcontentloaded',
    });

    // Confirm that the login form is visible.
    await this.username.waitFor({
      state: 'visible',
      timeout: 15000,
    });
  }

  // Enter credentials and submit the login form.
  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}