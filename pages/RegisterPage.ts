import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly street: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly ssn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly repeatedPassword: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Use the application's field names for stable registration locators.
    this.firstName = page.locator('input[name="customer.firstName"]');
    this.lastName = page.locator('input[name="customer.lastName"]');
    this.street = page.locator('input[name="customer.address.street"]');
    this.city = page.locator('input[name="customer.address.city"]');
    this.state = page.locator('input[name="customer.address.state"]');
    this.zipCode = page.locator('input[name="customer.address.zipCode"]');
    this.phone = page.locator('input[name="customer.phoneNumber"]');
    this.ssn = page.locator('input[name="customer.ssn"]');
    this.username = page.locator('input[name="customer.username"]');
    this.password = page.locator('input[name="customer.password"]');
    this.repeatedPassword = page.locator('input[name="repeatedPassword"]');

    this.registerButton = page.getByRole('button', {
      name: 'Register',
    });
  }

  // Open the registration page directly.
  // This avoids depending on the homepage navigation link,
  // which can be unavailable when ParaBank loads slowly.
  async goto() {
    await this.page.goto(
      'https://parabank.parasoft.com/parabank/register.htm',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      }
    );

    // Confirm that the registration form is available.
    await this.firstName.waitFor({
      state: 'visible',
      timeout: 30000,
    });
  }

  // Fill and submit the registration form.
  async register(data: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
  }) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.street.fill(data.street);
    await this.city.fill(data.city);
    await this.state.fill(data.state);
    await this.zipCode.fill(data.zipCode);
    await this.phone.fill(data.phone);
    await this.ssn.fill(data.ssn);
    await this.username.fill(data.username);
    await this.password.fill(data.password);
    await this.repeatedPassword.fill(data.password);

    await this.registerButton.click();
  }
}